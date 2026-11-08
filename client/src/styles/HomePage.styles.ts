import styled from '@emotion/styled';
import { theme } from '../theme';

export const HomePage = styled.div`
  width: 100%;
  color: ${theme.colors.text.secondary};

  a:focus-visible, button:focus-visible {
    outline: 2px solid ${theme.colors.link};
    outline-offset: 4px;
  }
`;

export const Hero = styled.header`
  position: relative;
  /* Match master's first heading: 72vh hero, content overlap, and text insets. */
  height: calc(
    72vh - clamp(96px, 15vh, 192px) + clamp(8px, 1.2vh, 16px) + 48px
  );
  margin-top: calc(-1 * env(safe-area-inset-top, 0px));

  > img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 72vh;
    object-fit: cover;
    object-position: center;
    filter: saturate(1.05) contrast(1.02);
    display: block;
  }

  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    pointer-events: none;
  }

  &::before {
    position: fixed;
    z-index: 3;
    top: 0;
    height: 240px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.85), transparent);
  }

  &::after {
    top: calc(72vh - clamp(160px, 24vh, 300px));
    height: clamp(160px, 24vh, 300px);
    background: linear-gradient(
      180deg,
      rgba(28, 28, 28, 0) 0%,
      rgba(28, 28, 28, 0.75) 50%,
      rgba(28, 28, 28, 0.9) 85%,
      ${theme.colors.background} 100%
    );
  }

  ${theme.breakpoints.mobile} {
    height: 50vh;
    > img { height: 100%; }
    &::before, &::after { display: none; }
    box-shadow:
      inset 0 -80px 120px -60px ${theme.colors.background},
      inset 0 60px 120px -60px rgba(0, 0, 0, 0.6);

    ${theme.breakpoints.desktop} {
      height: 72vh;
      &::after { display: block; }
    }
  }
`;

export const TopFade = styled.div<{ darkFade: boolean }>`
  display: none;
  ${theme.breakpoints.mobile} { display: block; }
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

export const PageTitle = styled.h1`
  position: fixed;
  z-index: 4;
  top: calc(24px + env(safe-area-inset-top, 0px));
  left: calc(20px + env(safe-area-inset-left, 0px));
  right: calc(20px + env(safe-area-inset-right, 0px));
  margin: 0;
  pointer-events: none;
  color: ${theme.colors.text.primary};
  font-size: clamp(32px, 4.598058vw, 60px);
  line-height: 1.20777;
  font-weight: 400;
  letter-spacing: 8px;
  text-align: center;
  text-wrap: balance;

  ${theme.breakpoints.mobile} {
    position: absolute;
    top: calc(${theme.spacing.lg} + env(safe-area-inset-top, 0px));
    left: 0;
    right: 0;
    width: min(100%, 96vw);
    margin: 0 auto;
    padding-left: env(safe-area-inset-left, 0px);
    padding-right: env(safe-area-inset-right, 0px);
    font-size: clamp(${theme.typography.h1.mobile.fontSize}, 3.6vw, ${theme.typography.h1.fontSize});
    line-height: 1.1;
    letter-spacing: 0.5rem;
    color: #fff;
    -webkit-text-fill-color: #fff;
    z-index: 1002;
  }
`;

export const HomeColumns = styled.main`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 196px minmax(0, 601px);
  gap: ${theme.spacing.lg};
  width: min(890px, calc(100% - 48px));
  margin: 0 auto;
  padding: 0 0 32px 24px;

  ${theme.breakpoints.mobile} {
    width: 100%;
    padding: 16px ${theme.layout.contentPadding.mobile.x} 32px;
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  min-width: 0;
  font-size: 15.2px;
  line-height: 25.08px;
  p { margin: 0; }

  ${theme.breakpoints.mobile} {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SidebarCard = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  min-height: 217px;
  padding: 20px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.home.cardRadius};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.card};

  &.contact-card {
    min-height: 240px;
    > p { width: 200px; }
  }

  ${theme.breakpoints.mobile} {
    min-height: 0;
    &.contact-card { min-height: 0; }
  }
`;

export const SidebarHeading = styled.h2`
  margin: 0;
  font-size: 17.6px;
  font-weight: 600;
  line-height: 28.16px;
  color: ${theme.colors.text.primary};
`;

export const EmailField = styled.input`
  width: 100%;
  min-width: 0;
  height: 38px;
  flex-shrink: 0;
  padding: 0 8px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.home.cardRadius};
  background: ${theme.colors.surfaceDeep};
  color: ${theme.colors.text.light};
  font: inherit;
  font-size: 13px;
  opacity: 1;
  -webkit-text-fill-color: ${theme.colors.text.light};
  &::placeholder { color: ${theme.colors.text.light}; opacity: 1; }
`;

export const ContactLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
  li { position: relative; white-space: nowrap; }
  a { color: ${theme.colors.link}; text-decoration: underline; }
  a:hover { color: ${theme.colors.text.primary}; }
`;

export const CopyEmailButton = styled.button`
  appearance: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${theme.colors.link};
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
  &:hover { color: ${theme.colors.text.primary}; }
`;

export const CopyToast = styled.span`
  position: absolute;
  bottom: calc(100% + 4px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  max-width: 260px;
  width: max-content;
  white-space: normal;
  pointer-events: none;
  border-radius: ${theme.home.cardRadius};
  background: ${theme.colors.surfaceDeep};
  color: ${theme.colors.text.primary};
  font-size: 14px;
  line-height: 1.4;
  &:not(:empty) {
    padding: 4px 8px;
    border: 1px solid ${theme.colors.border};
  }
`;

export const SidebarNavigation = styled.nav`
  margin-top: calc(${theme.spacing.sm} - ${theme.spacing.lg});
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: 8px 21px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    font-size: 17.6px;
    font-weight: 600;
    line-height: 22px;
    text-decoration: none;
    color: ${theme.colors.text.primary};
  }

  a:hover { text-decoration: underline; }

  img { display: block; flex-shrink: 0; }

  ${theme.breakpoints.mobile} {
    grid-column: 1 / -1;
    margin-top: calc(${theme.spacing.sm} - ${theme.spacing.md});
    padding: 8px 0;
  }
`;

export const Editorial = styled.div`
  min-width: 0;
  font-size: 18px;
  line-height: 28.8px;

  > section {
    display: flex;
    flex-direction: column;
    gap: ${theme.home.paragraphGap};
    padding-bottom: ${theme.spacing.lg};
  }

  /* Retain the design's section spacing, while allowing longer text to grow. */
  > section:nth-of-type(1) { min-height: 221px; }
  > section:nth-of-type(2) { min-height: 182px; }
  > section:nth-of-type(3) { min-height: 308px; }
  > section:nth-of-type(4) { min-height: 135px; }
  > section:nth-of-type(5) { min-height: 164px; }

  h2 {
    margin: 0;
    font-size: 21.6px;
    font-weight: 600;
    line-height: 34.56px;
    color: ${theme.colors.text.primary};
  }

  p { margin: 0; }

  ${theme.breakpoints.mobile} {
    > section:nth-of-type(n) { min-height: 0; }
  }
`;

export const FooterFinePrint = styled.footer`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  padding-top: ${theme.spacing.md};
  border-top: 1px dashed ${theme.colors.border};
  color: ${theme.colors.text.light};
  font-size: 14px;
  line-height: 22.4px;
  min-height: 121px;
`;
