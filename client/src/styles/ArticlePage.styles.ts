import styled from '@emotion/styled';
import { BackLink as BaseBackLink } from './Detail.styles';
import { theme } from '../theme';

export const BackLink = styled(BaseBackLink)`
  margin-bottom: ${theme.spacing.lg};
`;

export const Title = styled.h1`
  margin: clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg}) 0
    clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg});
  font-size: clamp(
    ${theme.typography.h1.mobile.fontSize},
    4vw,
    ${theme.typography.h1.fontSize}
  );
  line-height: 1.1;
  text-align: center;
  letter-spacing: 0.08em;
  font-weight: 400;

  color: transparent;
  background: ${theme.textStyles.gradientPrimary};
  -webkit-background-clip: text;
  background-clip: text;
  text-wrap: balance;
`;

export const MetaSection = styled.div`
  position: relative;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  background: ${theme.colors.surface};
  padding: clamp(${theme.spacing.lg}, 2.5vw, ${theme.spacing.xl});
  box-shadow: none;
  display: grid;
  gap: ${theme.spacing.md};
  backdrop-filter: none;
  color: ${theme.colors.text.primary};
  margin: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl}) 0;
`;

export const Description = styled.p`
  margin: clamp(${theme.spacing.md}, 3vw, ${theme.spacing.lg}) 0;
  color: ${theme.colors.text.primary};
  font-size: clamp(1rem, 1.1vw, 1.125rem);
  line-height: 1.85;
  text-wrap: pretty;
  hanging-punctuation: first allow-end;
  hyphens: auto;
`;

export { InfoItem as MetaItem, Label } from './Detail.styles';

// Article content uses home page's ContentText styling for consistency
export const ArticleContent = styled.article`
  /* Use the same text styling as home page content */
  p {
    margin-bottom: ${theme.spacing.md};
    text-align: justify;
    hyphens: auto;

    &:last-child {
      margin-bottom: 0;
    }
  }

  h2,
  h3,
  h4 {
    color: ${theme.colors.text.primary};
    margin: ${theme.spacing.lg} 0 ${theme.spacing.md} 0;
    font-weight: 600;
    line-height: 1.25;
  }

  h2 {
    font-size: 1.2em;
  }

  h3 {
    font-size: 1.1em;
  }

  ul,
  ol {
    margin: ${theme.spacing.md} 0;
    padding-left: ${theme.spacing.lg};
  }

  li {
    margin-bottom: ${theme.spacing.sm};
  }

  a {
    color: ${theme.colors.link};
    text-decoration: underline;
    text-underline-offset: 2px;
    &:focus-visible {
      outline: ${theme.shadows.focus};
      outline-offset: 3px;
      border-radius: 4px;
    }
  }

  blockquote {
    margin: 1.5em 0;
    padding: 0.75em 1em;
    border-left: 4px solid ${theme.colors.text.light};
    background: rgba(255, 255, 255, 0.04);
    font-style: italic;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    margin: ${theme.spacing.lg} 0;
    border-radius: ${theme.radii.md};
  }
`;
