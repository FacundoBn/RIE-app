import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import axios from 'axios';
import logo from '../../assets/images/cma-logo.png'; // Ruta ajustada

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    try {
      setErrorMessage('');
      console.log('Iniciando sesión con:', { username, password });
      //const response = await axios.post('https://glpi-dev.casademoneda.gob.ar:8080/apirest.php/AuthLDAP', {
        const response = await axios.post('https://glpi.dev.nd.casademoneda.gob.ar/apirest.php/initSession', {
        login: username,
        password: password,
        //auth_domain: 'cm.gov.ar',
      }, {
        headers: {
        //  'app-Token': '80keAmu2CXM07QPx8PfxUHf0SwoZX4e6XLqZxadL',
        //  'user_token': 'WE7EsEMpXMfcZNUeBZf9vRmNT29thMO7torbuFUI',
        'app-Token': '76io8xUpEmUxxnIwQhxvmg5vlTg2Zd9TjSuW16jz',
        'user_token': 'HDWvPGafrDdvXyrpDKaWe1BTpP1Dg5qSb1GF0O8g',
        
        },
      });

      console.log('Respuesta de la API:', response.data);

      const { session_token } = response.data;

      if (session_token) {
        // Guardar session_token y pasar a la siguiente pantalla
        onLogin(session_token);
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error.response || error.message);
      setErrorMessage('An error occurred during login');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>Registros de Ingresos y Egresos</Text>
      <Text style={styles.title}>Login</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00008B', 
    padding: 16,
  },
  logo: {
    width: 150, 
    height: 150, 
    resizeMode: 'contain',
    marginTop: 50,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', 
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    width: width * 0.8, 
    padding: 15, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff', 
    color: '#333', 
  },
  button: {
    width: width * 0.8, 
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;