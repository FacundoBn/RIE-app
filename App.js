import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DeviceSearch from './src/components/DeviceSearch';
import Login from './src/components/Login';
import Menu from './src/components/Menu';
import NewDevice from './src/components/NewDevice';
import TicketSearch from './src/components/TicketSearch';

export default function App() {
  const [screen, setScreen] = useState('login');
  const [sessionToken, setSessionToken] = useState('');

  const renderScreen = () => {
    switch (screen) {
      case 'deviceSearch':
        return <DeviceSearch sessionToken={sessionToken} onAddNewDevice={() => setScreen('newDevice')} />;
      case 'login':
        return <Login onLogin={token => { setSessionToken(token); setScreen('deviceSearch'); }} />;
      case 'newDevice':
        return <NewDevice onBack={() => setScreen('deviceSearch')} />;
      case 'ticketSearch':
        return <TicketSearch sessionToken={sessionToken} />;
      default:
        return <DeviceSearch sessionToken={sessionToken} onAddNewDevice={() => setScreen('newDevice')} />;
    }
  };

  return (
    <View style={styles.container}>
      {screen !== 'login' && <Menu setScreen={setScreen} handleLogout={() => setScreen('login')} />}
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
