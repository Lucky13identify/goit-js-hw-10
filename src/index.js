// 1. вынести в отдеьную функцию
// 2. прблема с языком
// 3 после каждого обновления инпута - обнули разметку

import './css/styles.css';
// import fetchCountries from "./fetchCountries";
// import debounce from "lodash.debounce";
// import Notiflix from "notiflix";

const DEBOUNCE_DELAY = 300;

let svgFlag = '';
let nameCountry = '';
let capital = '';
let population = '';
let languages = '';

const list = document.querySelector('.country-list');
const input = document.querySelector('#search-box');
const info = document.querySelector('.country-info');

input.addEventListener(
  'input',
  debounce(() => {
    fetchCountries(input.value.trim());
  }, DEBOUNCE_DELAY)
);

input.addEventListener('keydown', resetContainer);

let count = 0;

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?&fields=name,capital,population,flags,languages`
  )
    .then(array => array.json())
    .then(item => {
      item.forEach(() => {
        count += 1;
      });

      return item;
    })
    .then(smt =>
      smt.map(country => {
        svgFlag = country.flags.svg;
        nameCountry = country.name.common;
        capital = country.capital[0];
        population = country.population;
        languages = country.languages[0];

        if (count === 1) {
          createMarkupCountryInfo();
        } else if (count >= 2 && count <= 10) {
          createMarkupCountryList();
        } else if ((input.value = ' ')) {
        }
      })
    )
    .then(() => {
      if (count > 10) {
        infoWindow();
      }
    })
    .catch(() => {
      failureWindow();
    });
}

function resetContainer() {
  info.innerHTML = '';
  list.innerHTML = '';
  count = 0;
}

function createMarkupCountryList() {
  info.insertAdjacentHTML(
    'afterbegin',
    `<li><img src = "${svgFlag}" width="30px" height="100%"></img><p>${nameCountry}</p></li>`
  );
}

function createMarkupCountryInfo() {
  list.insertAdjacentHTML(
    'afterbegin',
    `<div class = "content"><img src="${svgFlag}" width="60px" height="100%">
      <p>${nameCountry}</p></div>
      <ul class="list">
        <li><span>Capital:</span>${capital}</li>
        <li><span>Population:</span>${population}</li>
        <li><span>Languages:</span>${languages}</li>
      </ul>`
  );
}

function infoWindow() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function failureWindow() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function emptyInput() {
  if ((input.value = ' ')) {
    console.log('ddd');
  }
}
