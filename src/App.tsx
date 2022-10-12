import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import "./App.css";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || "",
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_APP_ID || "",
  measurementId: import.meta.env.VITE_MEASUREMENT_ID || "",
};

function App() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [user, setUser] = useState<User | null>(auth.currentUser);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const onClick = async () => {
    if (!user) {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/plus.login");
      signInWithPopup(auth, provider);
    } else {
      await signOut(auth);
    }
  };

  const text = !user ? "Sign in with Google" : "Sign out";

  return (
    <div className="App">
      <h1>Firebase Authentication</h1>
      <div className="card">
        <button onClick={onClick}>{text}</button>
      </div>
      <div className="card">
        {user ? (
          <>
            <div>{user.email}</div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
