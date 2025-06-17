import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../Auth/authService';

function Nivel() {
  const { id: nivel } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [retroalimentacion, setRetroalimentacion] = useState('');

  const preguntas = {
    1: {
      texto: '¿Qué alimento típico de Arequipa es rico en vitamina C y ayuda a mejorar la absorción de hierro?',
      opciones: ['Camu camu', 'Cebolla y rocoto en el escabeche', 'Papa con queso'],
      correcta: 'Cebolla y rocoto en el escabeche',
      retro: 'La vitamina C (ácido ascórbico) en estos ingredientes actúa como cofactor en la absorción de hierro no hemo (presente en vegetales), reduciendo el Fe³⁺ a Fe²⁺ para su transporte intestinal.',
    },
    2: {
      texto: '¿Qué plato típico del Perú es rico en proteínas y bajo en grasas?',
      opciones: ['Anticucho', 'Cebiche de pescado', 'Pollo a la brasa'],
      correcta: 'Cebiche de pescado',
      retro: 'El pescado tiene proteínas completas y bajo contenido en grasas saturadas, ideal para una dieta saludable.',
    },
    3: {
      texto: 'Caso: Juanito tiene 9 meses y está muy delgado, con piel pálida y cabello sin brillo. Su mamá dice que come poco y solo papas. ¿Qué le falta en su alimentación?',
      opciones: [
        'Más frutas y verduras para vitaminas y minerales',
        'Solo más papas para energía',
        'Solo leche para crecer',
      ],
      correcta: 'Más frutas y verduras para vitaminas y minerales',
      retro: 'Juanito presenta signos de deficiencia de micronutrientes esenciales como vitamina A, C y hierro. Las papas solo aportan energía pero no suficientes vitaminas ni proteínas.',
    },
    4: {
      texto: 'Pedro es un niño que siempre está cansado,se enferma seguido y su rendimiento en la escuela a bajado ¿Qué nutriente puede estar faltando?',
      opciones: [
        'Hierro y proteínas para formar sangre y músculos',
        'Solo azúcar para tener energía',
        'Solo grasas para engordar',
      ],
      correcta: 'Hierro y proteínas para formar sangre y músculos',
      retro: 'La falta de hierro y proteínas afecta la formación de hemoglobina (que transporta oxígeno) y el desarrollo muscular, causando cansancio y mayor riesgo de infecciones.',
    },
    5: {
      texto: 'Luis entrena mucho en el gimnasio y siempre cree que está muy delgado, aunque tiene mucha musculatura. Come muchas proteínas y usa suplementos, pero nunca está satisfecho con su cuerpo. ¿Qué trastorno puede tener?',
      opciones: ['Vigorexia', 'Bulimia', 'Anorexia'],
      correcta: 'Vigorexia',
      retro: 'Vigorexia: La persona tiene una percepción distorsionada de su cuerpo, obsesionándose con aumentar masa muscular. Su dieta alta en proteínas y suplementos puede causar desequilibrios nutricionales, como deficiencias en grasas esenciales y vitaminas liposolubles, afectando el sistema nervioso y hormonal.',
    },
    6: {
      texto: 'Ana se salta comidas el día que irá a una discoteca porque argumenta que el alcohol tiene muchas calorías y ella no quiere engordar. ¿Qué trastorno alimenticio puede estar presentando?',
      opciones: ['Alcoholexia', 'Bulimia', 'Vigorexia'],
      correcta: 'Alcoholexia',
      retro: 'Alcoholexia: Es la combinación de restricción alimentaria y consumo excesivo de alcohol para controlar el peso. Esto provoca deficiencias nutricionales graves, ya que el alcohol interfiere con la absorción y metabolismo de nutrientes esenciales, agravando la desnutrición.',
    },
    7: {
      texto: 'Un paciente mayor estuvo hospitalizado y recibió antibióticos por una infección. Después presentó diarrea frecuente y dolor abdominal. Se detectó infección por *Clostridium difficile*. ¿Qué pasó con su microbiota intestinal?',
      opciones: [
        'Los antibióticos alteraron la microbiota normal, permitiendo que C. difficile creciera en exceso',
        'Los antibióticos fortalecieron la microbiota y eliminaron las bacterias malas',
        'La microbiota no se afecta con antibióticos'
      ],
      correcta: 'Los antibióticos alteraron la microbiota normal, permitiendo que C. difficile creciera en exceso',
      retro: 'Los antibióticos pueden destruir bacterias beneficiosas que mantienen el equilibrio intestinal, permitiendo que *C. difficile* prolifere y cause diarrea. La microbiota normal ayuda a digerir alimentos, sintetizar vitaminas y proteger contra patógenos.',
    },
    8: {
      texto: 'María, una mujer de 60 años con pérdida de peso reciente, necesita aumentar su ingesta de proteínas para conservar masa muscular. ¿Cuál es la cantidad recomendada de proteínas por kg de peso?',
      opciones: ['0,5 g/kg', '1,2 a 1,5 g/kg', '3 g/kg'],
      correcta: '1,2 a 1,5 g/kg',
      retro: 'Las proteínas recomendadas en pacientes con pérdida de masa muscular o enfermedad crónica son 1,2-1,5 g/kg para favorecer la reparación y mantenimiento muscular.',
    },
    9: {
      texto: 'Una persona con diabetes debe controlar su ingesta de carbohidratos para mantener niveles adecuados de glucosa. ¿Qué tipo de carbohidratos debe preferir?',
      opciones: [
        'Azúcares simples (dulces, refrescos)',
        'Carbohidratos complejos y fibra (quinua, verduras)',
        'Solo proteínas y grasas',
        'Almidones refinados (pan blanco, arroz blanco)',
        'Evitar todos los carbohidratos'
      ],
      correcta: 'Carbohidratos complejos y fibra (quinua, verduras)',
      retro: 'Los carbohidratos complejos y la fibra se digieren lentamente, ayudando a controlar la glucosa en sangre, fundamental en diabetes.',
    },
    10: {
      texto: '¿Cuál es la mejor forma de prevenir la infección por *Ascaris lumbricoides* (lombriz intestinal)?',
      opciones: [
        'Comer frutas y verduras sin lavar',
        'Cocinar bien las carnes y lavar bien frutas y verduras antes de consumirlas',
        'Beber agua directamente del grifo',
        'No lavarse las manos antes de comer',
        'Evitar el consumo de lácteos'
      ],
      correcta: 'Cocinar bien las carnes y lavar bien frutas y verduras antes de consumirlas',
      retro: 'Cocinar bien los alimentos y lavar adecuadamente frutas y verduras elimina huevos y larvas de *Ascaris lumbricoides*, evitando su ingestión.',
    },
    11: {
      texto: '¿Qué práctica ayuda a prevenir la infección por *Giardia lamblia* (diarrea acuosa con olor desagradable que puede durar semanas)?',
      opciones: [
        'Beber agua hervida o clorada y lavar bien las frutas y verduras antes de consumirlas',
        'Comer alimentos sin lavar',
        'No lavarse las manos antes de comer',
        'Consumir alimentos en la calle sin precaución',
        'Evitar la actividad física'
      ],
      correcta: 'Beber agua hervida o clorada y lavar bien las frutas y verduras antes de consumirlas',
      retro: 'Los quistes de *Giardia* son muy resistentes. La mejor prevención es hervir el agua y lavar correctamente los alimentos crudos para evitar su ingestión.',
    },
    12: {
      texto: '¿Cuál es una medida importante para prevenir la transmisión de parásitos en general, como *Trichuris trichiura*?',
      opciones: [
        'Lavarse las manos con agua y jabón antes de comer y después de ir al baño',
        'No cocinar los alimentos',
        'Evitar beber agua hervida',
        'Compartir utensilios sin lavar',
        'Comer solo alimentos procesados'
      ],
      correcta: 'Lavarse las manos con agua y jabón antes de comer y después de ir al baño',
      retro: 'El lavado de manos con agua y jabón interrumpe la transmisión fecal-oral de parásitos como *Trichuris*, fundamental para la prevención.',
    },
    13: {
      texto: 'Un restaurante en Cusco prepara leche para postres. ¿Qué proceso debe aplicar para eliminar microorganismos patógenos sin perder muchas vitaminas?',
      opciones: [
        'Hervir la leche por 30 minutos',
        'Pasteurizarla entre 62 °C y 85 °C por tiempo corto',
        'Congelarla a -18 °C',
        'Guardarla a temperatura ambiente',
        'No hacer ningún tratamiento'
      ],
      correcta: 'Pasteurizarla entre 62 °C y 85 °C por tiempo corto',
      retro: 'La pasteurización es un tratamiento térmico suave que elimina patógenos sin destruir muchas vitaminas, ideal para leche y derivados.',
    },
    14: {
      texto: 'Pobladores de la sierra peruana, sin acceso a refrigeración eléctrica, necesitan conservar carne de alpaca y trucha. ¿Qué técnica tradicional es la más efectiva?',
      opciones: [
        'Enterrar la carne en hoyos cubiertos con hojas.',
        'Cocinar la carne y el pescado hasta que estén muy secos y guardarlos en cuevas frías.',
        'Realizar la salazón y deshidratación al sol para producir charqui y pescado seco.',
        'Sumergir la carne en aceite de animal durante semanas.',
        'Ahumarla en ambientes cerrados con madera húmeda.'
      ],
      correcta: 'Realizar la salazón y deshidratación al sol para producir charqui y pescado seco.',
      retro: 'La salazón y la deshidratación reducen la actividad de agua (aw), impidiendo el crecimiento de bacterias. Son métodos tradicionales eficaces sin necesidad de refrigeración.',
    },
  };

  const pregunta = preguntas[nivel];

  useEffect(() => {
    const fetchUser = async () => {
      const usuario = await getUser();
      setUser(usuario);
      if (parseInt(nivel) > usuario.nivel) {
        navigate('/mapa'); // Redirige si intenta acceder a un nivel bloqueado
      }
    };
    fetchUser();
  }, [nivel, navigate]);

  const verificarRespuesta = async () => {
    if (!respuesta) return;

    const esCorrecta = respuesta === pregunta.correcta;
    if (esCorrecta) {
      setRetroalimentacion(pregunta.retro);
      setShowModal(true);
      if (parseInt(nivel) === user.nivel) {
        await axios.patch(
          'https://backnutriverdad.onrender.com/api/user/nivel',
          { nivel: parseInt(nivel) + 1 },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
      }
    } else {
      setMensaje('❌ Respuesta incorrecta. Intenta de nuevo.');
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      <div className="flex-grow bg-green-50 flex flex-col justify-center items-center p-4 md:p-8">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 w-full max-w-md lg:max-w-lg">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-green-700 mb-6 drop-shadow-sm">
            Nivel {nivel}
          </h2>
          <p className="text-xl md:text-2xl text-gray-800 mb-8 text-center font-semibold leading-relaxed">
            {pregunta.texto}
          </p>

          <div className="flex flex-col gap-4 mb-6">
            {pregunta.opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => setRespuesta(opcion)}
                className={`w-full py-3 px-6 rounded-lg text-lg font-bold shadow-md transition-all duration-300 ease-in-out transform
                  ${
                    respuesta === opcion
                      ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 active:scale-95 focus:ring-green-300'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105 active:scale-95 focus:ring-gray-300'
                  }
                  focus:outline-none focus:ring-4 focus:ring-opacity-75`}
              >
                {opcion}
              </button>
            ))}
          </div>

          <button
            onClick={verificarRespuesta}
            className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 font-bold text-xl shadow-lg transform transition duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75"
          >
            Verificar
          </button>

          {mensaje && (
            <p className="text-red-600 font-medium mt-6 text-center text-lg">
              {mensaje}
            </p>
          )}
        </div>

        {/* Modal de respuesta correcta */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-11/12 max-w-sm md:max-w-md text-center shadow-2xl">
              <h2 className="text-3xl font-bold text-green-700 mb-4 flex items-center justify-center gap-2">
                <span className="text-4xl">✅</span> ¡Respuesta correcta!
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                {retroalimentacion}
              </p>
              <button
                onClick={() => navigate('/mapa')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold text-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75"
              >
                Continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nivel;
