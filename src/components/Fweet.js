import React, { useState } from "react";
import { dbService, storageService } from "fbase";

const Fweet = ({ fweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newFweet, setNewFweet] = useState(fweetObj.text);

  const onDeleteCLick = async () => {
    const ok = window.confirm("Are you sure you want to delete this fweet?");
    if (ok) {
      await dbService.doc(`fweets/${fweetObj.id}`).delete();
      if (fweetObj.fileUrl !== "") {
        await storageService.refFromURL(fweetObj.fileUrl).delete();
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(fweetObj, newFweet);
    await dbService.doc(`fweets/${fweetObj.id}`).update({
      text: newFweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewFweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your fweet"
              value={newFweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update fweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{fweetObj.text}</h4>
          {fweetObj.fileUrl && (
            <img
              src={fweetObj.fileUrl}
              width="50px"
              height="50px"
              alt={fweetObj.fileUrl}
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteCLick}>Delete Fweet</button>
              <button onClick={toggleEditing}>Edit Fweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Fweet;
/*
 */
