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
    { id: 5, fruta: '/levels/lvl1.png' },
    { id: 6, fruta: '/levels/lvl2.png' },
    { id: 7, fruta: '/levels/lvl3.png' },
    { id: 8, fruta: '/levels/lvl4.png' },
    { id: 9, fruta: '/levels/lvl1.png' },
    { id: 10, fruta: '/levels/lvl2.png' },
    { id: 11, fruta: '/levels/lvl3.png' },
    { id: 12, fruta: '/levels/lvl4.png' },
    { id: 13, fruta: '/levels/lvl1.png' },
    { id: 14, fruta: '/levels/lvl2.png' },
  ];

  return (
  <div className="w-screen h-screen flex flex-col overflow-hidden font-sans">
  {/* Header fijo */}
  <div className="fixed top-0 left-0 w-full z-50 shadow-md"> {/* Añadido bg-white y shadow para el header */}
    <Header />
  </div>

  {/* Contenedor desplazable con imagen de fondo y overlay */}
  <div
    className="flex-1 mt-20 overflow-y-auto relative p-4 md:p-8 lg:p-12 text-center"
    style={{
      backgroundImage: `url(/bghome2.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', /* La imagen de fondo se mantiene fija al hacer scroll */
    }}
  >
    {/* Overlay para oscurecer y desenfocar la imagen de fondo */}


    {/* Contenido principal sobre el overlay, asegurando el z-index */}
    <div className="relative z-10">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"> {/* Texto blanco y sombra para resaltar */}
        Mapa NutriVerdad
      </h1>
      <p className="text-lg md:text-xl text-gray-200 mb-8 font-medium"> {/* Texto gris claro para contraste suave */}
        ¡Hola <span className="text-lime-600 font-bold">{user?.nombre || 'Explorador'}</span>!
      </p>

      {/* Contenedor de la cuadrícula de niveles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl w-full justify-items-center mx-auto p-6 bg-white bg-opacity-20 rounded-2xl shadow-xl"> {/* Fondo blanco semitransparente */}
        {niveles.map((nivelItem) => {
          const desbloqueado = user && nivelItem.id <= user.nivel;
          const esNivelActual = user && nivelItem.id === user.nivel;

          return (
            <button
              key={nivelItem.id}
              onClick={() => desbloqueado && navigate(`/nivel/${nivelItem.id}`)}
              disabled={!desbloqueado}
              className={`
                flex flex-col items-center justify-center p-4
                w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48
                rounded-full shadow-xl transition-all duration-300 ease-in-out transform
              
                ${desbloqueado
                  ? 'hover:scale-105 active:scale-95 cursor-pointer'
                  : 'cursor-not-allowed opacity-70 filter grayscale'
                }
              
                ${esNivelActual
                  ? 'bg-white border-green-700 text-green-900 shadow-2xl ring-4 ring-green-500 ring-opacity-70'
                  : desbloqueado
                  ? 'bg-white text-green-800'
                  : 'bg-gray-300 text-gray-500'
                }
              
                focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75
              `}
            >
              <img
                src={nivelItem.fruta}
                alt={`Nivel ${nivelItem.id}`}
                className="
                  w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
                  object-contain rounded-full shadow-inner mb-2
                "
              />
              <span className="text-md md:text-lg font-bold text-gray-800">
                Nivel {nivelItem.id}
              </span>
            </button>
          );
        })}
      </div>

      {/* Botón de volver */}
      <div className="mt-10"> {/* Contenedor para el botón de volver para mejor espaciado */}
        <a
          href="/home"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Volver
        </a>
      </div>
    </div>
  </div>
</div>
);

}

export default Mapa;
