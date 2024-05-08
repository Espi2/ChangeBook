import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder }) => {
  const [query, setQuery] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center px-16 py-5 mt-3 text-xl bg-white rounded-3xl text-black text-opacity-50 w-full h-12">
        <div className="flex gap-0">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            className="self-center font-cbookF font-bold flex-grow outline-none border-none text-center"
            placeholder={placeholder}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
