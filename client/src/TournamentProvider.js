import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { TournamentContext } from "./TournamentContext.js";

function TournamentProvider({ children }) {
  const [tournamentLoadObject, setTournamentLoadObject] = useState({
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
    setTournamentLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:3000/tournament/get?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();
    if (response.status < 400) {
      setTournamentLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setTournamentLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  // async function handleCreate(dtoIn) {
  //   setTournamentLoadObject((current) => ({ ...current, state: "pending" }));
  //   const response = await fetch(`http://localhost:3000/tournament/create`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(dtoIn),
  //   });
  //   const responseJson = await response.json();

  //   if (response.status < 400) {
  //     setTournamentLoadObject((current) => {current.data.push(responseJson);
  //       current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
  //       return { state: "ready", data: current.data };
  //     });
  //     return responseJson;
  //   } else {
  //     setTournamentLoadObject((current) => {
  //       return { state: "error", data: current.data, error: responseJson };
  //     });
  //     throw new Error(JSON.stringify(responseJson, null, 2));
  //   }
  // }

  const value = {
    tournament: tournamentLoadObject.data,
    handlerMap: {handleLoad}
  };



  return (
    <TournamentContext.Provider value={value}>{children}</TournamentContext.Provider>
  );
}

export default TournamentProvider;
