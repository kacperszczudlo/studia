// lib/config.ts
export const config = {
    port: process.env.PORT || 3100,
    // Zmień 'mean-app-db' na 'myAppDB'
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/myAppDB'
};