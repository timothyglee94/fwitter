import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router";

const Profile = () => {
  const history = useHistory();
  const signOut = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={signOut}>Log Out</button>
    </>
  );
};

export default Profile;
