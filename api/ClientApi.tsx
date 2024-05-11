import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://10.100.102.25:3000",
  headers: { Accept: "application/vnd.github.v3+json" },
});

export default apiClient;
