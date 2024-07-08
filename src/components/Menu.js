import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const Menu = ({ setScreen, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = (screen) => {
    setScreen(screen);
    setIsOpen(false); 
  };

  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuHeader}>
        <Text style={styles.menuTitle}>Registro</Text>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>{isOpen ? 'Cerrar' : 'Abrir'}</Text>
        </TouchableOpacity>
      </View>
      {isOpen && (
        <View style={styles.menuItems}>
          <TouchableOpacity onPress={() => handleMenuClick('deviceSearch')} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Buscar Dispositivos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuClick('ticketSearch')} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Buscar Ingresos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuClick('newDevice')} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Ingresar Nuevo Dispositivo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 50,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#00008B',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuButton: {
    padding: 8,
  },
  menuButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  menuItems: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: '#00008B',
    padding: 16,
    zIndex: 40,
  },
  menuItem: {
    marginBottom: 16,
  },
  menuItemText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Menu;
