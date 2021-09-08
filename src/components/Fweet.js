import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "../style.css";
import "../styles/FweetStyle.css";

const Fweet = ({ fweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newFweet, setNewFweet] = useState(fweetObj.text);

  const onDeleteClick = async () => {
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
    <div className="fweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container fweetEdit">
            <input
              type="text"
              placeholder="Edit your fweet"
              value={newFweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{fweetObj.text}</h4>
          {fweetObj.fileUrl && (
            <img src={fweetObj.fileUrl} alt={fweetObj.fileUrl} />
          )}
          {isOwner && (
            <div className="fweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Fweet;

