import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/';

export const pokemonApi = async(method, url) => {
  try {
    let apiUrl = '';
    url ? apiUrl = url : apiUrl = BASE_URL;

    const response = await axios({
      url,
      method,
    })
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Pokemon Data');
    throw error;
  }
}