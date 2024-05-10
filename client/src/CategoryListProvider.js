import { useEffect, useState } from "react";
import { CategoryListContext } from "./CategoryListContext.js";

function CategoryListProvider({ children }) {
  const [categoryLoadObject, setCategoryLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setCategoryLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3000/category/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    const responseJsonUpadated = responseJson.map((item, index)=>{
      let json = {};      
      json = {...item,
        index: index+1}
      return json;
    })
    console.log(responseJsonUpadated);
    if (response.status < 400) {
      setCategoryLoadObject({ state: "ready", data: responseJsonUpadated });
      return responseJsonUpadated;
    } else {
      setCategoryLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJsonUpadated.error,
      }));
      throw new Error(JSON.stringify(responseJsonUpadated, null, 2));
    }
  }


  const value = {
    state: categoryLoadObject.state,
    categoryList: categoryLoadObject.data || [],
  };
  console.log(value);

  return (
    <CategoryListContext.Provider value={value}>
      {children}
    </CategoryListContext.Provider>
  );
}

export default CategoryListProvider;
