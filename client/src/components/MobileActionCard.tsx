import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  CardContainer,
  TabContainer,
  Tab,
  DividerLine,
  ContentContainer,
  IconContainer,
  TextContent,
} from '../styles/MobileActionCard.styles';

const MobileActionCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'articles'>(
    'upcoming'
  );
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    setActiveTab(direction === 'left' ? 'articles' : 'upcoming');
  }, []);

  // Touch/swipe functionality
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = startX - currentX;
      const diffY = startY - currentY;
      // Only trigger if horizontal swipe is more significant than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          handleSwipe('left');
        } else {
          handleSwipe('right');
        }
        isSwiping = false;
      }
    };

    const handleTouchEnd = () => {
      isSwiping = false;
    };

    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleTouchEnd);

    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleSwipe]);

  return (
    <CardContainer ref={cardRef}>
      <TabContainer>
        <Tab
          active={activeTab === 'upcoming'}
          onClick={() => setActiveTab('upcoming')}
        >
          Films
        </Tab>
        <Tab
          active={activeTab === 'articles'}
          onClick={() => setActiveTab('articles')}
        >
          Articles
        </Tab>
      </TabContainer>

      <DividerLine />

      <ContentContainer>
        {activeTab === 'upcoming' ? (
          <>
            <Link
              to="/films"
              aria-label="View films"
              style={{ display: 'inline-flex', borderRadius: 'inherit' }}
            >
              <IconContainer position="left">
                {/* Inline SVG for film icon (feather film) */}
                <svg
                  viewBox="0 0 24 24"
                  width="70%"
                  height="70%"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="2.18"
                    ry="2.18"
                  ></rect>
                  <line x1="7" y1="2" x2="7" y2="22"></line>
                  <line x1="17" y1="2" x2="17" y2="22"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <line x1="2" y1="7" x2="7" y2="7"></line>
                  <line x1="2" y1="17" x2="7" y2="17"></line>
                  <line x1="17" y1="7" x2="22" y2="7"></line>
                  <line x1="17" y1="17" x2="22" y2="17"></line>
                </svg>
              </IconContainer>
            </Link>
            <TextContent position="right">
              Explore films
            </TextContent>
          </>
        ) : (
          <>
            <Link
              to="/articles"
              aria-label="View articles"
              style={{ display: 'inline-flex', borderRadius: 'inherit' }}
            >
              <IconContainer position="left">
                {/* Inline SVG for articles icon (feather book) */}
                <svg
                  viewBox="0 0 24 24"
                  width="70%"
                  height="70%"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </IconContainer>
            </Link>
            <TextContent position="right">
              Read our latest articles and reviews
            </TextContent>
          </>
        )}
      </ContentContainer>
    </CardContainer>
  );
};

export default MobileActionCard;
