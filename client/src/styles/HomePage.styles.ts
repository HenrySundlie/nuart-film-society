// src/styles/HomePage.styles.ts
import styled from '@emotion/styled';
import { theme } from '../theme';

// ============================================================================
// CSS Custom Properties
// ============================================================================

const HEADER_IMAGE_HEIGHT = '50vh';

// ============================================================================
// Header Image Section
// ============================================================================

/**
 * Full-bleed hero; text and controls respect the safe area separately.
 */
export const HeaderImageContainer = styled.div`
  --header-image-height: ${HEADER_IMAGE_HEIGHT};
  position: relative;
  width: 100vw;
  height: var(--header-image-height);

  /* Full-width positioning to break out of container constraints */
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  /* Let the image fill the top inset reserved by AppContainer. */
  margin-top: calc(-1 * env(safe-area-inset-top, 0px));

  /* Center image content */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Bottom fade overlay to ease the image into the background (desktop only) */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: clamp(160px, 24vh, 300px);
    background: linear-gradient(
      to bottom,
      rgba(28, 28, 28, 0) 0%,
      rgba(28, 28, 28, 0.75) 50%,
      rgba(28, 28, 28, 0.9) 85%,
      ${theme.colors.background} 100%
    );
    z-index: 8; /* Below content so text is readable in the overlap */
    pointer-events: none;
    opacity: 0; /* hidden by default; enabled on desktop */
  }

  /* Soft vignette effect for better image integration */
  &:has(img) {
    box-shadow:
      inset 0 -80px 120px -60px ${theme.colors.background},
      inset 0 60px 120px -60px rgba(0, 0, 0, 0.6);
  }

  /* Desktop-specific adjustments */
  ${theme.breakpoints.desktop} {
    height: 72vh; /* image goes further down on desktop */
    &::after {
      opacity: 1;
    }
  }
`;

export const TopFade = styled.div<{ darkFade: boolean }>`
  --fade-color: ${({ darkFade }) =>
    darkFade ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.85)'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: env(safe-area-inset-top, 0px);
  /* A real fixed element with a background also lets Safari tint its top UI. */
  background-color: var(--fade-color);
  z-index: 1001;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 240px;
    background: linear-gradient(to bottom, var(--fade-color), transparent);
    pointer-events: none;
  }
`;

// ============================================================================
// Typography Components
// ============================================================================

export const PageTitle = styled.h1`
  position: absolute;
  top: calc(${theme.spacing.lg} + env(safe-area-inset-top, 0px));
  left: 0;
  right: 0;
  width: min(100%, 96vw);
  margin: 0 auto;
  padding-left: env(safe-area-inset-left, 0px);
  padding-right: env(safe-area-inset-right, 0px);
  text-align: center;
  line-height: 1.1;
  letter-spacing: 0.5rem;
  font-weight: 400;
  font-size: clamp(
    ${theme.typography.h1.mobile.fontSize},
    3.6vw,
    ${theme.typography.h1.fontSize}
  );

  color: #fff;
  -webkit-text-fill-color: #fff;
  text-wrap: balance;
  z-index: 1002; /* Above the fade overlay */
  pointer-events: none;

  /* Desktop-only: make the Home title a little bigger */
  ${theme.breakpoints.desktop} {
    font-size: clamp(${theme.typography.h1.mobile.fontSize}, 4vw, 3.25rem);
  }
`;

// ============================================================================
// Floating Logo (mobile only)
// ============================================================================

