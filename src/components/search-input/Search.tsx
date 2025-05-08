import searchIcon from '/search.svg';

type Props = {
  callback: (value: string) => void;
  inputValue: string;
};

export const Search = ({ callback, inputValue }: Props) => {
  return (
    <div className="search">
      <div>
        <img src={searchIcon} alt="Search Icon" />
        <input
          placeholder="Search"
          value={inputValue}
          onChange={(e) => callback(e.target.value)}
        />
      </div>
    </div>
  );
};
