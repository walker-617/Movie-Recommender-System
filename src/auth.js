import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
  EmailAuthProvider,
  linkWithCredential,
  deleteUser,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  arrayUnion,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { config } from "./pages/config";

const firebaseConfig = config;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const getUsernames = async () => {
  try {
    const res = await getDoc(doc(db, "usernames-emails", "usernames"));
    return res.data();
  } catch (error) {
    console.error("Error fetching data");
    throw error;
  }
};

const getEmails = async (email) => {
  try {
    const res = await getDoc(doc(db, "usernames-emails", "emails"));
    return res.data();
  } catch (error) {
    console.error("Error fetching data");
    throw error;
  }
};

const registerWithUsernameAndPassword = async (username, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password).then((cred) => {
    sendEmailVerification(cred.user);
    setDoc(doc(db, "users", email), {
      username: username,
      moviesList: [],
    });
    setDoc(
      doc(db, "usernames-emails", "usernames"),
      {
        usernames: arrayUnion(username),
      },
      { merge: true }
    );
    setDoc(
      doc(db, "usernames-emails", "emails"),
      {
        emails: arrayUnion(email),
      },
      { merge: true }
    );
    updateProfile(auth.currentUser, {
      displayName: username,
    });
    return cred.user;
  });
};

const DeleteUser = async () => {
  const user = auth.currentUser;
  const email = user.email;
  const username = user.displayName;
  fetch(
    `https://admin-sdk-for-recommender.onrender.com/deleteUser/${user.uid}`,
    { method: "delete" }
  );
  setDoc(
    doc(db, "usernames-emails", "usernames"),
    {
      usernames: arrayRemove(username),
    },
    { merge: true }
  );
  setDoc(
    doc(db, "usernames-emails", "emails"),
    {
      emails: arrayRemove(email),
    },
    { merge: true }
  );
  deleteDoc(doc(db, "users", email));
};

const signInWithEmailPassword = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      return cred.user;
    })
    .catch((error) => {
      return error.code;
    });
  return res;
};

const addMovieInList = async (email, id, title, poster) => {
  const res = await setDoc(
    doc(db, "users", email),
    {
      moviesList: arrayUnion({ id: id, title: title, poster: poster }),
    },
    { merge: true }
  );
};

const deleteMovieInList = async (username, id, title, poster) => {
  const res = await setDoc(
    doc(db, "users", username),
    {
      moviesList: arrayRemove({ id: id, title: title, poster: poster }),
    },
    { merge: true }
  );
};

const getMoviesInList = async (email) => {
  const res = await getDoc(doc(db, "users", email));
  return res.data()?.moviesList;
};

const signOutUser = async () => {
  await signOut(auth)
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      console.log("signout error");
    });
};

export {
  auth,
  registerWithUsernameAndPassword,
  signOutUser,
  sendEmailVerification,
  signInWithEmailPassword,
  getUsernames,
  getEmails,
  DeleteUser,
  sendPasswordResetEmail,
  addMovieInList,
  deleteMovieInList,
  getMoviesInList,
};
