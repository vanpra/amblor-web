import { Button, List, Typography } from "@material-ui/core";
import firebase from "firebase";
import React, { useCallback } from "react";
import LazyLoad from "react-lazyload";
import { useNavigate } from "react-router-dom";
import { Scrobble, useScrobbles } from "../../util/amblor";
import "./Home.css";

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
  const scrobbles = useScrobbles();

  const scrobbleListUI = scrobbles
    .reverse()
    .map((scrobble: Scrobble, index: number) => {
      return <ScrobbleItem key={index} scrobble={scrobble} />;
    });

  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={signOut} variant="contained" color="primary">
        Sign Out
      </Button>

      <List>{scrobbleListUI}</List>
    </div>
  );
}

function ScrobbleItem(props: { scrobble: Scrobble }): JSX.Element {
  return (
    <div className="scrobble">
      {/* <LazyLoad> */}
      <img
        alt={props.scrobble.name}
        src={props.scrobble.image}
        height={35}
        width={35}
      />
      {/* </LazyLoad> */}

      <Typography style={{ marginLeft: "0.5vh" }}>
        {props.scrobble.name}
      </Typography>

      <Typography style={{ marginLeft: "3vh" }}>
        {props.scrobble.artist_names}
      </Typography>

      <Typography style={{ marginLeft: "3vh" }}>
        {new Date(props.scrobble.time * 1000).toString()}
      </Typography>
    </div>
  );
}
