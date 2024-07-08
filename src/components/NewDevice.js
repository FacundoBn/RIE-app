import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import logo from '../../assets/images/cma-logo.png';

const NewDevice = ({ onBack }) => {
  const [serial, setSerial] = useState('');
  const [model, setModel] = useState('');
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log({ serial, model, name, dni });
    setMessage('Se generó el ticket de ingreso del nuevo dispositivo');
    setTimeout(() => {
      setMessage('');
      onBack();
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Ingresar Nuevo Dispositivo Externo</Text>
      {message ? (
        <View style={[styles.message, styles.messageSuccess]}>
          <Text>{message}</Text>
        </View>
      ) : null}
      <TextInput
        placeholder="Serial"
        value={serial}
        onChangeText={setSerial}
        style={styles.input}
      />
      <TextInput
        placeholder="Modelo"
        value={model}
        onChangeText={setModel}
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre del Ingresante"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="DNI o Legajo del Ingresante"
        value={dni}
        onChangeText={setDni}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBack} style={[styles.button, styles.backButton]}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ADD8E6', 
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', 
    marginVertical: 20,
  },
  input: {
    width: width * 0.8, 
    padding: 15, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10, 
    marginBottom: 15,
    backgroundColor: '#fff', 
  },
  button: {
    width: width * 0.8, 
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 10, 
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#6c757d',
  },
  message: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  messageSuccess: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
});

export default NewDevice;
