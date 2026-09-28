import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

export const BackLink = styled(Link)`
  justify-self: start;
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 50%;
  border: 1px solid ${theme.colors.text.light};
  background: ${theme.colors.surfaceDeep};
  color: ${theme.colors.text.light};
  position: relative;
  transition:
    background ${theme.transitions.default},
    color ${theme.transitions.default},
    border-color ${theme.transitions.default},
    filter ${theme.transitions.default};

  /* Chevron (no stem) pointing left created with borders */
  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-top: 2px solid currentColor;
    border-left: 2px solid currentColor;
    transform: rotate(-45deg) translateX(2px); /* visually center */
    margin-left: 2px;
  }

  &:hover {
    filter: brightness(1.15);
  }
  &:active {
    filter: brightness(0.9);
  }
  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }
`;

export const InfoItem = styled.p`
  margin: 0;
  display: grid;
  grid-template-columns: max(110px, 28%) 1fr;
  align-items: baseline;
  gap: calc(${theme.spacing.md} * 0.5);
  line-height: 1.6;
  color: ${theme.colors.text.primary};
`;

export const Label = styled.strong`
  color: ${theme.colors.text.primary};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.85rem;
`;
