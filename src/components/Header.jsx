import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../Auth/authService";

function Header(){
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      async function fetchUser() {
        try {
          const u = await getUser();
          setUser(u);
        } catch (err) {
          console.error('Error al obtener usuario', err);
          navigate('/login');
        }
      }
      fetchUser();
    }, [navigate]);

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };

    return (
      <header
        className="h-20 md:h-24 lg:h-28 flex justify-between items-center px-4 bg-gray-900 bg-cover bg-center shadow-lg relative z-20" // Added bg-center and relative z-20
        style={{ backgroundImage: `url('/header.jpg')` }}
      >
        {/* Overlay para la imagen de fondo si es muy prominente, para asegurar legibilidad */}
        <div className="absolute inset-0 bg-black opacity-30"></div> {/* Slightly transparent overlay */}

        <div className="h-full flex items-center gap-4 relative z-10"> {/* Added relative z-10 */}
          <img
            src="app.png"
            alt="Logo Nutriverdad"
            className="h-12 w-12 md:h-16 md:w-16 object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-110" // Added hover effect
          />
          <div className="items-center justify-center">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white uppercase tracking-widest drop-shadow-lg text-center">
                NUTRI
              </h1>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white uppercase tracking-widest drop-shadow-lg text-center">
                VERDAD
              </h1>
          </div>
        </div>
        <div className="h-full flex items-center gap-4 relative z-10"> {/* Added relative z-10 */}
          <img
            src="user.png"
            alt="Usuario"
            className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-full shadow-lg border-2 border-white transform transition-transform duration-300 hover:scale-110" // Adjusted size, added border and hover effect
          />
          {user && (
            <span className="text-base md:text-lg text-white font-medium text-shadow-black drop-shadow"> {/* Added drop-shadow for better visibility */}
              {user.nombre}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-75"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>
    );
}

export default Header;