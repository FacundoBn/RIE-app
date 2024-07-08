import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import logo from '../../assets/images/cma-logo.png';

const TicketSearch = () => {
  const [query, setQuery] = useState('');
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = () => {
    const sampleTickets = [
      {
        id: 1,
        title: 'Notebook Dell',
        date: '2024-06-13 - 07:56hs',
        status: 'Ingresado',
        owner: 'Juan Perez',
        legajo: '1930',
        dni: '18123456',
      },
      {
        id: 2,
        title: 'Notebook Lenovo',
        date: '2024-06-13 - 08:01:hs',
        status: 'Ingresado',
        owner: 'Juan Garcia',
        legajo: 'Externo',
        dni: '35123456'
      },
      {
        id: 3,
        title: 'Macbook Pro 13',
        date: '2024-06-13 - 09:27',
        status: 'Ingresado',
        owner: 'Juan Echeverri',
        legajo: '2112',
        dni: '21234555',
      }
    ];
    setTickets(sampleTickets);
  };

  const handleRetirar = (ticketId) => {
    setTickets(tickets.filter(ticket => ticket.id !== ticketId));
    setMessage('Se generó con éxito el Ticket de Retiro');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Buscar Dispositivos Ingresados</Text>
      <TextInput
        placeholder="Buscar por: Legajo, DNI, Nombre, Marca de notebook"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      {message && (
        <View style={[styles.message, styles.messageSuccess]}>
          <Text>{message}</Text>
        </View>
      )}
      <ScrollView style={styles.ticketList}>
        {tickets.map((ticket) => (
          <View key={ticket.id} style={styles.ticketCard}>
            <Text style={styles.ticketTitle}>{ticket.title}</Text>
            <Text>Día: {ticket.date}</Text>
            <Text>Legajo: {ticket.legajo}, DNI: {ticket.dni}</Text>
            <Text>Nombre: {ticket.owner}</Text>
            <TouchableOpacity onPress={() => handleRetirar(ticket.id)} style={[styles.button, styles.retirarButton]}>
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
    color: '#155724',
  },
  ticketList: {
    width: '100%',
    marginTop: 20,
  },
  ticketCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  retirarButton: {
    backgroundColor: '#dc3545',
    marginTop: 10,
  },
});

export default TicketSearch;
