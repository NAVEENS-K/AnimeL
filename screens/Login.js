// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase/firebase'; // adjust path if needed

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [hidePassword, setHidePassword] = useState(true);

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       Alert.alert('Welcome!', 'You are logged in.');
//       navigation.replace('Drawer');
//     } catch (error) {
//       Alert.alert('Login Failed', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png' }}
//         style={styles.logo}
//       />
//       <Text style={styles.title}>Welcome Back</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         placeholderTextColor="#999"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.passwordInput}
//           placeholder="Password"
//           placeholderTextColor="#999"
//           secureTextEntry={hidePassword}
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
//           <Icon
//             name={hidePassword ? 'visibility-off' : 'visibility'}
//             size={24}
//             color="#999"
//           />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity onPress={() => Alert.alert('Forgot Password?', 'Coming soon...')}>
//         <Text style={styles.forgot}>Forgot Password?</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={styles.loginText}>Login</Text>
//       </TouchableOpacity>

//       <Text style={styles.orText}>Don't have an account?</Text>

//       <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//         <Text style={styles.linkText}>Create Account</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f6fb',
//     paddingHorizontal: 24,
//     justifyContent: 'center',
//   },
//   logo: {
//     width: 160,
//     height: 50,
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 24,
//     color: '#1e40af',
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     backgroundColor: '#fff',
//     padding: 14,
//     borderRadius: 10,
//     marginBottom: 16,
//     fontSize: 16,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     color: '#111827',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     marginBottom: 16,
//   },
//   passwordInput: {
//     flex: 1,
//     paddingVertical: 14,
//     fontSize: 16,
//     color: '#111827',
//   },
//   forgot: {
//     alignSelf: 'flex-end',
//     marginBottom: 20,
//     color: '#1e40af',
//   },
//   loginButton: {
//     backgroundColor: '#1e40af',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   loginText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   orText: {
//     textAlign: 'center',
//     marginVertical: 20,
//     color: '#555',
//   },
//   linkText: {
//     color: '#1e40af',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });













import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // adjust path if needed
import Logo from '../assets/icon.png'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Welcome!', 'You are logged in.');
      navigation.replace('Drawer');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome Back</Text>

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

      <TouchableOpacity onPress={() => Alert.alert('Forgot Password?', 'Coming soon...')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Don't have an account?</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
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
