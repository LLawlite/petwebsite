
import { getAuth, signOut,createUserWithEmailAndPassword ,signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBLJjErt_PaQX3In-JMkCC10C_Lp_vKKkw",
  authDomain: "petwebsite-d470a.firebaseapp.com",
  projectId: "petwebsite-d470a",
  storageBucket: "petwebsite-d470a.appspot.com",
  messagingSenderId: "827134413375",
  appId: "1:827134413375:web:0b21ecaccc5e46cae4068a",
  measurementId: "G-XQ5Q0C5LHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth=getAuth();



export function signUp(email,password)
{
  createUserWithEmailAndPassword(auth, email, password)
  .then((authUser) => {
    // Signed in 
  })
  .catch((error)=>{
    alert(error.message);
  });
}
export function signIn(email,password)
{
  signInWithEmailAndPassword(auth, email, password)
  .then((authUser)=>{
    console.log(authUser);
  })
  .catch((error)=>{
    alert(error.message);
  });
}
export function signout()
{
  signOut(auth).then(() => {
    console.log("signout");
  }).catch((error) => {
    console.log(error.message);
  });
}
export function authState()
{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(user);
      // ...
    } else {
      // User is signed out
      // ...
      console.log("user not signed in");
    }
  });
}


export {auth};
export default db;