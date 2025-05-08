import { useEffect, useState } from 'react';
import { Movie } from '../../App.tsx';
import noPoster from '/no-poster.png';

export const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const fetchTrendingMovies = async () => {
    try {
      const result = await fetch(
        `${import.meta.env.VITE_TMDB_BASE_URL}/trending/movie/day`
      );
      const data = await result.json();
      setTrendingMovies(data.results.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);
  return (
    <section className="trending">
      <h2>Trending Movies</h2>

      <ul>
        {trendingMovies.map((movie, index) => (
          <li key={movie.id}>
            <p>{index + 1}</p>
            <img
              src={
                movie.poster_path
                  ? `${import.meta.env.VITE_TMDB_BASE_URL}/image/t/p/w500${movie.poster_path}`
                  : noPoster
              }
              alt={movie.title}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
