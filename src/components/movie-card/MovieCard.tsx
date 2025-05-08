import { Movie } from '../../App.tsx';
import noPoster from '../../../public/no-poster.png';
import starRating from '../../../public/rating-star.svg';

type Props = {
  movie: Movie;
};

export const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}: Props) => {
  return (
    <div className={'movie-card'}>
      <img
        src={
          poster_path
            ? `https://tmdb-proxy-sigma.vercel.app/api/image/t/p/w500${poster_path}`
            : noPoster
        }
        alt={title}
      />
      <div className={'mt-4'}>
        <h3>{title}</h3>

        <div className={'content'}>
          <div className={'rating'}>
            <img src={starRating} alt={'rating'} />
            <p>{vote_average ? vote_average.toFixed(1) : 'no voices'}</p>
          </div>
          <span>•</span>
          <p className={'lang'}>{original_language}</p>
          <span>•</span>
          <p className={'year'}>{release_date.split('-')[0]}</p>
        </div>
      </div>
    </div>
  );
};
