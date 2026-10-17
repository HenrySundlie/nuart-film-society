import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

export const MenuIcon = styled.div<{ visible?: boolean }>`
  position: fixed;
  top: calc(${theme.spacing.md} + env(safe-area-inset-top, 0px));
  right: calc(${theme.spacing.md} + env(safe-area-inset-right, 0px));
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${theme.colors.surfaceDeep};
  border: 1px solid ${theme.colors.text.light};
  cursor: pointer;
  z-index: 1002;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transition: opacity ${theme.transitions.default};

  div {
    width: 20px;
    height: 2px;
    background-color: ${theme.colors.text.light};
    margin: 2.5px 0;
    transition: 0.4s;
  }
`;

export const MenuCard = styled.div<{ isOpen: boolean; visible?: boolean }>`
  position: fixed;
  top: calc(${theme.spacing.md} + env(safe-area-inset-top, 0px));
  right: calc(${theme.spacing.md} + env(safe-area-inset-right, 0px));
  /* Fit the three navigation links without the former calendar row. */
  width: ${({ isOpen }) => (isOpen ? '180px' : '44px')};
  height: ${({ isOpen }) => (isOpen ? '150px' : '44px')};
  background-color: ${theme.colors.surfaceDeep};
  border: 1px solid ${theme.colors.text.light};
  border-radius: ${({ isOpen }) => (isOpen ? '20px' : '22px')};
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition:
    width 0.4s ease-in-out,
    height 0.4s ease-in-out,
    border-radius 0.4s ease-in-out,
    opacity 0.4s ease-in-out;
  z-index: 1001;
  overflow: hidden;
  transform-origin: top right;
  opacity: ${({ isOpen, visible }) => (isOpen ? 1 : visible ? 1 : 0)};
  pointer-events: ${({ isOpen, visible }) => (isOpen || visible ? 'auto' : 'none')};

  > * {
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
  }
`;

export const MenuLinks = styled.div`
  /* Keep text at its final size so it never reflows during the expansion. */
  position: absolute;
  top: 0;
  right: 0;
  width: 178px;
  height: 148px;
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.spacing.md};
`;

export const NavLink = styled(Link)`
  flex-shrink: 0;
  white-space: nowrap;
  color: ${theme.colors.text.light};
  text-decoration: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: 4px;
  transition: ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.highlight};
    color: ${theme.colors.secondary};
  }

  ${theme.breakpoints.mobile} {
    padding: ${theme.spacing.xs};
    font-size: 0.9rem;
  }
`;
