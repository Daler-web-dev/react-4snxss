import { useEffect, useMemo, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import './App.scss';
import GenreComponent from './components/GenreComponent';
import RatingComponent from './components/RatingComponent';
import { SelectMemoized } from './hoc/Select';

const data = [
  {
    id: 1,
    title: 'The Matrix',
    rating: 7.5,
    genre: 'Action',
  },
  {
    id: 2,
    title: 'Focus',
    rating: 6.9,
    genre: 'Comedy',
  },
  {
    id: 3,
    title: 'The Lazarus Effect',
    rating: 6.4,
    genre: 'Thriller',
  },
  {
    id: 4,
    title: 'Everly',
    rating: 5.0,
    genre: 'Action',
  },
  {
    id: 5,
    title: 'Maps to the Stars',
    rating: 7.5,
    genre: 'Drama',
  },
];
const ratingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function App() {
  const [listArr, setListArr] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [ratings, setRating] = useState([]);
  const [query, setQuery] = useState('');

  const onlyTitleArr = useMemo(
    () => [...new Set(data.map((el) => el.genre))],
    data
  );

  const searchMovies = (e) => {
    if (genres.length == 0 && ratings.length == 0) {
      let filtered = data.filter((el) =>
        el.title.match(new RegExp(query, `ig`))
      );
      setListArr(filtered);
      return;
    }

    let filtered = data.filter(
      (el) =>
        ratings.includes(Math.floor(el.rating)) ||
        (ratings.includes('all') && genres.includes(el.genre)) ||
        (genres.includes('all') && el.title.match(new RegExp(query, `ig`)))
    );

    setListArr(filtered);
  };

  useEffect(() => {
    searchMovies();
  }, [ratings, genres, query]);

  return (
    <div className="row">
      <div className="search-field">
        <input
          className="search-input"
          placeholder="Enter movie name"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        />

        {isOpen ? (
          <div className="list">
            {listArr.map((item) => (
              <div className="list-item" key={item.id}>
                <div className="left">
                  <span>{item.title}</span>
                  <Rating
                    initialValue={item.rating}
                    allowFraction={true}
                    iconsCount={10}
                    size={20}
                    readonly={true}
                  />
                </div>
                <span>{item.genre}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <SelectMemoized
        setFilterData={setGenres}
        title="genre"
        arr={onlyTitleArr}
        ChilComponent={GenreComponent}
      />
      <SelectMemoized
        setFilterData={setRating}
        title="rating"
        arr={ratingArr}
        ChilComponent={RatingComponent}
      />
    </div>
  );
}

export default App;
