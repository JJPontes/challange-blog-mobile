declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL: string;
    API_TIMEOUT: string;
    SECRET_KEY: string;
  }

  const Config: NativeConfig;
  export default Config;
}
