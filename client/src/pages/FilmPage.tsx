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
import AddToGoogleCalendar from '../components/AddToGoogleCalendar';

const fmtDate = (iso?: string) => {
  if (!iso) return '';
  const s = typeof iso === 'string' ? iso : String(iso);
  const d = s.includes('T') ? new Date(s) : new Date(`${s}T00:00:00`);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

function nextUpcomingDate(dates?: string[]): string | undefined {
  if (!dates || dates.length === 0) return undefined;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const sorted = dates
    .filter(Boolean)
    .map((d) => new Date(d).getTime())
    .sort((a, b) => a - b);
  const next =
    sorted.find((t) => t >= now.getTime()) ?? sorted[sorted.length - 1];
  return next ? new Date(next).toISOString().slice(0, 10) : undefined;
}

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
          <InfoItem>
            <Label>Showings:</Label>{' '}
            {film.runDates && film.runDates.length > 1
              ? film.runDates
                  .slice()
                  .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                  .map(fmtDate)
                  .join(' · ')
              : fmtDate(film.runDates?.[0])}
          </InfoItem>
          {film.runTime && (
            <InfoItem>
              <Label>Time:</Label> {film.runTime}
            </InfoItem>
          )}
          <LinkButton
            to={film.ticketLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Buy Tickets
          </LinkButton>
          <AddToGoogleCalendar
            title={film.title}
            startDate={nextUpcomingDate(film.runDates) ?? film.runDates?.[0]}
            startTime={film.runTime}
            durationMinutes={film.duration}
            location="Moscow, ID"
            details={film.description}
          />
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
