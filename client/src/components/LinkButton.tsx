import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

const linkButtonStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  padding: 0.65rem 1rem;
  border-radius: ${theme.radii.md};
  border: 1px solid ${theme.colors.text.light};
  background: ${theme.colors.surfaceDeep};
  color: #ffffff; /* Match FilmMenu ticket button */
  font-family: ${theme.typography.fontFamily};
  transition: background ${theme.transitions.default}, color ${theme.transitions.default}, border-color ${theme.transitions.default}, filter ${theme.transitions.default};

  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }
  @media (hover: hover) {
    &:hover { filter: brightness(1.1); }
  }
  &:active { filter: brightness(0.95); }

  /* Desktop-only: slightly lighter charcoal background */
  ${theme.breakpoints.desktop} {
    background: #141414; /* mid charcoal */
    @media (hover: hover) { &:hover { background: #181818; } }
    &:active { background: #101010; }
  }
`;

const StyledLink = styled(Link)`
  ${linkButtonStyles}
`;
const StyledAnchor = styled.a`
  ${linkButtonStyles}
`;

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
}

function isExternal(href?: string) {
  return !!href && /^(?:[a-z]+:)?\/\//i.test(href);
}

export function LinkButton({ to, ...props }: LinkButtonProps) {
  if (!to) return <StyledAnchor {...props} />;
  if (isExternal(to)) return <StyledAnchor href={to} {...props} />;
  return <StyledLink to={to} {...props} />;
}
