import { useMemo } from 'react';
import { films, type Film } from '../data/films';
import {
  Container,
  Title,
  FilmGrid,
  FilmCard,
  FilmImage,
  FilmInfo,
  FilmTitle,
  FilmNote,
  SectionHeading,
} from '../styles/FilmMenu.styles';
import { Button } from '../styles/Button.styles';
import { useAutoFitText } from '../hooks/useAutoFitText';

// =============================================================================
// Types & Helpers
// =============================================================================

const toDate = (iso: string) => {
  // Accept either date-only or full ISO strings
  const s = iso.includes('T') ? iso : `${iso}T00:00:00`;
  const d = new Date(s);
  return isNaN(d.getTime()) ? undefined : d;
};

const normalizeDates = (dates?: string[]) =>
  (dates || [])
    .map((d) => toDate(d))
    .filter((d): d is Date => !!d)
    .map((d) => d.getTime())
    .sort((a, b) => a - b);

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
  return <FilmTitle ref={setRef}>{text}</FilmTitle>;
};

export default function FilmMenu() {
  const pageTitleRef = useAutoFitText<HTMLHeadingElement>({
    maxLines: 1,
    minFontSizePx: 18,
  });
  const { upcomingFilms, previousFilms } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const groups = films.reduce(
      (acc, film) => {
        const times = normalizeDates(film.runDates);
        const hasUpcoming = times.some((t) => t >= today.getTime());
        if (hasUpcoming) acc.upcoming.push({ film, times });
        else acc.previous.push({ film, times });
        return acc;
      },
      {
        upcoming: [] as Array<{ film: Film; times: number[] }>,
        previous: [] as Array<{ film: Film; times: number[] }>,
      }
    );

    const nextUpcoming = (ds: number[], now = today.getTime()) =>
      ds.find((t) => t >= now) ?? Number.POSITIVE_INFINITY;
    const lastPast = (ds: number[]) =>
      ds[ds.length - 1] ?? Number.NEGATIVE_INFINITY;

    groups.upcoming.sort(
      (a, b) => nextUpcoming(a.times) - nextUpcoming(b.times)
    );
    groups.previous.sort((a, b) => lastPast(b.times) - lastPast(a.times));

    return {
      upcomingFilms: groups.upcoming.map((x) => x.film),
      previousFilms: groups.previous.map((x) => x.film),
    };
  }, []);

  const handleTicketClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderUpcomingFilmCard = (film: Film) => {
    const ticketUrl = film.ticketLink?.trim();
    return (
      <FilmCard to={`/film/${film.id}`} key={film.id}>
        <FilmImage src={film.img} alt={film.title} loading="lazy" />
        <FilmInfo>
          <div className="film-title-row">
            <AutoFitTitle text={film.title} />
          </div>
          {/* Short descriptive paragraph only for Babette's Feast (case-insensitive match) */}
          {film.title && film.title.toLowerCase().includes('babette') && (
            <div className="details">
              <FilmNote>
                Blinis Demidoff & Babette’s Feast: Only 50 seats available
                (balcony seating)! An unforgettable evening of
                flavor, film, and French elegance. General admission tickets
                available per usual.
              </FilmNote>
            </div>
          )}
          {ticketUrl && (
            <Button
              className="ticket-btn"
              onClick={(e) => handleTicketClick(e, ticketUrl)}
            >
              Buy Tickets
            </Button>
          )}
        </FilmInfo>
      </FilmCard>
    );
  };

  // Previous films: only show title (no dates, runtime, tickets)
  const renderPreviousFilmCard = (film: Film) => (
    <FilmCard to={`/film/${film.id}`} key={film.id} className="compact">
      <FilmImage src={film.img} alt={film.title} loading="lazy" />
      <FilmInfo style={{ gap: '0' }}>
        <AutoFitTitle text={film.title} />
      </FilmInfo>
    </FilmCard>
  );

  const hasUpcoming = upcomingFilms.length > 0;
  const hasPrevious = previousFilms.length > 0;

  return (
    <Container>
      <Title ref={pageTitleRef}>Films</Title>
      {hasUpcoming && (
        <section
          aria-labelledby="upcoming-heading"
          style={{ marginBottom: hasPrevious ? '3rem' : 0 }}
        >
          <SectionHeading id="upcoming-heading">Upcoming</SectionHeading>
          <FilmGrid>{upcomingFilms.map(renderUpcomingFilmCard)}</FilmGrid>
        </section>
      )}
      {hasPrevious && (
        <section
          aria-labelledby="previous-heading"
          style={{ marginTop: '3.5rem' }}
        >
          <SectionHeading id="previous-heading">Previous</SectionHeading>
          <FilmGrid>{previousFilms.map(renderPreviousFilmCard)}</FilmGrid>
        </section>
      )}
      {!hasUpcoming && !hasPrevious && (
        <p style={{ opacity: 0.8 }}>No films available.</p>
      )}
    </Container>
  );
}
