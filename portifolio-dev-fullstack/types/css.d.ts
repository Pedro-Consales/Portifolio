// Lets TypeScript accept side-effect CSS imports like `import "./globals.css"`.
// Without this, the editor flags ts(2882) ("Cannot find module or type
// declarations for side-effect import"). No runtime effect — Next.js handles
// CSS imports through its own loader.
declare module "*.css";
