const BASE = process.env.EXPO_PUBLIC_API_URL ?? "";

export const API_URL = __DEV__ ? `${BASE}/api` : "https://babysecure.com/api";
export const SOCKET_URL = __DEV__ ? BASE : "https://babysecure.com";
