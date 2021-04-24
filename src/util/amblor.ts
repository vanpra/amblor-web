import axios from "axios";
import firebase from "firebase";
import { useCallback, useEffect, useState } from "react";

export interface Scrobble {
  time: number;
  name: string;
  preview_url: string;
  album_name: string;
  image: string;
  artist_names: string;
  artist_images: string;
  artist_genres: string;
}

export function useScrobbles(): Scrobble[] {
  const [scrobbles, setScrobbles] = useState<Scrobble[]>([]);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const getScrobbles = useCallback(async () => {
    if (user) {
      const res = await axios({
        method: "get",
        url: "https://amblor.herokuapp.com/api/v1/scrobble",
        headers: {
          Authorization: `Bearer ${await user.getIdToken()}`,
          "Content-Type": "application/json",
        },
      });

      console.log(res.data);
      setScrobbles(res.data);
    }
  }, [user]);

  useEffect(() => {
    getScrobbles();
  }, [getScrobbles]);

  return scrobbles;
}
