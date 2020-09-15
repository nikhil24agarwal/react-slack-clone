import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAMha4ZKp01Fy8ZBZfjqMuiGUClmyiGaFA",
    authDomain: "react-slack-clone-cb483.firebaseapp.com",
    databaseURL: "https://react-slack-clone-cb483.firebaseio.com",
    projectId: "react-slack-clone-cb483",
    storageBucket: "react-slack-clone-cb483.appspot.com",
    messagingSenderId: "16053589173",
    appId: "1:16053589173:web:44c83490ec22cbbae45afc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  export const signInWithGoogle = () => {
    // Initialize google provider
    const googleProvider = new firebase.auth.GoogleAuthProvider();
  
    // Ask user to select gmail account in a new popup window
    auth.signInWithPopup(googleProvider);
  };
  
  export const signOut = () => {
    auth.signOut();
  };
  
  export const createOrGetUserProfileDocument = async (user) => {
    if (!user) return;
  
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
  
    if (!snapshot.exists) {
      const { displayName, email, photoURL } = user;
  
      try {
        const user = {
          display_name: displayName,
          email,
          photo_url: photoURL,
          created_at: new Date(),
        };
        await userRef.set(user);
      } catch (error) {
        console.log('Error', error);
      }
    }
  
    return getUserDocument(user.uid);
  };
  
  async function getUserDocument(uid) {
    if (!uid) return null;
  
    try {
      const userDocument = await firestore.collection('user').doc(uid);
      return userDocument;
    } catch (error) {
      console.error('Error in getUserDocument', error.message);
    }
  }