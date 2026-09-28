import { useParams } from 'react-router-dom';
import { articles } from '../data/articles';
import Markdown from '../components/Markdown';
import { useMarkdown } from '../hooks/useMarkdown';
import {
  ArticleContent,
  Title,
  MetaSection,
  MetaItem,
  Label,
  Description,
  BackLink,
} from '../styles/ArticlePage.styles';
import { ContentSection, ContentText } from '../styles/HomePage.styles';

const fmtDate = (iso?: string) => {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === Number(id));
  const articleMd = useMarkdown(
    'articles',
    article && (article.article || `article-${article.id}`)
  );

  if (!article)
    return (
      <ContentSection>
        <ContentText>Article not found</ContentText>
      </ContentSection>
    );

  return (
    <ContentSection>
      <ContentText>
        <BackLink to="/articles" aria-label="Back to Articles & Reviews list" />
        <Title>{article.title}</Title>
        <MetaSection>
          <MetaItem>
            <Label>Published:</Label> {fmtDate(article.date)}
          </MetaItem>
          <MetaItem>
            <Label>Author:</Label> {article.author}
          </MetaItem>
        </MetaSection>

        <Description>{article.description}</Description>
        {articleMd && (
          <ArticleContent>
            <Markdown>{articleMd}</Markdown>
          </ArticleContent>
        )}
      </ContentText>
    </ContentSection>
  );
}
