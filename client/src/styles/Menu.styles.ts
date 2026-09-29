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
  /*
    Size to make MenuCard square and fit 4 items.
    Ideally, height would be based on content and width would match height automatically,
    but CSS cannot set width = height when height is dynamic. JS workaround needed for auto.
  */
  width: ${({ isOpen }) => (isOpen ? '180px' : '44px')};
  height: ${({ isOpen }) => (isOpen ? '200px' : '44px')};
  background-color: ${theme.colors.surfaceDeep};
  border: 1px solid ${theme.colors.text.light};
  border-radius: ${({ isOpen }) => (isOpen ? '20px' : '50%')};
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition: all 0.4s ease-in-out;
  z-index: 1001;
  padding: ${({ isOpen }) => (isOpen ? `${theme.spacing.md}` : '0')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.spacing.md};
  overflow: hidden;
  transform-origin: top right;
  opacity: ${({ isOpen, visible }) => (isOpen ? 1 : visible ? 1 : 0)};
  pointer-events: ${({ isOpen, visible }) => (isOpen || visible ? 'auto' : 'none')};

  > * {
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
  }
`;

export const NavLink = styled(Link)`
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
