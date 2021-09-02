import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Fweet from "components/Fweet";
import FweetBoard from "components/FweetBoard";

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
    <div>
      <FweetBoard userObj={userObj} />
      <div>
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
