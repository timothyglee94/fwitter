import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router";
import Fweet from "components/Fweet";
const Profile = ({ refreshUser, userObj }) => {
  const [myFweets, setMyFweets] = useState([]);
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const signOut = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyFweets = async () => {
    const fweets = await dbService
      .collection("fweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    setMyFweets(
      fweets.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
    //console.log(fweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyFweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="update Profile" />
      </form>
      <div>
        {myFweets.map((fweet) => (
          <Fweet
            key={fweet.id}
            fweetObj={fweet}
            isOwner={fweet.creatorId === userObj.uid}
          />
        ))}
      </div>
      <button onClick={signOut}>Log Out</button>
    </>
  );
};

export default Profile;
