import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getFirestore,
  addDoc,
  collection,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useNavigate } from 'react-router-dom'

const Form = () => {
  
  const navigate = useNavigate();
  
  const auth = useAuth();
  // const db = getFirestore(app);
  const { displayName } = auth.user;
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordlLogin] = useState("");
  const [username, setUsername] = useState("");
  //revisar para que aparezca el nombre usuaruio al logearme con correo
  const [isLogged, setIsLogged] = useState(false);

  // register viejio
  // const handleRegister = (e) => {
  //   e.preventDefault()
  // auth.register(emailRegister,passwordRegister )
  // }

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Registra al usuario con Firebase Authentication
      await auth.register(emailRegister, passwordRegister);

      // Obtén el usuario actual después del registro
      const user = auth.user;

      // Crea un documento en la colección "users" con el UID del usuario
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        // username: username, // Puedes agregar más detalles según tus necesidades
        email: emailRegister,
        password: passwordRegister,
        // Otros campos de perfil si es necesario
      });

      alert("Sign in succesfully");
   
    } catch (error) {
      console.error("Error al registrar al usuario:", error);
      if (error.code === "auth/email-already-in-use") {
        alert(
          "The email is already in use, please enter another email"
        );
      } else {
        alert("Error al registrar al usuario");
      }
    }
  };

  // Login con email y password
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const email = emailLogin;
    const password = passwordLogin;
  
    try {
      // Intenta iniciar sesión con las credenciales proporcionadas
      await auth.login(email, password);
      alert("Inicio de sesión exitoso");
      navigate('/home');
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Incorrect credentials or user not register");
    }
  };



  const handleGoogle = async (e) => {
    e.preventDefault();

    try {
      // Inicia sesión con Google
      await auth.loginWithGoogle();

      // Después de iniciar sesión con Google, obtén el usuario actual
      const user = auth.user;

      // Verifica si el usuario ya existe en la base de datos por su UID
      const userDocRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Si el usuario no existe en la base de datos, regístralo
        await setDoc(userDocRef, {
          uid: user.uid,
          username: user.displayName, // Puedes personalizar esto según tus necesidades
          email: user.email,
          // Otros campos de perfil si es necesario
        });
      }

      alert("Sign in successfully");
      navigate('/home');
    } catch (error) {
      console.error("Error al registrar con Google:", error);
      // alert("Error al registrar con Google");
    }
  };

  const handleLogout = () => {
    auth.logout();
    // setIsLoggedIn(false)
    alert("Logout");
  };
  return (
    <div className="border-2">
    {displayName && <h5>{displayName}</h5>}

    <div className="flex flex-col items-center h-screen justify-center">
      <div className="md:flex md:items-center md:mb-0">
        <form className="bg-sky-300 shadow-md p-8 rounded-lg mb-4 md:mr-4">
          <h3 className="text-xl mb-4 font-semibold">Register</h3>
          <div className="mb-4">
            <input
              onChange={(e) => setEmailRegister(e.target.value)}
              className="border p-2 w-full"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <input
              onChange={(e) => setPasswordRegister(e.target.value)}
              className="border p-2 w-full"
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            onClick={(e) => handleRegister(e)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            type="submit"
          >
            Submit
          </button>
        </form>

        <form className="bg-sky-300 shadow-md p-8 rounded-lg md:ml-4">
          <h3 className="text-xl mb-4 font-semibold">Login</h3>
          <div className="mb-4">
            <input
              onChange={(e) => setEmailLogin(e.target.value)}
              className="border p-2 w-full"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <input
              onChange={(e) => setPasswordlLogin(e.target.value)}
              className="border p-2 w-full"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={(e) => handleLogin(e)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              type="submit"
            >
              Submit
            </button>
            <button onClick={(e) => handleGoogle(e)} className="ml-2">
              <img
                src="../src/assets/images/logo.png"
                className="w-20 h-10"
                alt=""
              />
            </button>
          </div>
        </form>
      </div>
      <button
        onClick={() => handleLogout()}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover-bg-red-600 mt-2"
      >
        Logout
      </button>
    </div>
  </div>
  );
};

export default Form;
