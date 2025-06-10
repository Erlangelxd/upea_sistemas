import psycopg2
from psycopg2.extras import RealDictCursor
import os

class DataBase:
    def __init__(self):
        # Leer la URL de conexión desde la variable de entorno
        db_url = os.getenv("DATABASE_URL")
        if not db_url:
            raise Exception("❌ No se encontró la variable DATABASE_URL.")

        # Conexión a la base de datos
        self.conn = psycopg2.connect(dsn=db_url, cursor_factory=RealDictCursor)
        self.cursor = self.conn.cursor()
        print("✅ Conectado a la base de datos.")

    def __enter__(self):
        return self.cursor

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_val:
            self.conn.rollback()
        else:
            self.conn.commit()
        self.cursor.close()
        self.conn.close()
        print("🔌 Desconectado de la base de datos.")
