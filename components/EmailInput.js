import React, { useState } from 'react';
import { TextInput, Text,View ,StyleSheet} from 'react-native';

const EmailInput = ({type,handleInput}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChangeEmail = (text) => {
    setEmail(text);
    handleInput(text)
    if(type === "mail"){
      validateEmail();
    }
  };

  const validateEmail = () => {
    const regularExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
    const validEmail = regularExpression.test(email);

    if (!validEmail) {
      setError('Invalid email address');
    }
    else{
        setError('')
    }
  };

  return (
    <View>
      <Text style={styles.heading}>{type === "mail" ? "Caretaker Email address:" : "Medicine Name:"}</Text>
      <TextInput
        value={email}
        onChangeText={handleChangeEmail}
        keyboardType="email-address"
        placeholder= {type === "mail" ? "email address" : "Name"}
        style={styles.emailInput}
      />
      <Text style={{ color: 'red' }}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    emailInput: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        padding: 10,
      },
      heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom:20
      },
})
export default EmailInput;
