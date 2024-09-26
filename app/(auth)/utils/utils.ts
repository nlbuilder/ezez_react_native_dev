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
import * as WebBrowser from "expo-web-browser";

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

        console.log(userInfo.data?.idToken);

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

// sign out function
export async function signOut() {
    try {
        return _signOut(auth);
    } catch (error) {
        console.error("Error signing out", error);
    }
}
