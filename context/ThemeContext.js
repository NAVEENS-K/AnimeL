// // context/ThemeContext.js
// import React, { createContext, useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const loadTheme = async () => {
//       const stored = await AsyncStorage.getItem('darkTheme');
//       setDarkMode(stored === 'true');
//     };
//     loadTheme();
//   }, []);

//   const toggleTheme = async () => {
//     const newTheme = !darkMode;
//     setDarkMode(newTheme);
//     await AsyncStorage.setItem('darkTheme', newTheme.toString());
//   };

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };



// ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

