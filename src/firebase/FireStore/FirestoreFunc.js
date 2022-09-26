import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	startAfter,
	where,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	updateDoc,
} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {Alert} from "react-native";
import {auth, db, storage} from "../firebase";

export const addUserToFB = async (info, id) => {
	await setDoc(doc(db, "Users", id), info);
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

export const getAllPosts = (setAllPosts) => {
	const cRef = collection(db, "Allposts");
	const q = query(cRef, orderBy("postedAt", "desc"));
	onSnapshot(q, (querySnapshot) => {
		let posts = [];
		querySnapshot.forEach((doc) => {
			let data = {value: doc.data(), id: doc.id};
			posts.push(data);
		});
		setAllPosts(posts);
	});
};
export const getSinglePost = (setSinglePost, id) => {
	onSnapshot(doc(db, "Allposts", id), (doc) => {
		setSinglePost(doc.data());
	});
};

export const commentPost = async (userComment, id) => {
	await setDoc(
		doc(db, "Allposts", id),
		{comments: userComment},
		{merge: true}
	);
};
export const likePost = async (liked, id) => {
	await updateDoc(doc(db, "Allposts", id), {star: liked}, {merge: true});
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
