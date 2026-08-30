import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import axios from "axios";
import { io } from "socket.io-client";

//API
const S_IP = "API";

const getApiUrl = () => {
  if(__DEV__){
    return `http://${S_IP}:5000/api`;
  }
  return `http://babysecure.com/api`;
};

const API_URL = getApiUrl();

const api = axios.create ({
  baseURL: API_URL,
  timeout: 15000,
  withCredentials: true,
});

interface AccesoEvento{
  id: number;
  usuario_tipo: string;
  usuario_nombre: string;
  madre_uid: string | null;
  madre_nombre: string | null;
  parentezco: string | null;
  verificado: string | null;
  motivo_denegacion: string | null;
  creado_el: string;
}

export default function AccesoScreen(){
  const [eventos, setEventos] = useState<AccesoEvento[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const cargarHistorial = useCallback(async () => {
    try{
      setError("");
      const response = await api.get("/accesos/notificaciones");
      if(response.data?.success){
        setEventos(response.data.eventos);
      }
    }catch(err: any){
      console.log("Error al cargar el historial", err);
      setError(err.response?.data?.mensaje || "No se pudo cargar el historial");
    }
  }, []);

  useEffect(() => {
    const cargarInicial = async () => {
      setLoading(true);
      await cargarHistorial();
      setLoading(false);
    };
    cargarInicial();
  }, [cargarHistorial]);

  //WebSocket
  useEffect (() => {
    const socketUrl = `http://${S_IP}:5000`;
    const socket = io(socketUrl, {withCredentials: true});

    socket.on('nuevo_evento_acceso', () => {
      cargarHistorial();
    });

    return () => {
      socket.disconnect();
    };
  }, [cargarHistorial]);

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarHistorial();
    setRefreshing(false);
  };

  const totalConcedidos = eventos.filter((e) => e.verificado).length;
  const totalDenegados = eventos.length - totalConcedidos;

  const renderItem = ({item}: {item: AccesoEvento}) => (
    <View style={[styles.card, item.verificado ? styles.cardConcedido : styles.cardDenegado,]}>

      <Ionicons
        name={item.verificado ? "checkmark-circle" : "close-circle"} size={30} color={item.verificado ? "#1baa20" : "#e53935"}
      />

      <View style={styles.cardTexto}>
        <ThemedText type="defaultSemiBold" style={styles.cardTitulo}>
          {item.verificado ? "Acceso concedido" : "Acceso denegado"}
        </ThemedText>
        
        <ThemedText style={styles.cardDetalle}>
          {item.usuario_nombre}
          {item.parentezco ? ` (${item.parentezco})` : ""}
        </ThemedText>

        {item.madre_nombre && (
          <ThemedText style={styles.cardDetalle}>
            Madre: {item.madre_nombre}
          </ThemedText>
        )}

        {!item.verificado && item.motivo_denegacion && (
          <ThemedText style={styles.cardMotivo}>
            {item.motivo_denegacion}
          </ThemedText>
        )}

        <ThemedText style={styles.cardFecha}>
          {new Date(item.creado_el).toLocaleString()}
        </ThemedText>
      </View>
    </View>
  );


  return(
    <ThemedView style={styles.screen}>
      <ThemedView style={styles.panelContainer}>
        <ThemedText style={styles.title}>Accesos</ThemedText>
        <Ionicons name="finger-print" size={80} color="balck"/>
      </ThemedView>

      {!loading && !error && eventos.length > 0 && (
        <View style={styles.resumenContainer}>
          <View style={styles.resumenItem}>
            <ThemedText style={[styles.resumenNumero, {color: "#1baa20"}]}>
              {totalConcedidos}
            </ThemedText>
            <ThemedText style={styles.resumenLabel}>Accesos Concedidos</ThemedText>
          </View>
          <View style={styles.resumenItem}>
            <ThemedText style={[styles.resumenNumero, {color: "#e53935"}]}>
              {totalDenegados}
            </ThemedText>
            <ThemedText style={styles.resumenLabel}>Accesos Denegados</ThemedText>
          </View>
        </View>
      )}


      {loading? (
        <ActivityIndicator size="large" color="#000" style={{marginTop: 20}}/>
      ): error ? (
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      ): eventos.length === 0 ? (
        <ThemedText style={styles.emptyText}>
          Aun no hay accesos registrados
        </ThemedText>
      ):(
        <FlatList
          data= {eventos}
          keyExtractor= {(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{gap: 12, paddingBottom: 20}}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />
      )}
    </ThemedView>
  );

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#acfffb",
    padding: 20,
    gap: 20,
  },
  panelContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#acfffb",
  },
  title: {
    fontSize: 25,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 1,
  },
  resumenContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    marginBottom: 8,
  },
  resumenItem: {
    alignItems: "center",
  },
  resumenNumero: {
    fontSize: 24,
    fontWeight: "bold",
  },
  resumenLabel: {
    fontSize: 13,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#fff",
  },
  cardConcedido: {
    borderLeftWidth: 5,
    borderLeftColor: "#1baa20",
  },
  cardDenegado: {
    borderLeftWidth: 5,
    borderLeftColor: "#e53935",
  },
  cardTexto: {
    flex: 1,
    gap: 2,
  },
  cardTitulo: {
    fontSize: 16,
    color: "#000",
  },
  cardDetalle: {
    fontSize: 14,
    color: "#333",
  },
  cardMotivo: {
    fontSize: 13,
    color: "#e53935",
    fontStyle: "italic",
    marginTop: 2,
  },
  cardFecha: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  errorText: {
    textAlign: "center",
    color: "#e53935",
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#555",
    marginTop: 20,
  },
});
