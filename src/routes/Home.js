import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = ({ userObj }) => {
  const [fweet, setFweet] = useState("");
  const [fweets, setFweets] = useState([]);
  /*
  const getFweets = async () => {
    const dbFweets = await dbService.collection("fweets").get();
    dbFweets.forEach((document) => {
      const fweetObject = {
        ...document.data(),
        id: document.id,
      };
      setFweets((prev) => [fweetObject, ...prev]);
    });
  };*/
  useEffect(() => {
    //getFweets();
    dbService.collection("fweets").onSnapshot((snapshot) => {
      const fweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFweets(fweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("fweets").add({
      text: fweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setFweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setFweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={fweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="fweet" />
      </form>
      <div>
        {fweets.map((fweet) => (
          <div key={fweet.id}>
            <h4>{fweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
