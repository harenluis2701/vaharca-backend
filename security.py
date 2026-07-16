from passlib.context import CryptContext

# Configuramos bcrypt como nuestro algoritmo de encriptación
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str):
    """Toma una contraseña en texto plano y devuelve el Hash seguro"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    """Compara una contraseña de login con el Hash guardado en la BD"""
    return pwd_context.verify(plain_password, hashed_password)