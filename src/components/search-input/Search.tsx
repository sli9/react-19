import { useState } from 'react';
import searchIcon from '../../../public/search.svg';

export const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="search">
      <div>
        <img src={searchIcon} alt="Search Icon" />
        <input
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};
