import styled from '@emotion/styled';
import { theme } from '../theme';

export const ContentSection = styled.main`
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

  /* Both queries match at 768px; keep content below the mobile action card. */
  ${theme.breakpoints.desktop} {
    margin-top: 0;
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
