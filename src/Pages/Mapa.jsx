import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../Auth/authService';
import Header from '../components/Header';

function Mapa() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const usuario = await getUser();
        setUser(usuario);
      } catch (error) {
        console.error('No se pudo obtener el usuario:', error);
        navigate('/login');
      }
    }

    fetchUser();
  }, [navigate]);

  const niveles = [
    { id: 1, fruta: '/levels/lvl1.png' },
    { id: 2, fruta: '/levels/lvl2.png' },
    { id: 3, fruta: '/levels/lvl3.png' },
    { id: 4, fruta: '/levels/lvl4.png' },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
  {/* El componente Header se asume que está definido en otro lugar */}
  <Header></Header>

  <div className="flex-grow bg-gradient-to-br from-lime-100 to-green-100 flex flex-col items-center justify-center px-4 py-10 text-center relative z-0">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-800 mb-4 drop-shadow-md">
      Mapa NutriVerdad
    </h1>
    <p className="text-lg md:text-xl text-gray-700 mb-2 font-medium">
      ¡Hola {user?.nombre || 'Explorador'}!
    </p>
    <p className="text-lg md:text-xl text-gray-700 mb-8">
      Has desbloqueado hasta el nivel <span className="font-bold text-green-700">{user?.nivel || 0}</span>
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl w-full justify-items-center">
      {niveles.map((nivelItem) => {
        const desbloqueado = user && nivelItem.id <= user.nivel;
        const esNivelActual = user && nivelItem.id === user.nivel;

        return (
          <button
            key={nivelItem.id}
            onClick={() => desbloqueado && navigate(`/nivel/${nivelItem.id}`)}
            className={`flex flex-col items-center justify-center p-4
                        w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48
                        rounded-full shadow-xl transition-all duration-300 ease-in-out transform
                        ${
                          desbloqueado
                            ? 'hover:scale-105 active:scale-95 cursor-pointer'
                            : 'cursor-not-allowed opacity-70 filter grayscale' // Efecto de escala y filtro en gris para bloqueados
                        }
                        ${
                          esNivelActual
                            ? 'bg-white border-green-700 text-green-900 shadow-2xl ring-4 ring-green-500 ring-opacity-70' // Estilo para el nivel actual
                            : desbloqueado
                            ? 'bg-white text-green-800' // Estilo para niveles desbloqueados
                            : 'bg-gray-300 text-gray-500' // Estilo para niveles bloqueados
                        }
                        focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75`}
            disabled={!desbloqueado}
          >
            <img
              src={nivelItem.fruta}
              alt={`Nivel ${nivelItem.id}`}
              className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain rounded-full shadow-inner mb-2"
            />
            <span className="text-md md:text-lg font-bold text-gray-800">
              Nivel {nivelItem.id}
            </span>
          </button>
        );
      })}
    </div>
  </div>
</div>
  );
}

export default Mapa;
