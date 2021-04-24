import { CircularProgress } from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./components/home/Home";
import LoginController from "./components/login/LoginController";

export default function App(): JSX.Element {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) {
    return (
      <div className="root">
        <CircularProgress color="primary" />
      </div>
    );
  }

  // If accessing login with token query param redirect to different place
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login">
            <LoginController user={user} />
            {/* {user ? <Navigate to="/home" /> : <LoginPage />} */}
          </Route>
          <Route path="/home">
            {user ? <HomePage /> : <Navigate to="/login" />}
          </Route>

          <Route path="/">
            <Navigate to={user ? "/home" : "/login"} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
