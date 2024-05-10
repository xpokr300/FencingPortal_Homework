import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import NotFound from "./NotFound";
import TournamentListProvider from "./TournamentListProvider";
import TournamentList from "./TournamentList";
import TournamentProvider from "./TournamentProvider";
import TournamentDetail from "./TournamentDetail";

function App() {
  return (
    <div style={componentStyle()}>
        <TournamentListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
              <Route index element={<TournamentList />} />
              <Route
                  path="tournamentDetail"                  
                  element={
                    <TournamentProvider>
                        <TournamentDetail />
                    </TournamentProvider>
                    }                 
                /> 
                <Route path="*" element={<NotFound />}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </TournamentListProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#F0FFFF",
  };
}

export default App;
