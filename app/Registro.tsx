import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function RegistroScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Aquí iría la lógica de registro
    console.log("Register with:", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.registerContainer}>
        <ThemedText type="title" style={styles.title}>
          Registro Familiar
        </ThemedText>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold">Nombre</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#fff"
            value={firstName}
            onChangeText={setFirstName}
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold">Apellidos</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            placeholderTextColor="#fff"
            value={lastName}
            onChangeText={setLastName}
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold">Email</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#fff"
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
            placeholderTextColor="#fff"
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
            placeholderTextColor="#fff"
            placeholder="********"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </ThemedView>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
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
    textAlign: "center",
    marginBottom: 10,
  },
  inputContainer: {
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2b9fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#2b9fff",
    color: "#fff",
  },
  registerButton: {
    backgroundColor: "#2b9fff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  reactLogo: {
    height: 250,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
    resizeMode: "cover",
  },
});
