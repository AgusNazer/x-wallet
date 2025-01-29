import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";

/* Creating a context object. */
// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext();

/**
 * UseAuth() is a function that returns the context object that was created by the useContext() hook.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(authContext);
  // console.log(context);
  if (!context) {
    console.log("error creating auth context");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  /* A hook that is called when the component is mounted and when the component is updated. */
  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("no hay usuario suscrito");
        setUser("");
      } else {
        setUser(currentUser);
      }
    });
    return () => subscribed();
  }, []);
  /**
   * "register" is a function that takes two arguments, "email" and "password", and then calls the
   * "createUserWithEmailAndPassword" function with the "auth" object and the "email" and "password"
   * arguments.
   */
  const register = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(response);
  };
  /**
   * "login" is a function that takes two parameters, "email" and "password", and returns a promise that
   * resolves to the result of calling "signInWithEmailAndPassword" with the parameters "auth", "email",
   * and "password".
   */
  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
  };
  /**
   * The loginWithGoogle function is an async function that returns the result of the signInWithPopup
   * function, which takes the auth and responseGoogle parameters.
   *The responseGoogle object is being returned.
   */
  // const loginWithGoogle = async () => {
  //   const responseGoogle = new GoogleAuthProvider();
  //   return await signInWithPopup(auth, responseGoogle);
  // };

  const loginWithGoogle = async () => {
    try {
      // Configurar persistencia de sesión
      await setPersistence(auth, browserSessionPersistence);
      console.log("Persistencia de sesión configurada correctamente.");

      // Iniciar sesión con Google
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Error al registrar con Google:", error);
    }
  };
  //

  /**
   * The logout function is an asynchronous function that calls the signOut function and logs the
   * response to the console.
   */
  const logout = async () => {
    const response = await signOut(auth);
    console.log(response);
  };
  return (
    <authContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        logout,
        user,
      }}
    >
      {children}
    </authContext.Provider>
  );
}