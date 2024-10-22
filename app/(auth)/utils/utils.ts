import {
    signInWithEmailAndPassword,
    signOut as _signOut,
    onAuthStateChanged as _onAuthStateChanged,
    NextOrObserver,
    User,
    GoogleAuthProvider,
    signInWithCredential,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
    getAuth,
    sendPasswordResetEmail,
} from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { auth } from "@/firebase/firebaseConfig";

// Handle Auth State Changes
export function onAuthStateChanged(callback: NextOrObserver<User>) {
    return _onAuthStateChanged(auth, callback);
}

// def a function to sign up with email and password
export const signUpWithEmailPassword = async (
    email: string,
    password: string,
    name: string
) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);

        // update the user's display name
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                displayName: name,
            }).catch((error) => console.log(error));
        } else {
            console.error("Error updating user profile: ", auth.currentUser);
        }

        // send email verification
        if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser).then(() => {
                console.log("Email verification sent");
            });
        } else {
            console.error("No user is currently signed in.");
        }

        return auth.currentUser;
    } catch (error) {
        console.error(
            "Error when executing createUserWithEmailAndPassword(): ",
            error
        );
    }
};

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
        console.error(
            "Error when executing signInWithEmailPassword(): ",
            error
        );
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
        console.error("Error when executing signInWithGoogle: ", error);
    }
}

// def a function to reset the password
export async function resetPassword(email: string) {
    try {
        // send password reset email
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error("Error updating password: ", error);
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
