// components/ThemeSwitcher.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, useColorScheme, StyleSheet } from 'react-native';

const ThemeSwitcher = () => {
  const colorScheme = useColorScheme(); // Detect system theme (light or dark)
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    setTheme(colorScheme); // Set the theme based on the system's color scheme
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
      <Text style={styles.text}>Current Theme: {theme}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
  light: { backgroundColor: '#fff', color: '#000' },
  dark: { backgroundColor: '#333', color: '#fff' },
});

export default ThemeSwitcher;
