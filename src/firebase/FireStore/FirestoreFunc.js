import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";

export const addUserToFB = async (info, id) => {
  await setDoc(doc(db, "Users", id), info);
};

export const deleteFromFb = async (id, collectionname) => {
  await deleteDoc(doc(db, collectionname, id));
};

export const getCurrentUser = async () => {
  const userRef = doc(db, "Users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);
  let user;
  if (userSnap.exists()) {
    user = userSnap.data();
  } else {
    user = null;
  }
  user && (user.uid = auth.currentUser.uid);
  return user;
};

export const addPostToFb = async (postData) => {
  await addDoc(collection(db, "Allposts"), postData);
};
export const addGroupToFb = async (groupData) => {
  await addDoc(collection(db, "Groups"), groupData);
};

export const getAllPosts = (setAllPosts) => {
  const cRef = collection(db, "Allposts");
  const q = query(cRef, orderBy("postedAt", "desc"));
  onSnapshot(q, (querySnapshot) => {
    let posts = [];
    querySnapshot.forEach((doc) => {
      let data = { value: doc.data(), id: doc.id };
      posts?.push(data);
    });
    setAllPosts(posts);
  });
};

export const getMyGroups = (setMyGroups) => {
  const cRef = collection(db, "Groups");
  const q = query(cRef, where("uid", "==", auth.currentUser.uid));
  onSnapshot(q, (querySnapshot) => {
    let groups = [];
    querySnapshot.forEach((doc) => {
      let data = { value: doc.data(), id: doc.id };
      groups.push(data);
    });
    setMyGroups(groups);
  });
};

export const getAllGroups = async (setAllGroups) => {
  const querySnapshot = await getDocs(collection(db, "Groups"));
  let groups = [];
  querySnapshot.forEach((doc) => {
    let data = { value: doc.data(), id: doc.id };
    groups.push(data);
  });
  setAllGroups(groups);
};

export const getSinglePost = (setSinglePost, id) => {
  onSnapshot(doc(db, "Allposts", id), (doc) => {
    setSinglePost(doc.data());
  });
};
export const getSingleGroup = (id, setGroupPosts, posts) => {
  if (posts == true) {
    onSnapshot(doc(db, "Groups", id), (doc) => {
      setGroupPosts(doc.data().groupPosts);
    });
  } else {
    onSnapshot(doc(db, "Groups", id), (doc) => {
      setGroupPosts(doc.data());
    });
  }
};

export const addPostToGroup = async (postdata, id) => {
  await setDoc(
    doc(db, "Groups", id),
    { groupPosts: postdata },
    { merge: true }
  );
};
export const addProfilePic = async (url) => {
  await setDoc(
    doc(db, "Users", auth.currentUser.uid),
    { imgUrl: url },
    { merge: true }
  );
};

export const addUserToGroup = async (data, id) => {
  await setDoc(doc(db, "Groups", id), { participents: data }, { merge: true });
};

export const commentPost = async (userComment, id) => {
  await setDoc(
    doc(db, "Allposts", id),
    { comments: userComment },
    { merge: true }
  );
};
export const likePost = async (liked, id, collectionname) => {
  if (collectionname == "Allposts") {
    await updateDoc(doc(db, "Allposts", id), { star: liked }, { merge: true });
  } else {
    await updateDoc(doc(db, "Groups", id), { star: liked }, { merge: true });
  }
};

// export const uploadImage = async (image) => {
// 	const imgFile = await (await fetch(image)).blob();
// 	console.log(image, imgFile);
// 	// const storage = getStorage();
// 	const imagesRef = ref(storage, imgFile._data.name);
// 	const uploadTask = uploadBytesResumable(imagesRef, imgFile);

// 	return new Promise(async (resolve, reject) => {
// 		uploadTask.on(
// 			"state_changed",

// 			(snapshot) => {},
// 			(error) => {
// 				reject(error);
// 			},
// 			() => {
// 				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
// 					resolve(downloadURL);
// 				});
// 			}
// 		);
// 	});
// };
