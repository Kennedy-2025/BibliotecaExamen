import mysql from "mysql2"; 
import dotenv from "dotenv";

dotenv.config();

// Configuración de base de datos
const dbHost = process.env.DB_HOST || 'bsu60iavgyfryazgpdcz-mysql.services.clever-cloud.com';
const dbUser = process.env.DB_USER || 'urzvxps75sdpqp5i'; 
const dbPassword = process.env.DB_PASSWORD || 'ijfShXvSQMqqmz3iK8UR'; 
const dbName = process.env.DB_NAME || 'bsu60iavgyfryazgpdcz'; 
const dbPort = process.env.DB_PORT || 3306; 

const connection = mysql.createConnection({ 
  host: dbHost, 
  user: dbUser, 
  password: dbPassword, 
  database: dbName, 
  port: Number(dbPort) 
}); 

connection.connect((err) => { 
  if (err) { 
    console.error("❌ Error al conectar a MySQL:", err.message); 
    process.exit(1); 
  } 
  console.log("✅ Conexión exitosa a MySQL"); 
}); 

export default connection;
