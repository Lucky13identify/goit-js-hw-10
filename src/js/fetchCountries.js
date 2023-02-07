import Notiflix from 'notiflix';

export function fetchCountries(name) {
  let count = 0;
  console.log(count);
  let svgFlag = '';
  let nameCountry = '';
  let capital = '';
  let population = '';
  let languages = '';

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
    .then(smt => {
      if (count > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      smt.map(country => {
        svgFlag = country.flags.svg;
        nameCountry = country.name.common;
        capital = country.capital[0];
        population = country.population;
        languages = Object.values(country.languages);

        if (count === 1) {
          const list = document.querySelector('.country-list');

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
        } else if (count >= 2 && count <= 10) {
          const info = document.querySelector('.country-info');

          info.insertAdjacentHTML(
            'afterbegin',
            `<li><img src = "${svgFlag}" width="30px" height="100%"></img><p>${nameCountry}</p></li>`
          );
        } else if ((input.value = ' ')) {
        }
      });
    })

    .catch(() => {
      failureWindow();
    });
}

function failureWindow() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
