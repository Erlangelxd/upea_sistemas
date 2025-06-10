import shutil
import fastapi, fastapi.middleware.cors
from fastapi.params import File
from fastapi.responses import JSONResponse
import uvicorn
from src.services.database import DataBase
from dotenv import load_dotenv
from fastapi import UploadFile, File, Form
import os
from typing import List


from src.services.materia_service import MateriaService
load_dotenv()
app = fastapi.FastAPI()
DataBase.initialize()
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    fastapi.middleware.cors.CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

service_materia = MateriaService()

@app.get("/materias/obtener")
async def get_materias():
    
    materias = service_materia.obtener_materias()

    return materias

@app.get("/semestres/obtener")
async def get_semestres():
    
    semestres = service_materia.obtener_semestres()

    return semestres

@app.get("/eventos/obtener")
async def get_eventos():
    
    eventos = service_materia.obtener_eventos()

    return eventos

@app.get("/anuncios/obtener")
async def get_anuncios():
    
    anuncios = service_materia.obtener_anuncios()

    return anuncios

@app.get("/preguntas_frecuentes/obtener")
async def get_preguntas_frecuentes():
    
    faqs = service_materia.obtener_preguntas_frecuentes()

    return faqs

@app.post("/upload")
async def upload_files(
    files: List[UploadFile] = File(...),
    description: str = Form(None)
):
    for file in files:
        contents = await file.read()
        # Aquí guardas o procesas el archivo
        with open(f"./uploads/{file.filename}", "wb") as f:
            f.write(contents)
    return {"message": "Archivos recibidos"}


# @app.post("/contenido/upload")
# async def subir_contenido(
#     contenido: str = Form(...),
#     materia: str = Form(...),
#     semestre: str = Form(...),
#     archivo: UploadFile = File(...)
# ):
#     carpeta_destino = "archivos_subidos"
#     os.makedirs(carpeta_destino, exist_ok=True)

#     ruta_archivo = os.path.join(carpeta_destino, archivo.filename)
#     with open(ruta_archivo, "wb") as buffer:
#         shutil.copyfileobj(archivo.file, buffer)

#     return JSONResponse(content={
#         "mensaje": "Contenido subido exitosamente",
#         "archivo": archivo.filename,
#         "materia": materia,
#         "semestre": semestre,
#         "contenido": contenido
#     })

