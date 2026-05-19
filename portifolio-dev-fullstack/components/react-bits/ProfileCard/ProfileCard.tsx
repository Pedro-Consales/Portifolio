"use client";

import React, { useEffect, useRef, useCallback, useMemo } from 'react';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
} as const;

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, p = 3) => parseFloat(v.toFixed(p));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const KEYFRAMES_ID = 'pc-keyframes';

interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
  /** Scale the avatar image. Values < 1 zoom out (show more). Default: 1 */
  avatarScale?: number;
  /** Shift the avatar vertically in px. Positive = move up, negative = move down. Default: 0 */
  avatarOffsetY?: number;
}

interface TiltEngine {
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
  beginInitial: (ms: number) => void;
  getCurrent: () => { x: number; y: number; tx: number; ty: number };
  cancel: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '/profile-picture.png',
  iconUrl,
  grainUrl,
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = '',
  enableTilt = true,
  miniAvatarUrl,
  name = 'Pedro Consales',
  title = 'Full Stack Engineer',
  handle = 'pedro-consales',
  status = 'Available',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick,
  avatarScale = 1,
  avatarOffsetY = 0,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById(KEYFRAMES_ID)) {
      const style = document.createElement('style');
      style.id = KEYFRAMES_ID;
      style.textContent = `
        @keyframes pc-holo-bg {
          0%   { background-position: 0 var(--background-y), 0 0, center; }
          100% { background-position: 0 var(--background-y), 90% 90%, center; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0, currentY = 0, targetX = 0, targetY = 0;
    const DEFAULT_TAU = 0.14, INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;
      const w = shell.clientWidth || 1;
      const h = shell.clientHeight || 1;
      const px = clamp((100 / w) * x);
      const py = clamp((100 / h) * y);
      const cx = px - 50, cy = py - 50;
      const props: Record<string, string> = {
        '--pointer-x': `${px}%`,
        '--pointer-y': `${py}%`,
        '--background-x': `${adjust(px, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(py, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(py - 50, px - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${py / 100}`,
        '--pointer-from-left': `${px / 100}`,
        '--rotate-x': `${round(-(cx / 5))}deg`,
        '--rotate-y': `${round(cy / 4)}deg`
      };
      for (const [k, v] of Object.entries(props)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);
      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;
      setVarsFromXY(currentX, currentY);
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05 || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false; lastTs = 0;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      }
    };

    const start = () => {
      if (running) return;
      running = true; lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) { currentX = x; currentY = y; setVarsFromXY(x, y); },
      setTarget(x, y) { targetX = x; targetY = y; start(); },
      toCenter() {
        const s = shellRef.current;
        if (s) this.setTarget(s.clientWidth / 2, s.clientHeight / 2);
      },
      beginInitial(ms) { initialUntil = performance.now() + ms; start(); },
      getCurrent() { return { x: currentX, y: currentY, tx: targetX, ty: targetY }; },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null; running = false; lastTs = 0;
      }
    };
  }, [enableTilt]);

  const getOffsets = (evt: PointerEvent, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return { x: evt.clientX - r.left, y: evt.clientY - r.top };
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    const { x, y } = getOffsets(e, shell);
    tiltEngine.setTarget(x, y);
  }, [tiltEngine]);

  const handlePointerEnter = useCallback((e: PointerEvent) => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    shell.classList.add('active', 'entering');
    if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
    enterTimerRef.current = window.setTimeout(() => shell.classList.remove('entering'), ANIMATION_CONFIG.ENTER_TRANSITION_MS);
    const { x, y } = getOffsets(e, shell);
    tiltEngine.setTarget(x, y);
  }, [tiltEngine]);

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    tiltEngine.toCenter();
    const check = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      if (Math.hypot(tx - x, ty - y) < 0.6) { shell.classList.remove('active'); leaveRafRef.current = null; }
      else leaveRafRef.current = requestAnimationFrame(check);
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(check);
  }, [tiltEngine]);

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;
    const shell = shellRef.current;
    if (!shell) return;

    const onMove = handlePointerMove as EventListener;
    const onEnter = handlePointerEnter as EventListener;
    const onLeave = handlePointerLeave as EventListener;

    shell.addEventListener('pointerenter', onEnter);
    shell.addEventListener('pointermove', onMove);
    shell.addEventListener('pointerleave', onLeave);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    tiltEngine.setImmediate(initialX, ANIMATION_CONFIG.INITIAL_Y_OFFSET);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', onEnter);
      shell.removeEventListener('pointermove', onMove);
      shell.removeEventListener('pointerleave', onLeave);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [enableTilt, tiltEngine, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  const cardRadius = '30px';

  const cardStyle = useMemo(() => ({
    '--icon': iconUrl ? `url(${iconUrl})` : 'none',
    '--grain': grainUrl ? `url(${grainUrl})` : 'none',
    '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
    '--behind-glow-color': behindGlowColor ?? 'rgba(38, 119, 153, 0.6)',
    '--behind-glow-size': behindGlowSize ?? '50%',
    '--pointer-x': '50%', '--pointer-y': '50%',
    '--pointer-from-center': '0', '--pointer-from-top': '0.5', '--pointer-from-left': '0.5',
    '--card-opacity': '0', '--rotate-x': '0deg', '--rotate-y': '0deg',
    '--background-x': '50%', '--background-y': '50%',
    '--card-radius': cardRadius,
    '--sunpillar-1': 'hsl(2,100%,73%)', '--sunpillar-2': 'hsl(53,100%,69%)',
    '--sunpillar-3': 'hsl(93,100%,69%)', '--sunpillar-4': 'hsl(176,100%,76%)',
    '--sunpillar-5': 'hsl(228,100%,74%)', '--sunpillar-6': 'hsl(283,100%,73%)',
    '--sunpillar-clr-1': 'var(--sunpillar-1)', '--sunpillar-clr-2': 'var(--sunpillar-2)',
    '--sunpillar-clr-3': 'var(--sunpillar-3)', '--sunpillar-clr-4': 'var(--sunpillar-4)',
    '--sunpillar-clr-5': 'var(--sunpillar-5)', '--sunpillar-clr-6': 'var(--sunpillar-6)',
  }), [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]);

  const shineStyle: React.CSSProperties = {
    maskImage: 'var(--icon)', maskMode: 'luminance' as never,
    maskRepeat: 'repeat', maskSize: '150%',
    maskPosition: 'top calc(200% - (var(--background-y) * 5)) left calc(100% - var(--background-x))',
    filter: 'brightness(0.66) contrast(1.33) saturate(0.33) opacity(0.5)',
    animation: 'pc-holo-bg 18s linear infinite',
    mixBlendMode: 'color-dodge', transform: 'translate3d(0,0,1px)',
    overflow: 'hidden', zIndex: 3, background: 'transparent',
    backgroundSize: 'cover', backgroundPosition: 'center',
    backgroundImage: `repeating-linear-gradient(0deg,var(--sunpillar-clr-1) 5%,var(--sunpillar-clr-2) 10%,var(--sunpillar-clr-3) 15%,var(--sunpillar-clr-4) 20%,var(--sunpillar-clr-5) 25%,var(--sunpillar-clr-6) 30%,var(--sunpillar-clr-1) 35%),repeating-linear-gradient(-45deg,#0e152e 0%,hsl(180,10%,60%) 3.8%,hsl(180,29%,66%) 4.5%,hsl(180,10%,60%) 5.2%,#0e152e 10%,#0e152e 12%),radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y),hsla(0,0%,0%,0.1) 12%,hsla(0,0%,0%,0.15) 20%,hsla(0,0%,0%,0.25) 120%)`,
    gridArea: '1 / -1', borderRadius: cardRadius, pointerEvents: 'none',
  };

  const glareStyle: React.CSSProperties = {
    transform: 'translate3d(0,0,1.1px)', overflow: 'hidden',
    backgroundImage: `radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y),hsl(248,25%,80%) 12%,hsla(207,40%,30%,0.8) 90%)`,
    mixBlendMode: 'overlay', filter: 'brightness(0.8) contrast(1.2)',
    zIndex: 4, gridArea: '1 / -1', borderRadius: cardRadius, pointerEvents: 'none',
  };

  return (
    <div
      ref={wrapRef}
      className={`relative touch-none ${className}`.trim()}
      style={{ perspective: '500px', transform: 'translate3d(0,0,0.1px)', ...cardStyle } as React.CSSProperties}
    >
      {behindGlowEnabled && (
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-200 ease-out"
          style={{
            background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent var(--behind-glow-size))`,
            filter: 'blur(50px) saturate(1.1)',
            opacity: 'calc(0.8 * var(--card-opacity))'
          }}
        />
      )}

      <div ref={shellRef} className="relative z-[1]">
        <section
          className="grid relative overflow-hidden"
          style={{
            height: '80svh', maxHeight: '480px', aspectRatio: '0.718',
            borderRadius: cardRadius,
            backgroundBlendMode: 'color-dodge, normal, normal, normal',
            boxShadow: 'rgba(0,0,0,0.8) calc((var(--pointer-from-left)*10px) - 3px) calc((var(--pointer-from-top)*20px) - 6px) 20px -5px',
            transition: 'transform 1s ease',
            transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)',
            background: 'rgba(0,0,0,0.9)', backfaceVisibility: 'hidden',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transition = 'none';
            e.currentTarget.style.transform = 'translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))';
          }}
          onMouseLeave={e => {
            const entering = shellRef.current?.classList.contains('entering');
            e.currentTarget.style.transition = entering ? 'transform 180ms ease-out' : 'transform 1s ease';
            e.currentTarget.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg)';
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'var(--inner-gradient)', backgroundColor: 'rgba(0,0,0,0.9)',
              borderRadius: cardRadius, display: 'grid', gridArea: '1 / -1'
            }}
          >
            <div style={shineStyle} />
            <div style={glareStyle} />

            {/* Avatar */}
            <div
              className="overflow-visible"
              style={{ mixBlendMode: 'luminosity', transform: 'translateZ(2px)', gridArea: '1 / -1', borderRadius: cardRadius, pointerEvents: 'none', backfaceVisibility: 'hidden' }}
            >
              <img
                className="absolute left-1/2 will-change-transform transition-transform duration-[120ms] ease-out"
                src={avatarUrl}
                alt={`${name} avatar`}
                loading="lazy"
                style={{
                  width: `${avatarScale * 100}%`,
                  bottom: `${-1 + avatarOffsetY}px`,
                  transformOrigin: '50% 100%',
                  transform: 'translateX(calc(-50% + (var(--pointer-from-left) - 0.5) * 6px)) translateZ(0) scaleY(calc(1 + (var(--pointer-from-top) - 0.5) * 0.02)) scaleX(calc(1 + (var(--pointer-from-left) - 0.5) * 0.01))',
                  borderRadius: cardRadius, backfaceVisibility: 'hidden'
                }}
              />

              {showUserInfo && (
                <div
                  className="absolute z-[2] flex items-center justify-between backdrop-blur-[30px] border border-white/10 pointer-events-auto"
                  style={{
                    bottom: '20px', left: '20px', right: '20px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 'calc(max(0px, 30px - 20px + 6px))',
                    padding: '12px 14px'
                  } as React.CSSProperties}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full overflow-hidden border border-white/10 flex-shrink-0 w-12 h-12">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={miniAvatarUrl || avatarUrl}
                        alt={`${name} mini`}
                        loading="lazy"
                        style={{ display: 'block', borderRadius: '50%' }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="text-sm font-medium text-white/90 leading-none">@{handle}</div>
                      <div className="text-sm text-white/70 leading-none">{status}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onContactClick}
                    className="border border-white/10 rounded-lg px-4 py-3 text-xs font-semibold text-white/90 backdrop-blur-[10px] transition-all duration-200 ease-out hover:border-white/40 hover:-translate-y-px"
                  >
                    {contactText}
                  </button>
                </div>
              )}
            </div>

            {/* Name + title overlay */}
            <div
              className="max-h-full overflow-hidden text-center relative z-[5]"
              style={{
                transform: 'translate3d(calc(var(--pointer-from-left)*-6px + 3px),calc(var(--pointer-from-top)*-6px + 3px),0.1px)',
                mixBlendMode: 'luminosity', gridArea: '1 / -1', borderRadius: cardRadius, pointerEvents: 'none'
              }}
            >
              <div className="w-full absolute flex flex-col" style={{ top: '3em' }}>
                <h3
                  className="font-semibold m-0"
                  style={{
                    fontSize: 'min(5svh, 3em)',
                    backgroundImage: 'linear-gradient(to bottom, #fff, #6f6fbe)',
                    backgroundSize: '1em 1.5em',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text', WebkitBackgroundClip: 'text'
                  }}
                >
                  {name}
                </h3>
                <p
                  className="font-semibold whitespace-nowrap mx-auto w-min"
                  style={{
                    position: 'relative', top: '-12px', fontSize: '16px',
                    backgroundImage: 'linear-gradient(to bottom, #fff, #4a4ac0)',
                    backgroundSize: '1em 1.5em',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text', WebkitBackgroundClip: 'text'
                  }}
                >
                  {title}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
