import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProductList from './src/screens/ProductList';
import Routing from './src/routes/Routing';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Routing />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
