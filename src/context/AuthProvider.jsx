import React, { createContext, useState, useEffect } from 'react';
import { app } from '../firebaseConfig/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getProducts, getProductById, formatPriceWithCommas } from '../firebaseConfig/functions/productFunctions';
import { useAuthFunctions } from '../firebaseConfig/functions/authFunctions';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Definir el estado del usuario
  const [userData, setUserData] = useState(null); // Definir el estado de los datos del usuario
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  const {
    getUserDataFromLocal,
    removeUserDataFromLocal,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    loginWithGoogle,
    logout,
    fetchUserProfile
  } = useAuthFunctions();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Establecer el estado del usuario al recibir el usuario autenticado
      setLoading(false);
      if (user) {
        // Si el usuario está autenticado, obtenemos su perfil
        fetchUserProfile(user.uid).then((userProfile) => {
          if (userProfile) {
            setUserData(userProfile); // Establecer los datos del usuario
          } else {
            console.log('El perfil del usuario no existe en Firestore');
          }
        });
      } else {
        setUserData(null); // Si el usuario no está autenticado, borrar los datos del usuario
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userData,
        getUserDataFromLocal,
        removeUserDataFromLocal,
        loginWithEmailAndPassword,
        registerWithEmailAndPassword,
        loginWithGoogle,
        logout,
        fetchUserProfile,
        getProducts,
        getProductById,
        formatPriceWithCommas
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
