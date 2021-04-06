import {
  Button,
  ButtonBase,
  Card,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as GoogleLogo } from "../../assets/google_logo.svg";
import { ReactComponent as AmblorLogo } from "../../assets/logo.svg";
import "../../firebase";
import { googleSignIn, passwordSignIn } from "../../firebase";
import "./Login.css";

interface SnackbarState {
  isOpen: boolean;
  message: string;
}

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const emptySnakbar = useMemo<SnackbarState>(() => {
    return { isOpen: false, message: "" };
  }, []);
  const [snakbarState, setSnakbarState] = useState<SnackbarState>(emptySnakbar);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const resposeState = {
      tokenResponse: params.get("response_type") == "token" ? true : false,
      redirectUrl: params.get("redirect_uri"),
    };

    console.log(resposeState);
    firebase.auth().onAuthStateChanged((user) => {
      if (user && resposeState.tokenResponse) {
        const redirectWithToken =
          (resposeState.redirectUrl ?? "") +
          "?refresh_token=" +
          user.refreshToken;
        window.location.assign(redirectWithToken);
      } else if (user && !resposeState.tokenResponse) {
        navigate("/home");
      }
      setIsLoading(false);
    });

    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        console.log(result.operationType);
        if (
          result.operationType == "signIn" ||
          result.operationType == "reauthenticate"
        ) {
          navigate("/home");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setSnakbarState({ isOpen: true, message: error.toString() });
        setIsLoading(false);
      });
  }, [location.search, navigate]);

  if (isLoading) {
    return (
      <div className="root">
        <CircularProgress color="primary" />
      </div>
    );
  } else {
    return (
      <div className="root">
        <LoginCard
          onGoogleSignIn={googleSignIn}
          onPasswordSignIn={passwordSignIn}
        />
        <Snackbar
          open={snakbarState.isOpen}
          message={snakbarState.message}
          onClose={() => setSnakbarState(emptySnakbar)}
        />
      </div>
    );
  }
}

function LoginCard(props: {
  onGoogleSignIn: () => Promise<void>;
  onPasswordSignIn: (email: string, password: string) => Promise<void>;
}): JSX.Element {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card
      className="login-card"
      style={{
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(5),
        borderRadius: 8,
      }}
    >
      <AmblorLogo className="logo login-items" />
      <TextField
        className="login-items"
        label="Email"
        variant="outlined"
        style={{ marginTop: theme.spacing(3.5) }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className="login-items"
        variant="outlined"
        label="Password"
        type="password"
        autoComplete="current-password"
        style={{ marginTop: theme.spacing(1.5) }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className="login-items"
        style={{ marginTop: theme.spacing(3) }}
        onClick={async () => await props.onPasswordSignIn(email, password)}
      >
        Login
      </Button>

      <Paper
        className="login-items"
        elevation={1}
        style={{
          borderRadius: theme.shape.borderRadius,
          height: 40,
          marginTop: theme.spacing(1.5),
        }}
      >
        <ButtonBase
          focusRipple
          className="google-btn"
          style={{
            height: "100%",
            width: "100%",
            borderRadius: theme.shape.borderRadius,
          }}
          onClick={props.onGoogleSignIn}
        >
          <GoogleLogo
            style={{
              height: 18,
              marginLeft: 8,
            }}
          ></GoogleLogo>
          <Typography style={{ marginLeft: 24, marginRight: 8 }}>
            Sign in with Google
          </Typography>
        </ButtonBase>
      </Paper>
    </Card>
  );
}
