import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

interface SearchInputProps {
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  return (
    <div className="flex justify-center items-center px-16 py-5 mt-3 text-xl  bg-white rounded-3xl text-black text-opacity-50 w-full">
      <div className="flex gap-0">
        <FontAwesomeIcon
          className="self-center"
          icon={faSearch}
        ></FontAwesomeIcon>
        <div>{placeholder}</div>
      </div>
    </div>
  );
};

const searchComponent: React.FC = () => {
  return (
    <section className="flex flex-col px-8 py-11 font-bold text-center rounded-3xl shadow-sm max-w-[875px] max-md:px-5">
      <h1 className="self-center text-4xl text-white max-md:max-w-full">
        ¡Busquemos un nuevo libro!
      </h1>
      <SearchInput placeholder="Buscar..." />
    </section>
  );
};

export default SearchInput;
