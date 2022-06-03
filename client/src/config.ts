const BACKEND_URL =
  import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:9000";

const config = {
  backendUrl: BACKEND_URL,
};

export default config;
