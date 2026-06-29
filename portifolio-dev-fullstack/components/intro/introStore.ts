// Tiny shared store so the Header and the IntroOverlay coordinate without
// racing on window events. Both read the same synchronous snapshot via
// useSyncExternalStore.
//
//   pending  → not decided yet (SSR + first paint): header visible
//   playing  → splash is covering the screen: header tucked up (hidden)
//   revealed → iris opened the Hero: header drops down
//   skipped  → no intro this load: header just stays visible

export type IntroState = "pending" | "playing" | "revealed" | "skipped";

let state: IntroState = "pending";
const subs = new Set<() => void>();

export function setIntroState(next: IntroState) {
  state = next;
  subs.forEach((f) => f());
}

export function subscribeIntro(cb: () => void) {
  subs.add(cb);
  return () => subs.delete(cb);
}

export const getIntroSnapshot = () => state;
export const getIntroServerSnapshot = (): IntroState => "pending";
