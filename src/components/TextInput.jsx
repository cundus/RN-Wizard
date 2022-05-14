import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

const CustomInput = ({value, onChange, label}) => {
  return (
    <View>
      <Text>TextInput</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChange(text)}
        value={value}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: '#000',
    width: '100%',
  },
});
