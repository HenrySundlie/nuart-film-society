import styled from '@emotion/styled';
import { theme } from '../theme';

export const Button = styled.button`
  appearance: none;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.sm};
  padding: 0.7rem 1rem;
  font-weight: 600;
  /* Ensure buttons use global typography font */
  font-family: ${theme.typography.fontFamily};
  color: ${theme.colors.text.primary};
  background: ${theme.colors.surface};
  cursor: pointer;
  transition:
    background ${theme.transitions.default},
    color ${theme.transitions.default},
    border-color ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.highlight};
  }
  &:active {
    background: ${theme.colors.surface};
  }
  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;
