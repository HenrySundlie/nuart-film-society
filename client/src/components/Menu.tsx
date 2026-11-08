import { useState, useEffect, useRef } from 'react';
import { MenuIcon, MenuCard, MenuLinks, NavLink } from '../styles/Menu.styles';

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
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeMenu();
    }
    function handleClickOutside(event: MouseEvent) {
      if (
        menuCardRef.current &&
        !menuCardRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
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
        type="button"
        onClick={openMenu}
        visible={shouldShowIcon}
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="primary-menu-links"
      >
        <div />
        <div />
        <div />
      </MenuIcon>
      <MenuCard isOpen={isOpen} ref={menuCardRef} visible={shouldShowIcon}>
        <MenuLinks id="primary-menu-links" inert={!isOpen}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/articles" onClick={closeMenu}>
            Articles & Reviews
          </NavLink>
        </MenuLinks>
      </MenuCard>
    </>
  );
}
