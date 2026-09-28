import{t as r,a as t,j as n,M as p}from"./index-CKO03ewh.js";import{f as u}from"./films-CHmQLTa4.js";import{u as f,B as h,I as a,L as l}from"./Detail.styles-DKv-KImz.js";import{a as o}from"./emotion-DNMUf1kK.js";import{L as b,f as x}from"./react-lBbUjYft.js";const d=o("div",{target:"e29um9r5"})("min-height:100dvh;color:",r.colors.text.primary,";background:",r.colors.background,";padding:clamp(",r.spacing.lg,", 3vw, ",r.spacing.xl,");-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;"),k=o("div",{target:"e29um9r4"})("max-width:min(1200px, 92vw);margin:0 auto;display:grid;grid-template-columns:1fr;gap:clamp(",r.spacing.lg,", 3vw, ",r.spacing.xl,");align-items:start;"),y=o("h1",{target:"e29um9r3"})("grid-column:1/-1;margin:0 0 clamp(",r.spacing.md,", 2vw, ",r.spacing.lg,`);font-size:clamp(
    `,r.typography.h1.mobile.fontSize,`,
    4vw,
    `,r.typography.h1.fontSize,`
  );line-height:1.1;text-align:center;letter-spacing:0.08em;font-weight:400;color:transparent;background:`,r.textStyles.gradientPrimary,";-webkit-background-clip:text;background-clip:text;text-wrap:balance;"),v=o("div",{target:"e29um9r2"})("position:relative;border:1px solid ",r.colors.border,";border-radius:",r.radii.md,";background:",r.colors.surface,";padding:clamp(",r.spacing.lg,", 2.5vw, ",r.spacing.xl,");box-shadow:none;display:grid;gap:",r.spacing.md,";backdrop-filter:none;color:",r.colors.text.primary,";"),w=o("p",{target:"e29um9r1"})("grid-column:1/-1;margin:clamp(",r.spacing.md,", 3vw, ",r.spacing.lg,") 0;color:",r.colors.text.primary,";font-size:clamp(1rem, 1.1vw, 1.125rem);line-height:1.85;text-wrap:pretty;hanging-punctuation:first allow-end;hyphens:auto;"),$=o("article",{target:"e29um9r0"})("grid-column:1/-1;margin:clamp(",r.spacing.lg,", 4vw, ",r.spacing.xl,") 0 0;padding:clamp(",r.spacing.lg,", 2.5vw, ",r.spacing.xl,");background:",r.surfaces.elevatedOverlay,",",r.colors.surfaceDeep,";border:1px solid ",r.colors.border,";border-radius:",r.radii.lg,";backdrop-filter:saturate(1.1) blur(6px);box-shadow:",r.shadows.card,";line-height:1.75;font-size:clamp(1rem, 1.05vw, 1.1rem);color:",r.colors.text.primary,";h2,h3,h4{font-weight:500;letter-spacing:0.04em;line-height:1.25;margin:2.2em 0 0.9em;color:",r.colors.text.primary,";}p+p{margin-top:1em;}a{color:",r.colors.link,";text-decoration:underline;text-underline-offset:2px;&:focus-visible{outline:",r.shadows.focus,";outline-offset:3px;border-radius:4px;}}ul,ol{margin:1em 0 1.25em;padding-left:1.25em;}blockquote{margin:1.5em 0;padding:0.75em 1em;border-left:4px solid ",r.colors.text.light,";background:rgba(255, 255, 255, 0.04);font-style:italic;}"),m=`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  padding: 0.65rem 1rem;
  border-radius: ${r.radii.md};
  border: 1px solid ${r.colors.text.light};
  background: ${r.colors.surfaceDeep};
  color: #ffffff; /* Match FilmMenu ticket button */
  font-family: ${r.typography.fontFamily};
  transition: background ${r.transitions.default}, color ${r.transitions.default}, border-color ${r.transitions.default}, filter ${r.transitions.default};

  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }
  @media (hover: hover) {
    &:hover { filter: brightness(1.1); }
  }
  &:active { filter: brightness(0.95); }

  /* Desktop-only: slightly lighter charcoal background */
  ${r.breakpoints.desktop} {
    background: #141414; /* mid charcoal */
    @media (hover: hover) { &:hover { background: #181818; } }
    &:active { background: #101010; }
  }
`,L=o(b,{target:"e13xulev1"})(m,";"),g=o("a",{target:"e13xulev0"})(m,";");function S(i){return!!i&&/^(?:[a-z]+:)?\/\//i.test(i)}function z({to:i,...e}){return i?S(i)?t(g,{href:i,...e}):t(L,{to:i,...e}):t(g,{...e})}function I(){const{id:i}=x(),e=u.find(c=>c.id===Number(i)),s=f("films",e&&(e.article||`film-${e.id}`));return e?t(d,{children:n(k,{children:[t(h,{to:"/films","aria-label":"Back to film list"}),t(y,{children:e.title}),n(v,{children:[n(a,{children:[t(l,{children:"Year:"})," ",e.year]}),n(a,{children:[t(l,{children:"Director:"})," ",e.director]}),n(a,{children:[t(l,{children:"Notable Actors:"})," ",e.actors?.join(", ")]}),n(a,{children:[t(l,{children:"Duration:"})," ",e.duration," minutes"]}),t(z,{to:e.ticketLink,target:"_blank",rel:"noopener noreferrer",onClick:c=>c.stopPropagation(),children:"Buy Tickets"})]}),t(w,{children:e.description}),s&&t($,{children:t(p,{children:s})})]})}):t(d,{children:"Film not found"})}export{I as default};
