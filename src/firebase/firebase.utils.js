import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDjYWRtMNkwWXSidhkYIl0wtSyO_iZnD_k",
  authDomain: "shopping-cart-43202.firebaseapp.com",
  databaseURL: "https://shopping-cart-43202.firebaseio.com",
  projectId: "shopping-cart-43202",
  storageBucket: "",
  messagingSenderId: "651593916575",
  appId: "1:651593916575:web:2ae8d862eaf41c99b482aa"
};

firebase.initializeApp(config);

// export const createUserProfileDocument = async (user, additonalData) => {
//   if (!user) return;
//   const userRef = firestore.doc(`users/${user.uid}`);
//   const snapshot = await userRef.get();

//   if (!snapshot.exists) {
//     let { displayName, email } = user;
//     let createdAt = new Date();
//     try {
//       await userRef.set({
//         displayName,
//         email,
//         createdAt,
//         ...additonalData
//       });
//       console.log(snapshot, "user ref has been set");
//     } catch (e) {
//       console.log("error creating user", e);
//     }
//   }
//   return userRef;
// };

export const createUserProfileDocument = async (user, additonalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  let snapshot = await userRef.get();
  if (!snapshot.exists && (user.displayName || additonalData)) {
    console.log("snapshot doesn't exist");
    let { displayName, email } = user;
    let createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additonalData
      });
    } catch (e) {
      console.log("error getting user ref", e);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
