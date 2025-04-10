import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_4VE6e6rKxVeaZO3Tf1bitq3cBLIlSr5U1qw82tGCp46uJwWeP5cyD0jngBEyyvgu';
import { TheCatAPI } from '@thatapicompany/thecatapi';

const select = document.querySelector('.breed-select');
const list = document.querySelector('.cat-info');
select.addEventListener('submit', onSelect);

function onSelect(evt) {
  evt.preventDefault();
  console.log(evt.currentTarget.elements);
  const { name, description, temperament } = evt.currentTarget.elements;
  fetchBreeds(name.value, description.value, temperament.value)
    .then(data => (list.innerHTML = createMarkup(data)))
    .catch(err => console.log(err));
}

function fetchBreeds(id) {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const API_KEY = 'ce2cb9b2a3da414bb5b172546231704';
  // const params = new URLSearchParams({
  //   key: API_KEY,
  // breed_ids: this.selected_breed.id,
  // });

  return fetch(`${BASE_URL}/breeds/search?key=${API_KEY}&name=${id}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`HTTP помилка! статус: ${resp.status}`);
      }
      console.log(resp);
      return resp.json();
    })
    .then(data => {
      console.log(data);
      if (data.lenght === 0) {
        console.log(`Породи з іменем "${id}" не знайдено.`);
        alert(`Породи з іменем "${id}" не знайдено.`);
      } else {
        console.log(`Знайдено породи:`, data);
      }
      return data;
    })
    .catch(err => {
      console.log('Помилка під час виконання fetchBreeds:', err);
    });
}
fetchBreeds('abys');

function createMarkup(arr) {
  // return
  const markup = arr
    .map(
      cat => `<li>
       <img src="${icon}" alt="${text}">
    <h2>${cat.name}</h2>
    <p>${cat.description}</p>
    <p>${cat.temperament}</p>
</li>`
    )
    .join('');
  // list.innerHTML = markup;
}
