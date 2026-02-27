import { Image } from 'expo-image';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function RegistroScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Aquí iría la lógica de registro
    console.log('Register with:', { name, email, password, confirmPassword });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.registerContainer}>
        <ThemedText type="title" style={styles.title}>Crear Cuenta</ThemedText>
        
        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold">Nombre completo</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Juan Pérez"
            value={name}
            onChangeText={setName}
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold">Email</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="tu@email.com"
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

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold">Confirmar contraseña</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="********"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </ThemedView>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <ThemedText style={styles.registerButtonText}>Registrarse</ThemedText>
        </TouchableOpacity>

        <ThemedView style={styles.loginContainer}>
          <ThemedText>¿Ya tienes cuenta? </ThemedText>
          <Link href="/LogIn" asChild>
            <TouchableOpacity>
              <ThemedText type="link">Inicia sesión aquí</ThemedText>
            </TouchableOpacity>
          </Link>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
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
  registerButton: {
    backgroundColor: '#A1CEDC',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
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