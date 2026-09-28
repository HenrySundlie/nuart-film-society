import styled from '@emotion/styled';
import { theme } from '../theme';

export const Container = styled.div`
  --ring: 2px solid ${theme.colors.accent};

  min-height: 100dvh;
  color: ${theme.colors.text.primary};
  background: ${theme.colors.background};
  padding: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  ${theme.breakpoints.mobile} {
    padding: ${theme.spacing.md};
  }
`;

export const Title = styled.h1`
  margin: 0 auto clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});
  max-width: 1100px;
  padding-inline: 0;
  text-align: left;
  letter-spacing: 0.04em;
  line-height: 1.08;
  font-weight: 400;
  font-size: clamp(
    ${theme.typography.h1.mobile.fontSize},
    4vw,
    ${theme.typography.h1.fontSize}
  );

  color: #ffffff;
  background: none;
  -webkit-background-clip: initial;
  background-clip: initial;
  position: relative;
  z-index: 0;
  text-wrap: balance;

  ${theme.breakpoints.mobile} {
    max-width: 100%;
    padding-inline: 0;
    display: block;
  }
`;

export const Grid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: clamp(${theme.spacing.md}, 2.5vw, ${theme.spacing.lg});
  grid-template-columns: 1fr;

  ${theme.breakpoints.desktop} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${theme.breakpoints.mobile} {
    gap: ${theme.spacing.md};
  }
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: clamp(
    ${theme.typography.h2.mobile.fontSize},
    2.2vw,
    ${theme.typography.h2.fontSize}
  );
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.01em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const DateLabel = styled.p`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: clamp(0.95rem, 0.7rem + 0.55vw, 1.2rem);
  line-height: 1.25;

  &::before {
    margin-right: 0.5ch;
    opacity: 0.9;
  }
`;
