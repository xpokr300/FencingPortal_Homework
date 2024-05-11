import { useEffect, useState } from "react";
import { TournamentListContext } from "./TournamentListContext.js";

function TournamentListProvider({ children }) {
  const [tournamentLoadObject, setTournamentLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setTournamentLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3000/tournament/list`, {
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
      setTournamentLoadObject({ state: "ready", data: responseJsonUpadated });
      return responseJsonUpadated;
    } else {
      setTournamentLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJsonUpadated.error,
      }));
      throw new Error(JSON.stringify(responseJsonUpadated, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    console.log(dtoIn)
    setTournamentLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3000/tournament/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setTournamentLoadObject((current) => {
        current.data.unshift(responseJson);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setTournamentLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

//TODO - bude použito v rámci přihlašování uživatele. Edituje se načtený turnaj z kontextu.
//   async function handleUpdate(dtoIn) {
//     setTournamentLoadObject((current) => ({ ...current, state: "pending" }));
//     const response = await fetch(`http://localhost:3000/tournament/update`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(dtoIn),
//     });
//     const responseJson = await response.json();

//     if (response.status < 400) {
//       setTournamentLoadObject((current) => {
//         const tournamentIndex = current.data.findIndex(
//           (e) => e.id === responseJson.id
//         );
//         current.data[tournamentIndex] = responseJson;
//         current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
//         return { state: "ready", data: current.data };
//       });
//       return responseJson;
//     } else {
//       setTournamentLoadObject((current) => ({
//         state: "error",
//         data: current.data,
//         error: responseJson,
//       }));
//       throw new Error(JSON.stringify(responseJson, null, 2));
//     }
//   }




  const value = {
    state: tournamentLoadObject.state,
    tournamentList: tournamentLoadObject.data || [],
    handlerMap: { handleCreate
      // ,handleUpdate
     },
  };

  return (
    <TournamentListContext.Provider value={value}>
      {children}
    </TournamentListContext.Provider>
  );
}

export default TournamentListProvider;
