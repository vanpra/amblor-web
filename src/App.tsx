import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/home/Home";
import LoginPage from "./components/login/Login";

export default function App(): JSX.Element {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
