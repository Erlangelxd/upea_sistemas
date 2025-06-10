

from src.services.database import DataBase


class MateriaService:


    def obtener_materias(self):
        sql = """
            select m.nombre, m.descripccion, s.nombre as semestre, s.id as semestre_id
            from materia m
            inner join semestre s on m.semestre_id = s.id;
        """
        with DataBase() as db:
            db.execute(sql)
            return db.fetchall()
        
        
    def obtener_semestres(self):
        sql = """
            select * from semestre;
        """
        with DataBase() as db:
            db.execute(sql)
            return db.fetchall()
        
    
    def obtener_eventos(self):
        sql = """
            select * from eventos;
        """
        with DataBase() as db:
            db.execute(sql)
            return db.fetchall()
        
    def obtener_anuncios(self):
        sql = """
            SELECT * FROM anuncios
            ORDER BY 
            CASE LOWER(prioridad)
                WHEN 'alta' THEN 1
                WHEN 'media' THEN 2
                WHEN 'baja' THEN 3
            END,
            fecha_publicacion DESC,
            hora_publicacion DESC;
        """
        with DataBase() as db:
            db.execute(sql)
            data = db.fetchall()
            #print(data)  # verifica si están bien ordenados
            return data
        
    def obtener_preguntas_frecuentes(self):
        sql = """
            select * from preguntas_frecuentes;
        """
        with DataBase() as db:
            db.execute(sql)
            return db.fetchall()
