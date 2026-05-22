import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

import axios from "axios";

// ============ CONFIGURACIÓN PARA API DEL SISTEMA ============
const S_IP = "";

const getApiUrl = () => {
  if (__DEV__) {
    return `http://${S_IP}:5000/api`;
  }
  return "https://dominio.com/api";
};

const API_URL = getApiUrl();

console.log("🔧 Conectando a:", API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [vercontraseña, setVerContraseña] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      console.log("Probando conexión a:", API_URL);
      const response = await api.get("/auth/me");
      console.log("Servidor responde:", response.status);
    } catch (error: any) {
      if (error.message === "Network Error") {
        console.warn("No se pudo conectar al servidor");
      }
    }
  };

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert(
        "Error",
        "Por favor ingresa tu correo electrónico o UID y contraseña."
      );
      return;
    }

    setLoading(true);

    try {
      console.log("Intentando iniciar sesión con:", { identifier });

      const isMadreUID = identifier.startsWith("MAMÁ-");
      const isEmail = identifier.includes("@") && identifier.includes(".");

      let response;

      if (isMadreUID) {
        response = await api.post("/auth/login-madre", {
          uid: identifier,
          confirmacion_uid: password,
        });
        console.log("Login madre:", response.data);
      } else if (isEmail) {
        response = await api.post("/auth/login-familiar", {
          email: identifier,
          password: password,
        });
        console.log("Login familiar:", response.data);
      } else {
        Alert.alert("Error", "Ingresa un correo electrónico o un UID válido (MAMÁ-XXXXXXXX)");
        setLoading(false);
        return;
      }

      if (response?.data?.usuario) {
        const usuario = response.data.usuario;
        let mensajeBienvenida = "";

        if (usuario.rol === "madre") {
          mensajeBienvenida = `¡Bienvenida ${usuario.nombre}! Has iniciado sesión como madre.`;
        } else if (usuario.rol === "familiar") {
          mensajeBienvenida = `¡Bienvenido/a ${usuario.nombre}! Has iniciado sesión como familiar.`;
        } else {
          mensajeBienvenida = `¡Bienvenido/a ${usuario.nombre}!`;
        }

        Alert.alert(
          "✅ Sesión iniciada",
          mensajeBienvenida,
          [
            {
              text: "Continuar",
              onPress: () => router.push("/PanelPrincipal" as any),
            },
          ]
        );
      } else {
        throw new Error("Respuesta inválida del servidor");
      }
    } catch (error: any) {
      console.error("❌ Error al iniciar sesión:", error);

      let mensaje = "Error al iniciar sesión";
      let detalles = "";

      if (error.code === "ECONNABORTED") {
        mensaje = "Tiempo de espera agotado";
        detalles = "El servidor no responde. Verifica que esté corriendo.";
      } else if (error.message === "Network Error") {
        mensaje = "Error de conexión";
        detalles = `No se pudo conectar al servidor en:\n${API_URL}\n\nVerifica:\n• El servidor está corriendo\n• Estás en la misma red WiFi\n• La IP ${S_IP} es correcta`;
      } else if (error.response?.data?.message) {
        mensaje = error.response.data.message;
        if (mensaje.includes("UID de madre incorrecto")) {
          detalles = "El UID ingresado no coincide con el registrado.";
        } else if (mensaje.includes("No se encontró un familiar")) {
          detalles = "No existe un familiar registrado con este correo.";
        } else if (mensaje.includes("desactivada")) {
          detalles = "Tu cuenta ha sido desactivada.";
        }
      } else if (error.message) {
        mensaje = error.message;
      }

      Alert.alert("Error", detalles ? `${mensaje}\n\n${detalles}` : mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: "#A1CEDC",
        dark: "#04dcf4",
      }}
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
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="characters"
            editable={!loading}
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={{ color: "#000" }}>
            Contraseña
          </ThemedText>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputField}
              placeholder={
                identifier.startsWith("MAMÁ-") ? "Confirma tu UID" : "********"
              }
              placeholderTextColor="#000"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!vercontraseña}
              editable={!loading}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setVerContraseña(!vercontraseña)}
            >
              <ThemedText style={styles.eyeButtonText}>
                {vercontraseña ? (
                  <Entypo name="eye" size={20} color="black" />
                ) : (
                  <Entypo name="eye-with-line" size={20} color="black" />
                )}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {identifier && (
          <View style={styles.loginTypeContainer}>
            {identifier.startsWith("MAMÁ-") ? (
              <ThemedText style={styles.loginTypeText}>
                🔐 Iniciando sesión como MADRE
              </ThemedText>
            ) : identifier.includes("@") ? (
              <ThemedText style={styles.loginTypeText}>
                📧 Iniciando sesión como FAMILIAR
              </ThemedText>
            ) : null}
          </View>
        )}

        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <ThemedText style={styles.loginButtonText}>Ingresar</ThemedText>
          )}
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
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "¿Olvidaste tu acceso?",
                "• MADRE: Pregunta al personal médico\n• FAMILIAR: usa tu email y el UID de la madre"
              )
            }
          >
            <ThemedText type="link">¿Olvidaste tu acceso?</ThemedText>
          </TouchableOpacity>
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

  loginTypeContainer: {
    alignItems: "center",
    marginTop: -5,
  },

  loginTypeText: {
    fontSize: 12,
    color: "#000",
    fontStyle: "italic",
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