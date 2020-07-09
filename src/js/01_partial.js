/* Llamar a la API y filtrar contenido*/
'use strict';

//Filtrar contenido por name e image(medium)

const seriesContentFilter = (data) => {
  let filteredData = []; // Es un array pq filtramos los datos de data, que es otro array.

  // Bucle que recorre data (es la respuesta de la promesa convertida en json)
  for (const item of data) {
    // Es la variable que recoge los campos que nos interesan de item.
    // Item es cada una de las series.
    let filteredItem = {
      name: item.show.name,
      image: item.show.image,
    };

    // Añadir al final del array filteredItem, que son los campo filtrados de item
    filteredData.push(filteredItem);
    console.log(filteredItem);
  }

  return filteredData;
};

//Llamar a la API

const SearchButton = document.querySelector('.js__search--button');

const getSeriesFromApi = () => {
  const seriename = document.querySelector('.js-input').value;
  fetch(`http://api.tvmaze.com/search/shows?q=${seriename}`)
    .then((response) => response.json())
    .then((data) => seriesContentFilter(data)); //respuesta filtrada
};

SearchButton.addEventListener('click', getSeriesFromApi);
