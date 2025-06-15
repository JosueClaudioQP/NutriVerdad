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
      texto: '¿El desayuno es la comida más importante del día?',
      correcta: 'verdadero',
      retro: 'El desayuno activa el metabolismo y mejora la concentración.',
    },
    2: {
      texto: '¿Los carbohidratos deben evitarse completamente?',
      correcta: 'falso',
      retro: 'Los carbohidratos complejos proporcionan energía esencial para el cuerpo.',
    },
    3: {
      texto: '¿Las frutas contienen muchas vitaminas y fibra?',
      correcta: 'verdadero',
      retro: 'Las frutas son ricas en vitaminas, antioxidantes y fibra.',
    },
    4: {
      texto: '¿Beber agua solo es importante cuando tienes sed?',
      correcta: 'falso',
      retro: 'Es importante hidratarse regularmente, no solo cuando sientes sed.',
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

    const esCorrecta = respuesta.toLowerCase() === pregunta.correcta;
    if (esCorrecta) {
      setRetroalimentacion(pregunta.retro);
      setShowModal(true);
      if (parseInt(nivel) === user.nivel) {
        await axios.patch(
          'http://localhost:8080/api/user/nivel',
          { nivel: parseInt(nivel) + 1 },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      }
    } else {
      setMensaje('❌ Respuesta incorrecta. Intenta de nuevo.');
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
  {/* Assuming Header is a component defined elsewhere and passed in */}

  <div className="flex-grow bg-green-50 flex flex-col justify-center items-center p-4 md:p-8">
    <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 w-full max-w-md lg:max-w-lg">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-green-700 mb-6 drop-shadow-sm">
        Nivel {nivel}
      </h2>
      <p className="text-xl md:text-2xl text-gray-800 mb-8 text-center font-semibold leading-relaxed">
        {pregunta.texto}
      </p>

      <div className="flex flex-col gap-4 mb-6">
        <button
          onClick={() => setRespuesta('verdadero')}
          className={`w-full py-3 px-6 rounded-lg text-lg font-bold shadow-md transition-all duration-300 ease-in-out transform
            ${
              respuesta === 'verdadero'
                ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 active:scale-95 focus:ring-green-300'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105 active:scale-95 focus:ring-gray-300'
            }
            focus:outline-none focus:ring-4 focus:ring-opacity-75`}
        >
          Verdadero
        </button>
        <button
          onClick={() => setRespuesta('falso')}
          className={`w-full py-3 px-6 rounded-lg text-lg font-bold shadow-md transition-all duration-300 ease-in-out transform
            ${
              respuesta === 'falso'
                ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 active:scale-95 focus:ring-green-300'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105 active:scale-95 focus:ring-gray-300'
            }
            focus:outline-none focus:ring-4 focus:ring-opacity-75`}
        >
          Falso
        </button>
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

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-transparent bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-out">
        <div className="bg-white rounded-2xl p-8 w-11/12 max-w-sm md:max-w-md text-center shadow-2xl relative transform scale-95 opacity-0 animate-scaleIn">
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