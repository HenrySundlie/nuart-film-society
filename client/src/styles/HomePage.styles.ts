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
  height: min(42.194175vw, 640px);
  margin-top: calc(-1 * env(safe-area-inset-top, 0px));

  > img {
    position: absolute;
    top: 0;
    width: 100%;
    height: min(47.41165vw, 719.14px);
    object-fit: cover;
    object-position: center;
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
    z-index: 1;
    top: 0;
    height: 240px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.85), transparent);
  }

  &::after {
    top: min(31.608738vw, 479.45px);
    height: min(15.802913vw, 239.69px);
    background: linear-gradient(
      180deg,
      rgba(28, 28, 28, 0) 0%,
      rgba(28, 28, 28, 0.75) 50%,
      rgba(28, 28, 28, 0.9) 85%,
      ${theme.colors.background} 100%
    );
  }

  ${theme.breakpoints.mobile} {
    height: clamp(250px, 60vw, 420px);
    > img { height: 100%; }
    &::after {
      top: auto;
      bottom: 0;
      height: 42%;
    }
  }
`;

export const PageTitle = styled.h1`
  position: relative;
  z-index: 2;
  top: calc(24px + env(safe-area-inset-top, 0px));
  width: calc(100% - 40px);
  margin: 0 auto;
  color: ${theme.colors.text.primary};
  font-size: clamp(32px, 4.598058vw, 60px);
  line-height: 1.20777;
  font-weight: 400;
  letter-spacing: 8px;
  text-align: center;
  text-wrap: balance;

  ${theme.breakpoints.mobile} {
    font-size: clamp(28px, 6vw, 42px);
    letter-spacing: 0.13em;
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
  li { white-space: nowrap; }
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
  top: calc(100% + 4px);
  left: 20px;
  z-index: 3;
  max-width: 260px;
  border-radius: 4px;
  background: ${theme.colors.surfaceDeep};
  color: ${theme.colors.text.primary};
  font-size: 14px;
  line-height: 1.4;
  &:not(:empty) { padding: 4px 8px; }
`;

export const ArticlesNavigation = styled.nav`
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
