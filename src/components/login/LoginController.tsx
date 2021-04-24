import firebase from "firebase";
import React, { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoginPage from "./Login";

export default function LoginController(props: {
  user: firebase.User | null;
}): JSX.Element {
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [
    location,
  ]);
  const responseState = useMemo(() => {
    return {
      tokenResponse: params.get("response_type") == "token" ? true : false,
      redirectUrl: params.get("redirect_uri"),
    };
  }, [params]);

  if (!props.user) return <LoginPage />;

  if (responseState.tokenResponse) {
    const redirectWithToken =
      (responseState.redirectUrl ?? "") +
      "?refresh_token=" +
      props.user.refreshToken;
    window.location.assign(redirectWithToken);
  }

  return <Navigate to="/home" />;
}
