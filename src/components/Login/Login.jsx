import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, Form, Button, Alert } from 'react-bootstrap';
import { validateEmail, validatePasswordLength } from '../../validation/loginRegister'

const Login = () => {
  const { loginWithEmailAndPassword, registerWithEmailAndPassword, loginWithGoogle, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registro, setRegistro] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Obtenemos la función de redirección desde react-router-dom

  useEffect(() => {
    // Si el usuario ya está autenticado, redirigimos a la página principal o alguna otra página.
    if (user) {
      navigate('/'); // Redirigimos a la ruta '/home' o cualquier otra ruta que desees.
    }
  }, [user, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, ingresa un email válido.');
      return;
    }

    if (!validatePasswordLength(password)) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      if (registro) {
        // Registro de usuario
        await registerWithEmailAndPassword(email, password);
      } else {
        // Inicio de sesión
        await loginWithEmailAndPassword(email, password);
     }
      // El usuario se habrá autenticado automáticamente en el AuthProvider
    } catch (error) {
      setError(error.message) //Los mensajes de error provienen del AuthProvider. 
    }
  };

  return (

    <Container className='m-5 p-5'>
    <Stack gap={3} className="col-md-8 m-5 p-5 d-flex justify-content-center">
      <h1 className='align-self-center' style={{ color: "white" }}>{registro ? 'Registrarse' : 'Iniciar sesión'}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form noValidate onSubmit={handleFormSubmit} className='d-flex-column justify-content-center'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required // Campo obligatorio
            />        
            </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required // Campo obligatorio
            />        
            </Form.Group>

        <Button variant="primary" type="submit" className='mb-3'>
          {registro ? "Registrarse" : "Iniciar sesión"}
        </Button>
      </Form>
      <Button 
         className='align-self-center'
          variant='primary' 
          type='submit' 
          style={{width : "300px"}}
          onClick={() => loginWithGoogle()}
        >
          Acceder con Google
        </Button>
      <Button
        className='align-self-center'
        style={{ width: "300px" }}
        variant='secondary'
        onClick={() => setRegistro(!registro)}
      >
        {
          registro
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"
        }
      </Button>
    </Stack>
  </Container>
  );
};

export default Login;

