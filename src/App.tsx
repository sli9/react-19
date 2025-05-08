import { Search } from './components/search-input/Search.tsx';
import { useEffect, useState } from 'react';
import { MovieCard } from './components/movie-card/MovieCard.tsx';

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

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://tmdb-proxy-sigma.vercel.app/api/discover/movie?sort_by=popularity.desc`
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
    fetchMovies();
  }, []);

  return (
    <main>
      <div className={'pattern'} />
      <div className={'wrapper'}>
        <header>
          <img src={'./hero-img.png'} alt={'Hero Banner'} />
          <h1>
            <span className={'text-gradient'}>Movie</span> App
          </h1>
          <Search />
        </header>

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
