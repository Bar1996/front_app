import axios from "axios";
import { SERVER_URL } from '../core/config';

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: { Accept: "application/vnd.github.v3+json" },
});

export default apiClient;
