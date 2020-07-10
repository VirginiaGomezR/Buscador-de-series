'use strict';
//Filtrar contenido por name e image(medium)

//emptyImage
const emptyImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let filteredData = []; // Es un array pq filtramos los datos de data, que es otro array.
const seriesContentFilter = (data) => {
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
  }

  return filteredData;
};

//Pintar lista de series

const paintList = () => {
  //Seleccionar el elemnto donde poner la informacion ---> ul
  const list = document.querySelector('.js-list');

  for (const item of filteredData) {
    //creamos los elementos de la lista
    const li = document.createElement('li');

    const serieName = document.createElement('h3');
    serieName.classList.add('name');
    const seriePicture = document.createElement('img');
    seriePicture.classList.add('image');

    serieName.innerHTML = item.name;
    seriePicture.innerHTML = item.image;
    //para las imágenes vacías metemos una fake image
    if (item.image === null) {
      seriePicture.src = emptyImage;
    } else {
      seriePicture.src = item.image.medium;
    }
    seriePicture.alt = 'Imagen de serie';

    //Añadimos los elementos al ul
    list.appendChild(li);
    li.appendChild(serieName);
    li.appendChild(seriePicture);
    li.addEventListener('click', paintFavouriteList);
  }
  // console.log(filteredData);
};

//Pintar lista de series favoritas
function paintFavouriteList(ev) {
  const list = document.querySelector('.js-favourites-list');
  list.innerHTML += ev.currentTarget.innerHTML;
}

//Llamar a la API

const SearchButton = document.querySelector('.js__search--button');

const getSeriesFromApi = () => {
  const seriename = document.querySelector('.js-input').value;
  fetch(`http://api.tvmaze.com/search/shows?q=${seriename}`)
    .then((response) => response.json())
    .then((data) => seriesContentFilter(data)) //respuesta filtrada
    .then((dataFiltered) => paintList());
};

SearchButton.addEventListener('click', getSeriesFromApi);
