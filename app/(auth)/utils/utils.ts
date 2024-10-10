import {
    signInWithEmailAndPassword,
    signOut as _signOut,
    onAuthStateChanged as _onAuthStateChanged,
    NextOrObserver,
    User,
    GoogleAuthProvider,
    signInWithCredential,
} from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { auth } from "@/firebase/firebaseConfig";
import { REACT_APP_BASE_URL } from "@env";

export const BASE_URL = REACT_APP_BASE_URL;

// import {
//     LoginManager,
//     AccessToken,
//     LoginButton,
//     Settings,
//     Profile,
// } from "react-native-fbsdk-next";

// Handle Auth State Changes
export function onAuthStateChanged(callback: NextOrObserver<User>) {
    return _onAuthStateChanged(auth, callback);
}

// def a function to sign in with email and password
export async function signInWithEmailPassword(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error("Error", error);
    }
}

// def a function to sign in with Google
export async function signInWithGoogle() {
    try {
        // start the Google sign-in process
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        // get the user's ID token
        const idToken = userInfo.data?.idToken;

        // create a Firebase credential with the token
        const googleCredential = GoogleAuthProvider.credential(idToken);

        // sign in the user with Firebase using the credential
        const userCredential = await signInWithCredential(
            auth,
            googleCredential
        );

        return userCredential.user;
    } catch (error) {
        console.error("Error during Google Sign-In:", error);
    }
}

// const loginWithFacebook = () => {
//     LoginManager.logInWithPermissions(["public_profile", "email"]).then(
//         function (result) {
//             if (result.isCancelled) {
//                 console.log("==> Login cancelled");
//             } else {
//                 console.log(result);
//                 AccessToken.getCurrentAccessToken().then((data) => {
//                     console.log(data);
//                     getUserFBData();
//                 });
//             }
//         },
//         function (error) {
//             console.log("==> Login fail with error: " + error);
//         }
//     );
// };

// const getUserFBData = () => {
//     Profile.getCurrentProfile().then((currentProfile) => {
//         console.log(currentProfile);
//     });
// };

// sign out function
export async function signOut() {
    try {
        return _signOut(auth);
    } catch (error) {
        console.error("Error signing out", error);
    }
}
