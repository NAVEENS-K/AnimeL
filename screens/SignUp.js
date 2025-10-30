import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import  Logo  from '../assets/icon.png';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Account Created', 'You can now log in!');
      navigation.replace('Drawer');
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
              source={Logo}
              style={styles.logo}
            />
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={hidePassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Icon
            name={hidePassword ? 'visibility-off' : 'visibility'}
            size={24}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Already have an account?</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#1e40af',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    color: '#111827',
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: '#1e40af',
  },
  loginButton: {
    backgroundColor: '#1e40af',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#555',
  },
  linkText: {
    color: '#1e40af',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
