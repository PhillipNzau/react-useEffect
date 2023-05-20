import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://catfact.ninja/fact");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        console.log(responseData.fact);
        setData(responseData.fact);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [count]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-6 items-center bg-white py-10 px-6 text-slate-500 rounded-md w-1/2 mx-auto mb-4">
        <p className="capitalize">{title != "" ? title : "Title Goes Here"}</p>
        <div>{data}</div>
        <button
          className="px-4 py-2 bg-black w-40 rounded-md text-white transition-all duration-300 hover:bg-slate-700"
          onClick={handleClick}
        >
          Get Fact
        </button>
      </div>

      <div className="flex flex-col gap-6 items-center bg-white py-10 px-6 text-slate-500 rounded-md w-1/2 mx-auto">
        <input
          className="p-2 rounded-md"
          type="text"
          placeholder="change title"
          onChange={handleOnChange}
        />
      </div>
    </>
  );
}

export default App;
