import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

export const ArticleCard = styled(Link)`
  position: relative;
  display: grid;
  grid-template-columns: clamp(120px, 30%, 210px) 1fr;
  align-items: stretch;
  text-decoration: none;
  border-radius: ${theme.radii.md};
  overflow: clip;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  box-shadow: none;
  transition:
    filter 220ms ease,
    background 220ms ease,
    box-shadow 220ms ease;
  min-height: clamp(150px, 18vw, 180px);

  &:hover {
    background: ${theme.colors.surface};
    box-shadow: ${theme.shadows.card};
    filter: saturate(1.02) contrast(1.01);
  }

  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }

  ${theme.breakpoints.mobile} {
    grid-template-columns: clamp(95px, 34%, 160px) 1fr;
    min-height: 150px;
  }
`;

export const ArticleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(1.03) contrast(1.02);
  transform: translateZ(0);
  transition: transform 450ms cubic-bezier(0.2, 0.7, 0, 1);

  ${ArticleCard}:hover & {
    transform: scale(1.03);
  }

  ${theme.breakpoints.mobile} {
    height: 100%;
  }
`;

export const ArticleInfo = styled.div`
  padding: clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg});
  display: grid;
  grid-template-areas: 'title' 'details';
  grid-template-columns: 1fr;
  align-content: start;
  align-items: start;
  gap: calc(${theme.spacing.sm} * 0.75);
  color: ${theme.colors.text.primary};
  min-width: 0;

  .article-title-row {
    grid-area: title;
    align-self: start;
  }
  .details {
    grid-area: details;
    display: flex;
    flex-direction: column;
    gap: 1px;
    align-items: flex-start;
  }

  ${theme.breakpoints.mobile} {
    gap: calc(${theme.spacing.sm} * 0.6);
    text-align: center;
    justify-items: center;
    align-items: center;
    .details {
      align-items: center;
    }
  }
`;

export const ArticleAuthor = styled.p`
  margin: 0;
  color: ${theme.colors.text.secondary ?? 'rgba(255,255,255,0.78)'};
  font-size: clamp(0.85rem, 0.75rem + 0.6vw, 1rem);
  line-height: 1.35;

  ${theme.breakpoints.mobile} {
    font-size: clamp(0.82rem, 1.6vw, 0.98rem);
  }
`;

export {
  Container,
  Title,
  Grid as ArticleGrid,
  CardTitle as ArticleTitle,
  DateLabel as ArticleDate,
} from './Catalog.styles';
