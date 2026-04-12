import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, useRouter } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vercontraseña, setVerContraseña] = useState(false);
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
          Sistema de Seguridad Neonatal
        </ThemedText>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={{ color: "#000" }}>
            Correo electrónico o UID de la madre
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico o UID"
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

          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputField}
              placeholder="********"
              placeholderTextColor="#000"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!vercontraseña}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setVerContraseña(!vercontraseña)} 
            >
              <ThemedText style={styles.eyeButtonText}>
                {vercontraseña ? (<Entypo name="eye" size={20} color="black" />) : 
                (<Entypo name="eye-with-line" size={20} color="black" />)}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <ThemedText style={styles.loginButtonText}>Ingresar</ThemedText>
        </TouchableOpacity>

        <ThemedView style={styles.registerContainer}>
          <Link href="/Registro" asChild>
            <TouchableOpacity>
              <ThemedText type="link" style={styles.registerText}>
                ¿Eres Familiar? Regístrate aquí
              </ThemedText>
            </TouchableOpacity>
          </Link>
        </ThemedView>

        <ThemedView style={styles.forgotPassword}>
          <Link href="/OlvidarContrasena" asChild>
            <TouchableOpacity>
              <ThemedText type="link">¿Olvidaste tu acceso?</ThemedText>
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
    fontSize: 25,
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
  eyeButton: {
    padding: 5,
  },
  eyeButtonText: {
    fontSize: 20,
  },
  inputRow: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#fff",
  borderRadius: 8,
  paddingHorizontal: 10,
  backgroundColor: "#fff",
},

inputField: {
  flex: 1,
  paddingVertical: 12,
  fontSize: 16,
  color: "#000",
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
