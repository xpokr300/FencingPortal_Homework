import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { CategoryContext } from "./CategoryContext.js";

function CategoryProvider({ children }) {
  const [categoryLoadObject, setCategoryLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const location = useLocation();
  console.log(location);

  const [searchParams] = useSearchParams();

  console.log(searchParams.get("id"));

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setCategoryLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:3000/category/get?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();
    if (response.status < 400) {
      setCategoryLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setCategoryLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setCategoryLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3000/category/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setCategoryLoadObject((current) => {current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setCategoryLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    category: categoryLoadObject.data,
    handlerMap: {handleLoad, handleCreate}
  };



  return (
    <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
  );
}

export default CategoryProvider;
