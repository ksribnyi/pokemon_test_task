import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit: number = 151) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/pokemon`, {
      params: { limit },
    });
    return data.results;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    return [];
  }
};

export const getPokemonSprite = async (
  selectedPokemon: { name: string; url: string }[]
) => {
  const images: { [key: string]: string } = {};

  await Promise.all(
    selectedPokemon.map(async (pokemon) => {
      try {
        const response = await axios.get(pokemon.url);
        images[pokemon.name] =
          response.data.sprites.other['official-artwork'].front_default;
      } catch (error) {
        console.error(`Error fetching image for ${pokemon.name}`, error);
        images[pokemon.name] = '';
      }
    })
  );

  return images;
};
