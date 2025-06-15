import { useState } from 'react';
import { login, getUser } from '../Auth/authService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      const user = await getUser();
      console.log('Usuario autenticado:', user);
      navigate('/home');
    } catch (error) {
      alert('Login fallido');
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row">
  {/* LADO IZQUIERDO: Bienvenida y Logo */}
  {/* En móviles (sin prefijo md:), ocupa el ancho completo (w-full) y la mitad de la altura (h-1/2). */}
  {/* En pantallas medianas y superiores (md:), ocupa el 3/5 del ancho (md:w-3/5) y la altura completa (md:h-full). */}
  <div
    className="w-full md:w-3/5 h-1/2 md:h-full flex items-center justify-center p-8 bg-cover bg-center relative"
    style={{ backgroundImage: `url('/bglogo.jpg')` }}
  >
    {/* Overlay para mejor contraste del texto */}
    <div className="absolute inset-0 bg-black opacity-40"></div>
    <div className="relative z-10 flex flex-col items-center justify-center text-center">
      {/* El tamaño del texto (text-4xl) se aplica en móviles y se escala para pantallas más grandes (md:text-5xl lg:text-6xl). */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-xl leading-tight">
        BIENVENIDO A <span className="text-green-400">NUTRIVERDAD</span>
      </h1>
      {/* El tamaño de la imagen (w-40 h-40) se aplica en móviles y se escala para pantallas más grandes. */}
      <img
        src="/app.png"
        alt="Logo de NutriVerdad"
        className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain rounded-full shadow-2xl transition-transform duration-300 hover:scale-105"
      />
    </div>
  </div>

  {/* LADO DERECHO: Formulario de Autenticación */}
  {/* En móviles, ocupa el ancho completo (w-full) y la mitad de la altura (h-1/2), apilándose debajo del lado izquierdo. */}
  {/* En pantallas medianas y superiores, ocupa el 2/5 del ancho (md:w-2/5) y la altura completa (md:h-full). */}
  <div
    className="w-full md:w-2/5 h-1/2 md:h-full flex items-center justify-center p-8 relative"
    style={{ backgroundImage: `url('/bgauth.png')` }}
  >
    {/* Overlay para la imagen de fondo: más opaco en móvil (opacity-20) y transparente en pantallas medianas y superiores (md:opacity-0). */}
    <div className="absolute inset-0 bg-white opacity-20 md:opacity-0"></div>
    <div className="relative z-10 bg-white bg-opacity-95 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md backdrop-blur-sm">
      <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
        Iniciar Sesión
      </h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        {/* Los inputs y botones tienen padding y tamaño de texto adecuados para móviles por defecto. */}
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-green-400 shadow-sm transition duration-200"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-green-400 shadow-sm transition duration-200"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-xl shadow-lg transform transition duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75"
        >
          Ingresar
        </button>
      </form>

      <p className="text-md text-center mt-6 text-gray-700">
        ¿No tienes cuenta?{' '}
        <a
          href="/register"
          className="text-green-600 hover:text-green-800 hover:underline font-semibold transition duration-200"
        >
          Regístrate aquí
        </a>
      </p>
    </div>
  </div>
</div>

  );
}

export default Login;
