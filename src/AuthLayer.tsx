import React from "react";
import App from "containers/App";
import firebase from "./firebase/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/authStateSlice";
import { requestNotes } from "api";

interface IAuthLayerProps {}

const AuthLayer: React.FC<IAuthLayerProps> = props => {
  const dispatch = useDispatch();
  firebase.auth().onAuthStateChanged(user => {
    dispatch(setUser(user));
  });
  return (
    <>
      <App />
    </>
  );
};

export default AuthLayer;
