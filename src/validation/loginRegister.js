// Validación del formato de un email
export const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  
// Validación de la longitud mínima de una contraseña
export const validatePasswordLength = (password) => {
    return password.length >= 6;
  };
  