import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import News from "./Components/News";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<News pageSize={5} countries="us" category="general" />}
        />
        <Route
          path="/world"
          element={<News key="world" pageSize={5} countries="us" category="general" />}
        />
        <Route
          path="/entertainment"
          element={<News key="entertainment" pageSize={5} countries="us" category="entertainment" />}
        />
        <Route
          path="/health"
          element={<News key="health" pageSize={5} countries="us" category="health" />}
        />
        <Route
          path="/technology"
          element={<News key="technology" pageSize={5} countries="us" category="technology" />}
        />
        <Route
          path="/sports"
          element={<News key="sports" pageSize={5} countries="us" category="sports" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
