# gemini_service.py
import google.generativeai as genai
import json
import traceback

def generar_leccion_ia(api_key: str, tema: str, nivel: str, tipo: str):
    """
    Genera una lección usando Gemini (SIEMPRE usa gemini-pro)
    """
    try:
        print(f"📝 Generando lección: {tema} - {nivel} - {tipo}")
        
        # Configurar Gemini
        genai.configure(api_key=api_key)
        

       # IMPORTANTE: Usar el modelo actualizado
        MODELO = 'gemini-flash-latest'
        print(f"🔍 Usando modelo: {MODELO}")
        
        model = genai.GenerativeModel(MODELO)
        
        prompt = f"""
        Eres un tutor experto de la plataforma educativa Vaharca.
        Genera una lección sobre "{tema}" para nivel "{nivel}" en el área de "{tipo}".
        
        IMPORTANTE: Responde SOLO con un objeto JSON válido, sin texto adicional.
        
        Formato EXACTO:
        {{
            "titulo": "Título atractivo de la lección",
            "teoria": "Explicación clara y detallada del tema adaptada al nivel {nivel}",
            "ejemplo_practico": "Un ejemplo concreto aplicado al tema",
            "reto": "Un ejercicio o desafío para que el estudiante practique",
            "preguntas_evaluacion": [
                {{
                    "id": 1,
                    "pregunta": "Primera pregunta de opción múltiple",
                    "opciones": ["Opción A", "Opción B", "Opción C", "Opción D"],
                    "respuesta_correcta": "Opción A"
                }},
                {{
                    "id": 2,
                    "pregunta": "Segunda pregunta de opción múltiple",
                    "opciones": ["Opción A", "Opción B", "Opción C", "Opción D"],
                    "respuesta_correcta": "Opción B"
                }}
            ]
        }}
        
        Asegúrate de que el JSON sea válido y tenga todas las llaves requeridas.
        """
        
        print("📤 Enviando petición a Gemini...")
        response = model.generate_content(prompt)
        
        print("📥 Respuesta recibida")
        
        # Limpiar la respuesta
        texto_respuesta = response.text.strip()
        
        # Quitar bloques de código si existen
        if texto_respuesta.startswith("```json"):
            texto_respuesta = texto_respuesta.split("```json")[1].split("```")[0].strip()
        elif texto_respuesta.startswith("```"):
            texto_respuesta = texto_respuesta.split("```")[1].split("```")[0].strip()
        
        # Parsear JSON
        try:
            datos = json.loads(texto_respuesta)
            print("✅ JSON parseado correctamente")
            return datos
        except json.JSONDecodeError as e:
            print(f"❌ Error parseando JSON: {e}")
            return {
                "error": "La IA no devolvió JSON válido",
                "detalle": str(e),
                "respuesta_cruda": texto_respuesta[:500]
            }
            
    except Exception as e:
        print(f"❌ Error: {type(e).__name__}: {e}")
        traceback.print_exc()
        return {
            "error": "Error al generar la lección",
            "detalle": str(e),
            "tipo_error": type(e).__name__
        }