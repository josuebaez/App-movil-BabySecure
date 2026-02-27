import { Image } from 'expo-image';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function OlvidarContraseñaScreen() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Aquí iría la lógica para enviar el email de recuperación
    console.log('Password reset requested for:', email);
    setSubmitted(true);
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
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Recuperar Contraseña</ThemedText>
        
        {!submitted ? (
          <>
            <ThemedText style={styles.description}>
              Ingresa tu email y te enviaremos instrucciones para restablecer tu contraseña.
            </ThemedText>

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

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <ThemedText style={styles.submitButtonText}>Enviar instrucciones</ThemedText>
            </TouchableOpacity>
          </>
        ) : (
          <ThemedView style={styles.successContainer}>
            <ThemedText style={styles.successText}>
              ✉️ Se han enviado las instrucciones a {email}
            </ThemedText>
            <ThemedText style={styles.successSubtext}>
              Revisa tu bandeja de entrada y sigue los pasos para restablecer tu contraseña.
            </ThemedText>
          </ThemedView>
        )}

        <ThemedView style={styles.backToLogin}>
          <Link href="/LogIn" asChild>
            <TouchableOpacity>
              <ThemedText type="link">Volver al inicio de sesión</ThemedText>
            </TouchableOpacity>
          </Link>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
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
  submitButton: {
    backgroundColor: '#A1CEDC',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successContainer: {
    gap: 15,
    padding: 20,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
  },
  successText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
  },
  successSubtext: {
    fontSize: 14,
    color: '#1b5e20',
    textAlign: 'center',
  },
  backToLogin: {
    alignItems: 'center',
    marginTop: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});