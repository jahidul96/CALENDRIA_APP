import React, { useContext, useState } from "react";
import { likePost } from "../firebase/FireStore/FirestoreFunc";
import Context from "../../context/Context";
import { SinglePost } from "./TimelinePostSubComp";

const TimelinePost = ({ postData }) => {
  const { value } = postData;
  const { loggedUser } = useContext(Context);

  const _LikeOnPost = (data, isLiked) => {
    let collectionname = "Allposts";
    if (isLiked.length == 0) {
      let val = [
        ...data.value.star,
        {
          likedBy: loggedUser.email,
        },
      ];
      likePost(val, data.id, collectionname);
    } else {
      let val = data.value.star.filter((st) => st.likedBy != loggedUser.email);
      likePost(val, data.id, collectionname);
    }
  };
  return (
    <SinglePost
      postData={postData}
      value={value}
      loggedUser={loggedUser}
      _LikeOnPost={_LikeOnPost}
    />
  );
};

export default TimelinePost;
