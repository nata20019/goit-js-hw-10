import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_4VE6e6rKxVeaZO3Tf1bitq3cBLIlSr5U1qw82tGCp46uJwWeP5cyD0jngBEyyvgu';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchCatByBreed(breedId) {
  return axios(`${BASE_URL}/images/search?breed_ids=${breedId}`);
}

export function fetchBreeds() {
  return axios(`${BASE_URL}/breeds`);
}
