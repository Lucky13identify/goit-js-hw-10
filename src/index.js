import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

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

function resetContainer() {
  info.innerHTML = '';
  list.innerHTML = '';
}
