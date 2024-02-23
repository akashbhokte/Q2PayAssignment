import React from 'react';
import {Modal as RNModal, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Colors} from '../constants/Colors';

interface ILoadingIndicator {
  loading: boolean;
}

const LoadingIndicator = ({loading}: ILoadingIndicator) => {
  return (
    <RNModal animationType="fade" transparent={true} visible={loading}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgb(0,0,0,0.1)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator
          animating={loading}
          // color={Colors.app_yellow}
          size={50}
        />
      </View>
    </RNModal>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({});
