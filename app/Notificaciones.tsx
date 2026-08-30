import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useCallback, useEffect, useState} from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import axios from "axios";
import { io } from "socket.io-client";



//CONFIGURACION DE API A MI SISTEMA

const S_IP = "IP"

const getApiUrl = () => {
  if(__DEV__){
    return `http://${S_IP}:5000/api`;
  }
  return "https://babysecure.com/api";
};

const API_URL = getApiUrl();

const api = axios.create({
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
  verificado: boolean;
  motivo_denegacion: string | null;
  creado_el: string;  
}


export default function NotificacionesScreen() {
  const [eventos, setEventos] = useState<AccesoEvento[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const cargarNotificaciones = useCallback(async () => {

    try{
      setError("");
      const response = await api.get("/accesos/notificaciones");

      if(response.data?.success){
        setEventos(response.data.eventos);
      }
    }catch(err: any){
      console.error("Error al cargar notificaciones:", err);
      setError(err.response?.data?.mensaje || "Error al cargar notificaciones.");
    }
  }, [])

  useEffect(() => {
    const cargarInicial = async () => {
      setLoading(true);
      await cargarNotificaciones();
      setLoading(false);
    };
    cargarInicial();
  }, [cargarNotificaciones]);
  

  //WebSocket
  useEffect(() => {
    const socketUrl = `http://${S_IP}:5000`;
    const socket = io(socketUrl, {withCredentials: true});

    socket.on('nuevo_evento_acceso', () => {
      cargarNotificaciones();
    });

    return () => {
      socket.disconnect();
    };
  }, [cargarNotificaciones]);


  const onRefresh = async () => {
    setRefreshing(true);
    await cargarNotificaciones();
    setRefreshing(false);
  }

  const renderItem = ({item}: {item: AccesoEvento}) => (
    <View style={[styles.card, item.verificado ? styles.cardConcedido : styles.cardDenegado]}>
     
     <Ionicons name={item.verificado ? "checkmark-circle" : "close-circle"} size={32} color={item.verificado ? "#1baa20" : "#e53935"}/>

     <View style={styles.cardTexto}>
        <ThemedText type= "defaultSemiBold" style={styles.cardTitulo}>
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


  return (
    <ThemedView style={styles.screen}>
        <ThemedView style={styles.panelContainer}>
          <ThemedText style={styles.title}>Notificaciones</ThemedText>
          <Ionicons name="notifications" size={90} color="black"/>
       </ThemedView>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{marginTop:20}} />
      ) : error ? (
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      ) : eventos.length === 0 ? (
        <ThemedText style={styles.emptyText}>No hay notificaciones por ahora</ThemedText>
      ) : (
        <FlatList
          data={eventos}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{gap: 12, paddingBottom: 20 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />
      )}
  </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f9b6b6",
    padding: 20,
    gap: 20,
  },
  panelContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#f9b6b6",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 1,
    color: "#000"
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
