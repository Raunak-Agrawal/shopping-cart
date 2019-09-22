import React from "react";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import { BrowserRouter, Route } from "react-router-dom";

function Hats() {
  return <h2>Hats</h2>;
}
function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/hats" component={Hats} />
    </BrowserRouter>
  );
}

export default App;
