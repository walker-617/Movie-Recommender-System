import React, { useState } from "react";

import Explore from "./pages/home-page/explore";
import Opening from "./pages/opening-page/opening-page";

function App() {
  const [page, setPage] = useState("opening");
  if (page === "explore") {
    return <Explore setPage={setPage} />;
  }
  return <Opening setPage={setPage} />;
}

export default App;
