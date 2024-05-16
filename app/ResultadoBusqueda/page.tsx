"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";

function ResultadoBusqueda() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get("query");
    const resultsParam = params.get("results");

    if (queryParam && resultsParam) {
      const resultsArray = JSON.parse(resultsParam);
      setQuery(queryParam);
      setResults(resultsArray);
    } else {
      console.error("No se encontraron parámetros de consulta en la URL");
    }
  }, []);

  return (
    <div>
      <h1>Resultados de la búsqueda: {query}</h1>
      {/* Mostrar los resultados de búsqueda utilizando el componente BookCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((result, index) => (
          <BookCard key={index} book={result} />
        ))}
      </div>
    </div>
  );
}

export default ResultadoBusqueda;
