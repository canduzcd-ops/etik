import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.racalabs.etik',
    appName: 'ETİK',
    webDir: 'dist',

    server: {
        androidScheme: 'https'
    }
};

export default config;
