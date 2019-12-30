import React, { useState } from "react";
import useDataApi from "./api/useDataApi";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("redux");
  const [{ data, isLoading, error }, Fetch] = useDataApi(
    "https://hn.algolia.com/api/v1/search?query=redux",
    {
      hits: []
    }
  );

  const Loader = <div>Loading...</div>;

  const Data = (
    <ul>
      {data.hits.map(item => {
        return (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="App">
      <h1>Fetch Hook</h1>
      <form
        onSubmit={event => {
          Fetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
          event.preventDefault();
        }}
      >
        <input
          placeholder="input search here..."
          className="App_input"
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit" className="App_button">
          Search
        </button>
      </form>
      {error.active && <div>{error.message}</div>}
      {isLoading ? Loader : Data}
    </div>
  );
}
