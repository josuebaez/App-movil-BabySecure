import { Image } from 'expo-image';
import { Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login attempted with:', email, password);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#04dcf4' }}
      headerImage={
        <Image
          source={require('@/assets/images/Logo_BabySecure.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.loginContainer}>
        <ThemedText type="title" style={styles.title}>Iniciar Sesión</ThemedText>
        
        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold">Correo electrónico</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold">Contraseña</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </ThemedView>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <ThemedText style={styles.loginButtonText}>Ingresar</ThemedText>
        </TouchableOpacity>

        <ThemedView style={styles.registerContainer}>
          <ThemedText>¿No tienes cuenta? </ThemedText>
          <Link href="/Registro" asChild>
            <TouchableOpacity>
              <ThemedText type="link">Regístrate aquí</ThemedText>
            </TouchableOpacity>
          </Link>
        </ThemedView>

        <ThemedView style={styles.forgotPassword}>
          <Link href="/OlvidarContraseña" asChild>
            <TouchableOpacity>
              <ThemedText type="link">¿Olvidaste tu contraseña?</ThemedText>
            </TouchableOpacity>
          </Link>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    gap: 20,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#A1CEDC',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 10,
  },
  reactLogo: {
    height: 250,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
    resizeMode: 'cover',
  },
});
