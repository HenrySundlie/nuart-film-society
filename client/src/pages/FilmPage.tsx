import { useParams } from 'react-router-dom';
import { films } from '../data/films';
import Markdown from '../components/Markdown';
import { useMarkdown } from '../hooks/useMarkdown';
import {
  Container,
  Content,
  Title,
  InfoSection,
  InfoItem,
  Label,
  Description,
  FilmArticle,
  BackLink,
} from '../styles/FilmPage.styles';
import { LinkButton } from '../components/LinkButton';

export default function FilmPage() {
  const { id } = useParams<{ id: string }>();
  const film = films.find((f) => f.id === Number(id));
  const articleMd = useMarkdown(
    'films',
    film && (film.article || `film-${film.id}`)
  );

  if (!film) return <Container>Film not found</Container>;

  return (
    <Container>
      <Content>
        <BackLink to="/films" aria-label="Back to film list" />
        <Title>{film.title}</Title>
        <InfoSection>
          <InfoItem>
            <Label>Year:</Label> {film.year}
          </InfoItem>
          <InfoItem>
            <Label>Director:</Label> {film.director}
          </InfoItem>
          <InfoItem>
            <Label>Notable Actors:</Label> {film.actors?.join(', ')}
          </InfoItem>
          <InfoItem>
            <Label>Duration:</Label> {film.duration} minutes
          </InfoItem>
          <LinkButton
            to={film.ticketLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Buy Tickets
          </LinkButton>
        </InfoSection>

        <Description>{film.description}</Description>
        {articleMd && (
          <FilmArticle>
            <Markdown>{articleMd}</Markdown>
          </FilmArticle>
        )}
      </Content>
    </Container>
  );
}
