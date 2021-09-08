import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Fweet from "components/Fweet";
import FweetBoard from "components/FweetBoard";
import "../style.css";

const Home = ({ userObj }) => {
  const [fweets, setFweets] = useState([]);

  useEffect(() => {
    dbService.collection("fweets").onSnapshot((snapshot) => {
      const fweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFweets(fweetArray);
    });
  }, []);

  return (
    <div className="container">
      <FweetBoard userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {fweets.map((fweet) => (
          <Fweet
            key={fweet.id}
            fweetObj={fweet}
            isOwner={fweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
