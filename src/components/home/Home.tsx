import { Button } from "@material-ui/core";
import firebase from "firebase";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage(): JSX.Element {
  const naviate = useNavigate();
  const signOut = useCallback(async (): Promise<void> => {
    try {
      await firebase.auth().signOut();
      naviate("/login");
    } catch (error) {
      console.log(error);
    }
  }, [naviate]);

  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={signOut} variant="contained" color="primary">
        Sign Out
      </Button>
    </div>
  );
}
