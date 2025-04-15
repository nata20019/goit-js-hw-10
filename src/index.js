import Notiflix from 'notiflix';
import { fetchCatByBreed, fetchBreeds } from './cat-api';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

select.addEventListener('change', onSelect);
Loading.remove();
Loading.dots();
function onSelect(evt) {
  evt.preventDefault();
  // console.log(evt.target.options);
  const currentIndexOption = evt.target.selectedIndex;
  const idCat = evt.target.options[currentIndexOption].value;
  // console.log(idCat);
  catInfo.innerHTML = '';
  // select.setAttribute('hidden', true);
  Loading.dots();
  loader.removeAttribute('hidden');
  fetchCatByBreed(idCat).then(data => {
    if (data.data.length === 0) {
      error.removeAttribute('hidden');
      select.setAttribute('hidden', true);
      Loading.remove();
      loader.setAttribute('hidden', true);
      return;
    }
    // console.log(data.data[0].breeds[0].description);
    // console.log(data);
    const { name, description, temperament } = data.data[0].breeds[0];
    const { url } = data.data[0];
    // console.log(name, '---', description, '---', temperament);
    Loading.remove();
    loader.setAttribute('hidden', true);
    select.removeAttribute('hidden');
    catInfo.innerHTML = createMarkup(name, description, temperament, url);
  });
}

fetchBreeds();

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

function createMarkup(name, description, temperament, url) {
  return `<div>
       <img src="${url}" alt="" width="400" height="300">
    <h2>${name}</h2>
    <p>${description}</p>
    <p>${temperament}</p>
</div>`;
}

fetchCatByBreed('abys');
// .then(({ data }) => {
//   // console.log(data);
//   if (data.length === 0) {
//     error.removeAttribute('hidden');
//     // select.removeAttribute('hidden');
//     return;
//   }
//   // error.setAttribute('hidden', true);
//   return data;
// })
// .catch();

fetchBreeds()
  .then(({ data }) => {
    console.log(data);
    if (data.length === 0) {
      alert(`Пород не знайдено.`);
    } else {
      addOptionsToSelect(data);
      select.removeAttribute('hidden');
      Loading.remove();
      loader.setAttribute('hidden', true);
    }
    return data;
  })
  .catch(err => {
    console.log('Помилка під час виконання fetchBreeds:', err);
    // error.removeAttribute('hidden');
  });
