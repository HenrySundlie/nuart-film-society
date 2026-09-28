import { articles, type Article } from '../data/articles';
import {
  Container,
  Title,
  ArticleGrid,
  ArticleCard,
  ArticleImage,
  ArticleInfo,
  ArticleTitle,
  ArticleDate,
  ArticleAuthor,
} from '../styles/ArticleMenu.styles';
import { useAutoFitText } from '../hooks/useAutoFitText';

const toDate = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return isNaN(d.getTime()) ? undefined : d;
};

const AutoFitTitle = ({ text }: { text: string }) => {
  const isNarrow =
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 420px)').matches
      : false;
  const minPx = isNarrow ? 14 : 12;
  const setRef = useAutoFitText<HTMLHeadingElement>({
    maxLines: 2,
    minFontSizePx: minPx,
    text,
  });
  return <ArticleTitle ref={setRef}>{text}</ArticleTitle>;
};

export default function ArticleMenu() {
  const pageTitleRef = useAutoFitText<HTMLHeadingElement>({
    maxLines: 1,
    minFontSizePx: 18,
  });

  const sortedArticles = articles.slice().sort((a, b) => {
    const dateA = toDate(a.date)?.getTime() ?? 0;
    const dateB = toDate(b.date)?.getTime() ?? 0;
    return dateB - dateA; // Most recent first
  });

  const formatDate = (iso: string) => {
    const d = toDate(iso);
    if (!d) return '';
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderArticleCard = (article: Article) => (
    <ArticleCard to={`/article/${article.id}`} key={article.id}>
      <ArticleImage src={article.img} alt={article.title} loading="lazy" />
      <ArticleInfo>
        <div className="article-title-row">
          <AutoFitTitle text={article.title} />
        </div>
        <div className="details">
          <ArticleDate>{formatDate(article.date)}</ArticleDate>
          <ArticleAuthor>By {article.author}</ArticleAuthor>
        </div>
      </ArticleInfo>
    </ArticleCard>
  );

  return (
    <Container>
      <Title ref={pageTitleRef}>Articles & Reviews</Title>
      <ArticleGrid>
        {sortedArticles.length > 0 ? (
          sortedArticles.map(renderArticleCard)
        ) : (
          <p style={{ opacity: 0.8 }}>No articles available.</p>
        )}
      </ArticleGrid>
    </Container>
  );
}
