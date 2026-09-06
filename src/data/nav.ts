// Deliberately its own file, separate from `content.ts` and `site.ts`.
// `Navbar` is part of the root layout and therefore renders on *every*
// route — including Next.js's auto-generated `/_not-found` page — so
// anything it imports needs to be as lightweight and dependency-free as
// possible. `content.ts` pulls in 16 static image imports for page
// content; keeping nav links out of that file means the global layout
// never has to load that graph just to render a menu.
export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#societies", label: "Societies" },
  { href: "#properties", label: "Properties" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;
