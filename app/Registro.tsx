import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";

export default function RegistroScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    console.log("Register with:", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    router.push("/LogIn" as any);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Imagen arriba */}
      <Image
        source={require("@/assets/images/bebes1.jpg")}
        style={styles.image}
      />

      <View style={styles.registerContainer}>
        <ThemedText type="title" style={styles.title}>
          Registro Familiar
        </ThemedText>

        {/* Nombre */}
        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Nombre
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#000"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        {/* Apellidos */}
        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Apellidos
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            placeholderTextColor="#000"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Email
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
        </View>

        {/* Contraseña */}
        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Contraseña
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#000"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Confirmar contraseña */}
        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Confirmar contraseña
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#000"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Botón */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <ThemedText style={styles.registerButtonText}>Registrarse</ThemedText>
        </TouchableOpacity>

        {/* Link a login */}
        <View style={styles.loginContainer}>
          <ThemedText style={{ color: "#000" }}>¿Ya tienes cuenta? </ThemedText>
          <Link href="/LogIn" asChild>
            <TouchableOpacity>
              <ThemedText type="link">Inicia sesión aquí</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    gap: 20,
    backgroundColor: "#62d0f1",
  },
  image: {
    width: "100%",
    height: 221,
    resizeMode: "cover",
    borderRadius: 5,
  },
  registerContainer: {
    gap: 20,
  },
  title: {
    color: "#000",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 24,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    color: "#000",
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
  registerButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
});
