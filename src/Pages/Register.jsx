import { useState } from 'react';
import { register } from '../Auth/authService';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(nombre, email, password);
      alert('Registro exitoso. Ahora inicia sesión.');
      navigate('/login');
    } catch (error) {
      alert('Registro fallido. Verifica los campos o intenta con otro correo.');
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row">
      {/* LADO IZQUIERDO: Bienvenida y Logo */}
      <div 
        className="w-full md:w-3/5 h-1/2 md:h-full flex items-center justify-center p-8 bg-cover bg-center relative" 
        style={{ backgroundImage: `url('/bglogo.jpg')`}}
      >
        {/* Overlay para mejor contraste del texto */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <h1 className= "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-xl leading-tight">
            UNETE A NUESTRA <span className="text-green-400">COMUNIDAD</span>
          </h1>
          <img
            src="/app.png"
            alt="Logo de NutriVerdad"
            className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain rounded-full shadow-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* LADO DERECHO: Formulario de Autenticación */}
      <div 
        className="w-full md:w-2/5 h-1/2 md:h-full flex items-center justify-center p-8 relative" 
        style={{ backgroundImage: `url('/bgauth.png')`}}
      >
        {/* Overlay opcional para la imagen de fondo si es muy prominente */}
        <div className="absolute inset-0 bg-white opacity-20 md:opacity-0"></div>
        <div className="relative z-10 bg-white bg-opacity-95 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md backdrop-blur-sm">
          <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
            Crear Cuenta
          </h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-green-400 shadow-sm transition duration-200"
              required
            />
            <input
              type="email"
              placeholder="Correo"
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
              className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-xl shadow-lg transform transition duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75">
              Registrarse
            </button>
          </form>
          <p className="text-md text-center mt-6 text-gray-700">
            <a
              href="/"
              className="text-green-600 hover:text-green-800 hover:underline font-semibold transition duration-200"
            >
              Volver
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
