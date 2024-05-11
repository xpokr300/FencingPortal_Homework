import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import NotFound from "./NotFound";
import TournamentListProvider from "./TournamentListProvider";
import TournamentList from "./TournamentList";
import TournamentProvider from "./TournamentProvider";
import TournamentDetail from "./TournamentDetail";
import TournamentForm from "./TournamentForm";
import TournamentRegistration from "./TournamentRegistration";
import CategoryListProvider from "./CategoryListProvider";

function App() {
  return (
    <div style={componentStyle()}>
      <TournamentListProvider>
        <CategoryListProvider>
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
                <Route path="tournamentCreation" element={<TournamentForm />} />
                <Route
                  path="tournamentRegistration"
                  element={
                    <TournamentProvider>
                      <TournamentRegistration />
                    </TournamentProvider>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CategoryListProvider>
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
