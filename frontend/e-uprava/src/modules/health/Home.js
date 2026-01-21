import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome 👋</h1>
        <p className="text-gray-600">Choose a management system</p>

        <div className="flex gap-6 justify-center">
          <button
            onClick={() => navigate('/health/allergies')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Health
          </button>

          <button
            onClick={() => navigate('/kindergarten')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
          >
            Kindergarten
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
