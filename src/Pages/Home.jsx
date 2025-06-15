import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Home(){
  const navigate = useNavigate();

  const handleGame = () => {
      navigate('/mapa');
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
  <Header></Header>
  <div
    className="flex-grow w-full flex flex-col items-center justify-center p-4 relative bg-cover bg-center"
    style={{ backgroundImage: `url('/bghome2.jpg')` }}
  >
    {/* Overlay para mejorar la legibilidad del texto sobre la imagen de fondo */}
    <div className="absolute inset-0 bg-black opacity-20"></div>

    <div className="relative z-10 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 drop-shadow-lg leading-tight">
        Bienvenido a <span className="text-green-400">NutriVerdad</span> 🥦
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl text-white font-bold mb-8 drop-shadow-md max-w-2xl">
        ¡Explora niveles y descubre verdades sorprendentes sobre la nutrición!
      </p>
      <button
        onClick={handleGame}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75 text-2xl"
      >
        EMPEZAR
      </button>
    </div>
  </div>
</div>
  );
}

export default Home;