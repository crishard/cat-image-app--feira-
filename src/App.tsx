import { useState } from 'react';

const API_URL = 'https://api.thecatapi.com/v1/images/search?size=full';

interface AnimalImage {
  id: string;
  url: string;
}

function App() {
  const [image, setImage] = useState<AnimalImage | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchImage = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setImage(data[0]);
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Conexão fofa ao backend</h1>
      <button
        onClick={fetchImage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
        disabled={loading}
      >
        {loading ? 'carregando...' : 'Nova imagem'}
      </button>
      {image && (
        <div className="mt-8">
          <img
            src={image.url}
            alt="Random cat"
            className="max-w-full h-auto rounded-lg shadow-lg"
            style={{ maxHeight: '60vh' }}
          />
        </div>
      )}
    </div>
  );
}

export default App;

