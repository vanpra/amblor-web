import firebase from "firebase";
import { Secrets } from "../constants/Secrets";

firebase.initializeApp(Secrets.firebaseConfig);
firebase.analytics();

export const googleSignIn = async (): Promise<void> => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await firebase.auth().signInWithRedirect(provider);
  } catch (error) {
    console.log({ isOpen: true, message: error.toString() });
  }
};

export const passwordSignIn = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log({ isOpen: true, message: error.toString() });
  }
};
