export const config = {
    port: process.env.PORT || 3100,
    supportedPostCount: 15, // Dodano dla middleware (Zakres walidacji <1, 14>)
    databaseUrl: process.env.MONGODB_URI || 
    'mongodb+srv://kacperszczudlo_db_user:KacSzczud2115**@clustertaw.pccrx26.mongodb.net/TAWKSZ?appName=ClusterTAW'
};