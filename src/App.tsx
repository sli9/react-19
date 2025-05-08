import { Search } from './components/search-input/Search.tsx';
import { useEffect, useState } from 'react';
import { MovieCard } from './components/movie-card/MovieCard.tsx';
import { useDebounce } from 'react-use';
import { TrendingMovies } from './components/trending-movies/TrendingMovies.tsx';

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

function App() {
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useDebounce(() => setDebouncedValue(searchQuery), 500, [searchQuery]);

  const fetchMovies = async (query: string) => {
    try {
      const response = await fetch(
        searchQuery
          ? `${import.meta.env.VITE_TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
          : `${import.meta.env.VITE_TMDB_BASE_URL}/discover/movie?sort_by=popularity.desc`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch movies ' + response.status);
      }

      const data: MoviesResponse = await response.json();

      setMovies(data.results || []);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    fetchMovies(debouncedValue);
  }, [debouncedValue]);

  return (
    <main>
      <div className={'pattern'} />
      <div className={'wrapper'}>
        <header>
          <img src={'./hero-img.png'} alt={'Hero Banner'} />
          <h1>
            <span className={'text-gradient'}>Movie</span> App
          </h1>
          <Search callback={setSearchQuery} inputValue={searchQuery} />
        </header>

        <TrendingMovies />

        <section className={'all-movies'}>
          <h2 className={'mt-10 mb-9'}>Popular</h2>
          {errorMessage && (
            <p className="text-center text-red-500">{errorMessage}</p>
          )}
          <ul>
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default App;
