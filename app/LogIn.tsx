import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log("Login attempted with:", email, password);
    router.push("/PanelPrincipal" as any);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#04dcf4" }}
      headerImage={
        <Image
          source={require("@/assets/images/Logo_BabySecure.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.loginContainer}>
        <ThemedText type="title" style={styles.title}>
          Inicio de Sesión
        </ThemedText>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={{ color: "#000" }}>
            Correo electrónico
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#000"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={{ color: "#000" }}>
            Contraseña
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholderTextColor="#000"
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
          <Link href="/Registro" asChild>
            <TouchableOpacity>
              <ThemedText type="link" style={styles.registerText}>
                Regístrate
              </ThemedText>
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
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "400",
  },
  inputContainer: {
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  registerText: {
    fontSize: 18,
    color: "#1baa20",
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 10,
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
