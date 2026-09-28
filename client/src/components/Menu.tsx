import { useState, useEffect, useRef } from 'react';
import { MenuIcon, MenuCard, NavLink } from '../styles/Menu.styles';

type MenuProps = {
  /** Optional override to control the visibility of the icon externally (e.g., Home scroll). */
  visibleOverride?: boolean;
};

export default function Menu({ visibleOverride }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuCardRef = useRef<HTMLDivElement>(null);
  const ANIMATION_DURATION = 400; // ms, matches CSS transition

  // Only show the icon when menu is closed and not animating
  const [iconVisible, setIconVisible] = useState(true);

  const openMenu = () => {
    setIconVisible(false);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setTimeout(() => setIconVisible(true), ANIMATION_DURATION);
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        menuCardRef.current &&
        !menuCardRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu if visibleOverride becomes false while menu is open
  useEffect(() => {
    if (isOpen && visibleOverride === false) {
      closeMenu();
    }
  }, [visibleOverride, isOpen]);

  const shouldShowIcon = (visibleOverride ?? true) && iconVisible && !isOpen;

  return (
    <>
      <MenuIcon
        onClick={openMenu}
        visible={shouldShowIcon}
        aria-label="Open menu"
      >
        <div />
        <div />
        <div />
      </MenuIcon>
      <MenuCard isOpen={isOpen} ref={menuCardRef} visible={shouldShowIcon}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/films" onClick={closeMenu}>
          Films
        </NavLink>
        <NavLink to="/articles" onClick={closeMenu}>
          Articles & Reviews
        </NavLink>
      </MenuCard>
    </>
  );
}
