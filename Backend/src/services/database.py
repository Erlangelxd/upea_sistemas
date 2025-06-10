# src/services/database.py
from psycopg2 import pool
from psycopg2.extras import RealDictCursor
import os

class DataBase:
    __pool = None

    @classmethod
    def initialize(cls):
        if cls.__pool is None:
            cls.__pool = pool.SimpleConnectionPool(
                minconn=1,
                maxconn=10,
                host=os.getenv("DB_HOST", "localhost"),
                database=os.getenv("DB_NAME", "educacion"),
                user=os.getenv("DB_USER", "postgres"),
                password=os.getenv("DB_PASSWORD", "melapelas123"),
                cursor_factory=RealDictCursor
            )
            print("✅ Pool de conexiones creado.")

    def __init__(self):
        if self.__pool is None:
            raise Exception("❌ Pool de conexiones no inicializado.")
        self.conn = self.__pool.getconn()
        self.cursor = self.conn.cursor()

    def __enter__(self):
        return self.cursor

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_val:
            self.conn.rollback()
        else:
            self.conn.commit()
        self.cursor.close()
        self.__pool.putconn(self.conn)

















# import psycopg2
# from psycopg2.extras import RealDictCursor

# class DataBase:
    
#     def __init__(self):
#         self.conn = psycopg2.connect(
#             host="localhost",
#             database="educacion",
#             user="postgres",
#             password="melapelas123",
        

#         )
#         print("Conectado a la base de datos")
        
#     def __enter__(self):
#         self.conn.cursor_factory = RealDictCursor
#         self.cursor = self.conn.cursor()
#         return self.cursor
    
#     def __exit__(self, exc_type, exc_val, exc_tb):
#         if exc_val is not None:
#             self.conn.rollback()
#         else:
#             self.conn.commit()
#         self.cursor.close()
#         self.conn.close()
#         print("Desconectado de la base de datos")