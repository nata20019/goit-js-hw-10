import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_4VE6e6rKxVeaZO3Tf1bitq3cBLIlSr5U1qw82tGCp46uJwWeP5cyD0jngBEyyvgu';

const BASE_URL = 'https://api.thecatapi.com/v1';
const select = document.querySelector('.breed-select');
const error = document.querySelector('.error');

export function fetchCatByBreed(breedId) {
  return axios(`${BASE_URL}/images/search?breed_ids=${breedId}`);
}

export function fetchBreeds() {
  return axios(`${BASE_URL}/breeds`);
}

function addOptionsToSelect(breeds) {
  select.innerHTML = '';
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    // console.log(option.value);
    option.text = breed.name;
    // console.log(option.text);
    select.add(option);
  });
}

fetchCatByBreed()
  .then(({ data }) => {
    // console.log(data);
    if (data.length === 0) {
      error.removeAttribute('hidden');
      select.removeAttribute('hidden');
      return;
    }
    error.setAttribute('hidden', true);
    return data;
  })
  .catch();

fetchBreeds()
  .then(({ data }) => {
    // console.log(data);
    if (data.length === 0) {
      alert(`Пород не знайдено.`);
    } else {
      addOptionsToSelect(data);
    }
    return data;
  })
  .catch(err => {
    console.log('Помилка під час виконання fetchBreeds:', err);
    error.removeAttribute('hidden');
  });
