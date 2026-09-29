import { films, type Film } from '../data/films';
import {
  Container,
  Title,
  FilmGrid,
  FilmCard,
  FilmImage,
  FilmInfo,
  FilmTitle,
} from '../styles/FilmMenu.styles';
import { useAutoFitText } from '../hooks/useAutoFitText';

const latestShowingDate = (film: Film) =>
  film.runDates.reduce((latest, date) => (date > latest ? date : latest), '');

const sortedFilms = [...films].sort((a, b) =>
  latestShowingDate(b).localeCompare(latestShowingDate(a))
);

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
  return (
    <Container>
      <Title ref={pageTitleRef}>Films</Title>
      <FilmGrid>
        {sortedFilms.map((film) => (
          <FilmCard to={`/film/${film.id}`} key={film.id} className="compact">
            <FilmImage src={film.img} alt={film.title} loading="lazy" />
            <FilmInfo style={{ gap: '0' }}>
              <AutoFitTitle text={film.title} />
            </FilmInfo>
          </FilmCard>
        ))}
      </FilmGrid>
      {films.length === 0 && (
        <p style={{ opacity: 0.8 }}>No films available.</p>
      )}
    </Container>
  );
}
