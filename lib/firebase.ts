import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  // Your Firebase config will go here
  // For now, using placeholder values
  apiKey: "placeholder-api-key",
  authDomain: "skillscape-mvp.firebaseapp.com",
  projectId: "skillscape-mvp",
  storageBucket: "skillscape-mvp.appspot.com",
  messagingSenderId: "123456789",
  appId: "placeholder-app-id",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