export const FloatingLogo = styled.div<{ visible?: boolean }>`
  position: fixed;
  /* Position so the logo vertically centers with the MenuIcon (44px height).
    We offset by half the difference between the icon height and the responsive font-size. */
  top: calc(
    env(safe-area-inset-top, 0px) + ${theme.spacing.md} +
      (44px - clamp(22px, 10vw, 30px)) / 2
  );
  left: calc(${theme.spacing.md} + env(safe-area-inset-left, 0px));
  z-index: 1100; /* Above fades and content */
  color: #fff;
  font-family: ${theme.typography.fontFamily};
  font-weight: 600;
  letter-spacing: 0.12em;
  font-size: clamp(22px, 10vw, 30px);
  line-height: 1;
  text-transform: uppercase;
  pointer-events: none;
  opacity: 0;
  transition: opacity ${theme.transitions.default};

  ${theme.breakpoints.mobile} {
    opacity: ${({ visible }) => (visible ? 1 : 0)};
  }

  ${theme.breakpoints.desktop} {
    display: none;
  }
`;

// ============================================================================
// Title Actions (Desktop-only navigation under the title)
// ============================================================================

export const TitleActions = styled.nav`
  position: absolute;
  /* Position directly below the title, following the title's centering */
  top: calc(
    env(safe-area-inset-top, 0px) + ${theme.spacing.lg} +
      clamp(${theme.typography.h1.mobile.fontSize}, 4vw, 3.25rem) + 1.5rem
  );
  left: 50%;
  transform: translateX(-50%);
  z-index: 1002; /* above fade overlays */
  display: none; /* hidden by default */

  /* Inline group of text links */
  gap: ${theme.spacing.lg};
  padding: 0;
  background: transparent;
  border: 0;
  white-space: nowrap;

  ${theme.breakpoints.mobile} {
    display: none;
  }

  ${theme.breakpoints.desktop} {
    display: flex;
    justify-content: center;
  }
`;

export const TitleActionButton = styled('a')`
  display: inline-block;
  white-space: nowrap;
  text-decoration: none;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  transition: ${theme.transitions.default};
  /* Larger text and hit area */
  font-size: clamp(1.1rem, 1.3vw, 1.4rem);
  padding: 8px 14px;
  line-height: 1.2;

  &:hover {
    color: ${theme.colors.secondary};
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  &:focus-visible {
    outline: ${theme.shadows.focus};
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

// ============================================================================
// Content Section
// ============================================================================

/**
 * Container for the main content below the header image section
 * Provides proper spacing from the mobile action card and flows with page scroll
 */
export const ContentSection = styled.section`
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;

  /* Default desktop spacing: sit just below the header image */
  margin-top: clamp(${theme.spacing.md}, 2.5vw, ${theme.spacing.xl});

  /* Ensure content appears above the header image section and flows properly */
  position: relative;
  z-index: 20; /* allow overlap above the image on desktop */

  /* Clear any floating or positioning issues */
  clear: both;

  /* Ensure content flows naturally after the header */
  display: block;

  /* Typography using the theme's default font */
  font-family: ${theme.typography.fontFamily};
  font-size: clamp(15px, 0.6vw + 12px, 18px);
  line-height: 1.6;
  color: ${theme.colors.text.secondary};

  /* Responsive adjustments */
  ${theme.breakpoints.mobile} {
    /* Use shared mobile content padding so text doesn't hug the edges */
    padding: ${theme.layout.contentPadding.mobile.y}
      ${theme.layout.contentPadding.mobile.x};
    /* Card has its own bottom margin; start content immediately after and use padding for spacing */
    margin-top: 0;
    /* Use a comfortable default body size on mobile (about 16px) */
    font-size: ${theme.typography.body.mobile?.fontSize ?? '16px'};
  }

  /* Desktop: bring text closer to the image */
  ${theme.breakpoints.desktop} {
    /* Pull content upwards even further; keep it responsive and bounded */
    margin-top: clamp(-192px, -15vh, -96px);
    /* Keep a little breathing room from the image edge, responsive */
    padding-top: clamp(8px, 1.2vh, 16px);
  }
