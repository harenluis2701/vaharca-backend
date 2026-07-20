import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# 1. Cargar las contraseñas del archivo .env
load_dotenv()

# 2. Leer la URL directa si existe (en producción como Render o Supabase)
database_url = os.getenv("DATABASE_URL")

if database_url:
    # 3a. Usar la URL directa
    # Nota: A veces las URLs de Postgres empiezan con postgres:// en lugar de postgresql://
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql+pg8000://", 1)
    URL_BASE_DATOS = database_url
else:
    # 3b. Armar la URL desde variables individuales (entorno local)
    usuario = os.getenv("DB_USER")
    password = os.getenv("DB_PASSWORD")
    host = os.getenv("DB_HOST")
    puerto = os.getenv("DB_PORT")
    base_datos = os.getenv("DB_NAME")
    URL_BASE_DATOS = f"postgresql+pg8000://{usuario}:{password}@{host}:{puerto}/{base_datos}"

# 4. Crear el "motor" (engine) que se conecta a la base de datos
engine = create_engine(URL_BASE_DATOS)

# 5. Crear la fábrica de sesiones
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()