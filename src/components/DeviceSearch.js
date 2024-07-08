import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import logo from '../../assets/images/cma-logo.png';
import credencial from '../../assets/images/usuario.png';

const DeviceSearch = ({ sessionToken, onAddNewDevice }) => {
  const [query, setQuery] = useState('');
  const [devices, setDevices] = useState([]);
  const [message, setMessage] = useState({ text: '', color: '' });

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://glpi.dev.nd.casademoneda.gob.ar/apirest.php/search/Computer', {
        params: {
          criteria: [
            {
              field: 'name',
              searchtype: 'contains',
              value: query,
            },
          ],
        },
        headers: {
          'Session-Token': sessionToken,
          'App-Token': 'your_app_token',
        },
      });

      setDevices(response.data);
    } catch (error) {
      console.error('Error during device search:', error);
      Alert.alert('Error', 'An error occurred during device search');
    }
  };

  const handleAction = (deviceId, action) => {
    const device = devices.find(d => d.id === deviceId);
    if (action === 'Ingresar') {
      setMessage({ text: 'Se generó con éxito el Ticket de Ingreso', color: 'green' });
    } else if (action === 'Retirar' && device.status !== 'Ingresado') {
      setMessage({ text: 'Este Equipo No se encuentra Ingresado', color: 'red' });
    } else {
      setMessage({ text: 'Se generó con éxito el ticket de egreso', color: 'green' });
    }
    setTimeout(() => setMessage({ text: '', color: '' }), 3000);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Buscar Dispositivos</Text>
      <TextInput
        placeholder="Dispositivo"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onAddNewDevice} style={[styles.button, styles.newDeviceButton]}>
        <Text style={styles.buttonText}>Ingresar Nuevo Dispositivo</Text>
      </TouchableOpacity>
      {message.text ? (
        <View style={[styles.message, message.color === 'green' ? styles.messageSuccess : styles.messageError]}>
          <Text>{message.text}</Text>
        </View>
      ) : null}
      <ScrollView style={styles.deviceList}>
        {devices.map((device) => (
          <View key={device.id} style={styles.deviceCard}>
            <Text style={styles.deviceName}>{device.name}</Text>
            <Image source={credencial} style={styles.deviceAvatar} />
            <Text>Serial: {device.serial}</Text>
            <Text>Modelo: {device.model}</Text>
            <Text>Nombre: {device.owner}</Text>
            <Text>Legajo: {device.legajo}, DNI: {device.dni}</Text>
            <Text>Último Estado: {device.status}</Text>
            <Text>Día: {device.date}</Text>
            <TouchableOpacity onPress={() => handleAction(device.id, 'Ingresar')} style={[styles.button, styles.ingresarButton]}>
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAction(device.id, 'Retirar')} style={[styles.button, styles.retirarButton]}>
              <Text style={styles.buttonText}>Retirar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
  newDeviceButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  messageSuccess: {
    backgroundColor: '#d4edda',
  },
  messageError: {
    backgroundColor: '#f8d7da',
  },
  deviceList: {
    width: '100%',
    marginTop: 20,
  },
  deviceCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff', 
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deviceAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginVertical: 10,
  },
  ingresarButton: {
    backgroundColor: '#28a745',
  },
  retirarButton: {
    backgroundColor: '#dc3545',
  },
});

export default DeviceSearch;
