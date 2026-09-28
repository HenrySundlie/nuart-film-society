import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

export const FilmCard = styled(Link)`
  position: relative;
  display: grid;
  /* Increase poster/image share of horizontal space */
  grid-template-columns: clamp(120px, 30%, 210px) 1fr;
  align-items: stretch;
  text-decoration: none;
  border-radius: ${theme.radii.md};
  overflow: clip;
  /* Updated to use same visual treatment as Home page Contact (FooterCard) */
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  box-shadow: none;
  transition:
    filter 220ms ease,
    background 220ms ease,
    box-shadow 220ms ease;
  min-height: clamp(150px, 18vw, 180px);

  &:hover {
    /* Lightly elevate on hover while keeping consistent palette */
    background: ${theme.colors.surface};
    box-shadow: ${theme.shadows.card};
    filter: saturate(1.02) contrast(1.01);
  }

  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }

  /* Compact variant for Previous films (title only) */
  &.compact {
    /* Even smaller minimum height for previous films */
    min-height: clamp(85px, 11vw, 118px);
    /* Slightly narrower image column so text area doesn't force extra height */
    grid-template-columns: clamp(100px, 25%, 170px) 1fr;
  }

  ${theme.breakpoints.mobile} {
    /* Mobile: reduce image share so poster occupies about one-third of width */
    /* Using 34% to allow for padding/border while visually reading near 1/3 */
    grid-template-columns: clamp(95px, 34%, 160px) 1fr;
    min-height: 150px;

    &.compact {
      min-height: 100px;
      grid-template-columns: clamp(85px, 32%, 140px) 1fr;
    }
  }
`;

export const FilmImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(1.03) contrast(1.02);
  transform: translateZ(0);
  transition: transform 450ms cubic-bezier(0.2, 0.7, 0, 1);

  ${FilmCard}:hover & {
    transform: scale(1.03);
  }

  ${theme.breakpoints.mobile} {
    /* Ensure image does not stretch excessively vertically; allow card content to define height */
    height: 100%;
    /* Add a min-height safeguard so very short cards still show a readable image */
  }

  /* Compact variant: limit the intrinsic height pressure by constraining aspect ratio */
  ${FilmCard}.compact & {
    aspect-ratio: 2 / 3;
    /* Allow the container's min-height to dominate instead of natural image expansion */
    height: 100%;
  }
`;

export const FilmInfo = styled.div`
  padding: clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg});
  display: grid;
  /* Layout: title on its own row; below it two columns (details left, button right) without changing overall card size */
  grid-template-areas:
    'title title'
    'details ticket';
  /* Two flexible columns so ticket button can stretch */
  grid-template-columns: 1fr 1fr;
  /* Make second row fill available height so button can stretch */
  grid-auto-rows: auto 1fr;
  align-content: start;
  align-items: start;
  gap: calc(${theme.spacing.sm} * 0.75) ${theme.spacing.md};
  color: ${theme.colors.text.primary};
  min-width: 0; /* allow text truncation/clamping */

  .film-title-row {
    grid-area: title;
    align-self: start;
  }
  .details {
    grid-area: details;
    display: flex;
    flex-direction: column;
    gap: 1px;
    align-items: flex-start;
  }
  .ticket-btn {
    grid-area: ticket;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.65rem 1rem;
    width: 100%;
    /* Increased font size for better prominence */
    font-size: clamp(0.95rem, 0.8rem + 0.5vw, 1.15rem);
    line-height: 1.15;
    font-weight: 600;
    /* Use global brand font */
    font-family: ${theme.typography.fontFamily};
    white-space: normal;
    margin-right: 0;
    align-self: stretch; /* occupy full height of its grid cell */
    /* Match MenuIcon styling */
    background: ${theme.colors.surfaceDeep};
    border: 1px solid ${theme.colors.text.light};
    color: #ffffff; /* Force white text for Buy Tickets button */
    border-radius: ${theme.radii.md}; /* match global card radius for consistency */
    transition:
      background ${theme.transitions.default},
      color ${theme.transitions.default},
      border-color ${theme.transitions.default},
      box-shadow ${theme.transitions.default};

    &:hover {
      background: ${theme.colors.surfaceDeep};
      filter: brightness(1.1);
    }
    &:active {
      filter: brightness(0.95);
    }
    &:focus-visible {
      outline: var(--ring);
      outline-offset: 3px;
    }

    /* Desktop-only: slightly lighter charcoal background for better prominence */
    ${theme.breakpoints.desktop} {
      background: #141414; /* between surfaceDeep (#0B0B0B) and surface (#282828) */
      &:hover {
        background: #181818;
      }
      &:active {
        background: #101010;
      }
    }
  }

  /* Ensure long titles don't push layout oddly */
  .film-title-row > * {
    margin-bottom: 2px;
  }

  /* Mobile: revert to previous vertical flow with full-width ticket button at bottom */
  ${theme.breakpoints.mobile} {
    grid-template-areas: 'title' 'details' 'ticket';
    grid-template-columns: 1fr;
    align-content: center;
    align-items: center;
    text-align: center;
    gap: calc(${theme.spacing.sm} * 0.6);

    .film-title-row {
      align-self: center;
    }
    .details {
      align-items: center;
    }
    .ticket-btn {
      width: 100%;
      aspect-ratio: auto; /* allow natural height */
      padding: 0.7rem 1rem; /* revert to normal button padding */
      /* Keep it slightly larger on mobile too */
      font-size: clamp(0.98rem, 0.92rem + 0.6vw, 1.2rem);
      margin-right: 0; /* reset desktop margin */
    }
  }

  ${FilmCard}.compact & {
    /* Balanced horizontal padding; center content */
    padding: calc(${theme.spacing.xs} + 4px)
      clamp(${theme.spacing.md}, 4vw, ${theme.spacing.lg});
    gap: ${theme.spacing.xs};
    justify-items: center;
    text-align: center;
    align-content: center;
    /* Compact variant keeps original simple stack */
    grid-template-areas: 'title';
    grid-template-columns: 1fr;
  }
`;

export const SectionHeading = styled.h2`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin: 0 0 1.25rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-align: center;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  color: ${theme.colors.text.primary};
  text-wrap: balance;

  &::before,
  &::after {
    content: '';
    flex: 1 1 auto;
    height: 1px;
    background: ${theme.colors.text.primary};
    max-width: 420px; /* prevents overly long lines on ultra-wide */
    opacity: 0.8;
  }

  &::before {
    margin-left: clamp(0.5rem, 2vw, 2rem);
  }
  &::after {
    margin-right: clamp(0.5rem, 2vw, 2rem);
  }

  ${theme.breakpoints.mobile} {
    gap: 0.85rem;
    font-size: clamp(1.4rem, 5.5vw, 1.75rem);
  }
`;

export const FilmNote = styled.p`
  margin: 0.45rem 0 0; /* small gap below time */
  color: ${theme.colors.text.secondary ?? 'rgba(255,255,255,0.78)'};
  font-size: clamp(0.85rem, 0.75rem + 0.6vw, 1rem);
  line-height: 1.35;
  max-width: 68ch;
  /* Allow the note to wrap naturally and not cause overflow */
  word-break: break-word;

  ${theme.breakpoints.mobile} {
    /* Slightly more compact on narrow screens */
    margin-top: 0.4rem;
    font-size: clamp(0.82rem, 1.6vw, 0.98rem);
    text-align: center;
  }
`;

export {
  Container,
  Title,
  Grid as FilmGrid,
  CardTitle as FilmTitle,
  DateLabel as FilmDate,
  DateLabel as FilmTime,
} from './Catalog.styles';
