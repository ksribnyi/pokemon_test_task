import React, { useEffect, useState } from 'react';
import placeholder from '../assets/who_is_that_pokemon_placeholder.jpg';
import { getPokemonSprite } from '../api/pokemonApi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPokemon: { name: string; url: string }[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedPokemon }) => {
  const [pokemonImages, setPokemonImages] = useState<{ [key: string]: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const images = await getPokemonSprite(selectedPokemon);
        setPokemonImages(images);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [isOpen, selectedPokemon]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-lg font-bold mb-4">Your Pokemon Team</h2>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {selectedPokemon.map((pokemon) => (
              <div key={pokemon.name} className="flex flex-col items-center">
                <img
                  src={pokemonImages[pokemon.name] || placeholder}
                  alt={pokemon.name}
                  className="w-24 h-24 object-contain"
                />
                <p>{pokemon.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
