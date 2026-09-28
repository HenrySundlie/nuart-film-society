import styled from '@emotion/styled';
import { theme } from '../theme';

/**
 * Mobile action card positioned at the bottom edge of the header image
 * Provides quick access to films and articles
 */
export const CardContainer = styled.div`
  position: relative;
  width: min(90vw, 420px);
  margin: ${theme.spacing.md} auto 0; /* sits below the header image with spacing */
  margin-bottom: 0; /* content section provides top padding */
  /* Use a variable for consumers to reference height */
  --mobile-card-height: 160px;
  min-height: var(--mobile-card-height);
  background: ${theme.colors.surfaceDeep};
  border-radius: 20px;
  padding: clamp(12px, 1.8vw, 16px);
  z-index: 50;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border: 1px solid ${theme.colors.text.light};
  overflow: hidden;

  /* Mobile only - hidden on desktop */
  display: none;

  /* Responsive adjustments */
  ${theme.breakpoints.mobile} {
    display: block;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  position: relative;
  gap: 0;
  margin-left: -12px;
  margin-right: -12px;
  padding-left: 12px;
  padding-right: 12px;
  width: calc(100% + 24px);
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  background: ${({ active }) => (active ? theme.colors.highlight : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#666')};
  border: none;
  padding: clamp(6px, 1.2vw, 8px) clamp(8px, 1.2vw, 12px);
  font-family: ${theme.typography.fontFamily};
  font-size: clamp(16px, 2.2vw, 18px);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border-radius: 20px;
  white-space: nowrap;

  &:hover {
    background: ${({ active }) => (active ? theme.colors.highlight : 'rgba(255, 255, 255, 0.05)')};
  }
`;

export const DividerLine = styled.div`
  height: 1px;
  background: ${theme.colors.text.light};
  margin: 0 0 20px 0;
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(72px, 10vw, 92px);
  position: relative;
  width: 100%;
`;

export const IconContainer = styled.div<{ position: 'left' | 'right' }>`
  width: clamp(66px, 10.2vw, 82px);
  height: clamp(66px, 10.2vw, 82px);
  background: ${theme.colors.nuartBlue};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: absolute;
  /* Center the icons under their respective tabs by placing them at
     the horizontal centers of the two equal-width tabs: 25% and 75% */
  ${({ position }) => (position === 'left' ? 'left: 25%;' : 'left: 75%;')}
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const TextContent = styled.div<{ position: 'left' | 'right' }>`
  color: #fff;
  font-family: ${theme.typography.fontFamily};
  /* Larger, more readable description text */
  font-size: clamp(16px, 3.8vw, 20px);
  line-height: 1.4;
  flex: 1;
  text-align: center;
  padding: 0 20px;
  min-height: clamp(72px, 10vw, 92px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  ${({ position }) => (position === 'left' ? 'left: clamp(28px, 5.6vw, 40px);' : 'right: clamp(28px, 5.6vw, 40px);')}
  top: 50%;
  transform: translateY(-50%);
  width: 140px;
`;