`;

/**
 * Container for the content text with proper spacing and readability
 */
export const ContentText = styled.div`
  /* Add padding at top for proper spacing of first elements like back buttons */
  padding-top: ${theme.spacing.lg};

  /* Sample text styling */
  p {
    margin-bottom: ${theme.spacing.md};
    text-align: justify;
    hyphens: auto;

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* Headings within content */
  h2,
  h3 {
    color: ${theme.colors.text.primary};
    margin: ${theme.spacing.lg} 0 ${theme.spacing.md} 0;
    font-weight: 600;
  }

  h2 {
    font-size: 1.2em;
  }

  h3 {
    font-size: 1.1em;
  }

  /* Lists */
  ul,
  ol {
    margin: ${theme.spacing.md} 0;
    padding-left: ${theme.spacing.lg};
  }

  li {
    margin-bottom: ${theme.spacing.sm};
  }

  /* Ensure links are visibly underlined within content */
  a {
    color: ${theme.colors.link};
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* Improve readability on smaller screens */
  ${theme.breakpoints.mobile} {
    p {
      text-align: left;
      hyphens: auto;
    }
    h2,
    h3 {
      margin-top: ${theme.spacing.md};
    }
    & > :first-of-type {
      margin-top: 0;
    }
    ul,
    ol {
      margin: ${theme.spacing.sm} 0 ${theme.spacing.md};
    }
  }

  /* Desktop measure: limit to ~70 characters per line for readability */
  ${theme.breakpoints.desktop} {
    max-width: 70ch;
    margin-left: auto;
    margin-right: auto;
    p {
      text-align: left;
      text-wrap: pretty;
    }
  }
`;

// ============================================================================
// Home Footer Section (Contact + Credits)
// ============================================================================

export const HomeFooter = styled.footer`
  margin-top: clamp(${theme.spacing.xl}, 6vh, 96px);
  color: ${theme.colors.text.secondary};
`;

export const FooterGrid = styled.div`
  display: grid;
  gap: clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg});
  grid-template-columns: 1fr;
  /* Center the content and match the main text measure */
  max-width: 70ch; /* same as ContentText desktop measure */
  margin-left: auto;
  margin-right: auto;

  ${theme.breakpoints.desktop} {
    /* Keep single column on desktop to center the Contact card */
    grid-template-columns: 1fr;
  }
`;

export const FooterCard = styled.section`
  border-radius: ${theme.radii.md};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.card};
  padding: clamp(${theme.spacing.lg}, 2.5vw, ${theme.spacing.xl});
`;

export const FooterHeading = styled.h2`
  margin: 0 0 ${theme.spacing.md};
  font-size: clamp(1.1rem, 1.2vw, 1.25rem);
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const FooterText = styled.div`
  font-size: 0.95rem;
  line-height: 1.65;
  a {
    color: ${theme.colors.link};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  ul {
    margin: ${theme.spacing.sm} 0 0;
    padding-left: ${theme.spacing.lg};
  }
  li {
    margin: 0 0 ${theme.spacing.xs};
  }
  address {
    font-style: normal;
  }
`;

export const FooterFinePrint = styled.div`
  margin-top: clamp(${theme.spacing.lg}, 2.5vw, ${theme.spacing.xl});
  padding-top: ${theme.spacing.md};
  border-top: 1px dashed ${theme.colors.border};
  display: flex;
  flex-direction: column; /* stack items on separate lines */
  gap: ${theme.spacing.xs};
  align-items: flex-start;
  justify-content: flex-start;
  color: ${theme.colors.text.light};
  font-size: 0.875rem;
`;

// Minimal, theme-aligned button that looks like a link
export const CopyEmailButton = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  color: ${theme.colors.link};
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
  font: inherit;

  &:focus-visible {
    outline: ${theme.shadows.focus};
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

export const CopyToast = styled.span`
  display: inline-block;
  margin-left: ${theme.spacing.sm};
  padding: 2px 8px;
  border-radius: ${theme.radii.pill};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.text.secondary};
  font-size: 0.85em;
  line-height: 1.6;
`;
