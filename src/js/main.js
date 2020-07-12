'use strict';
const endpointSeries = 'http://api.tvmaze.com/search/shows?q=';
const emptyImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
const searchButton = document.querySelector('.js__search--button');
const resetButton = document.querySelector('.js-reset');

let series = [];
let favorites = [];

//LocalStorage
const setItemLocalStorage = () => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

//local storage: leer los datos

const getItemLocalStorage = () => {
  const savedFavorites = JSON.parse(localStorage.getItem('favorites'));

  if (savedFavorites !== null) {
    favorites = savedFavorites;
    console.log(favorites);
  }
};

const seriesContentFilter = (data) => {
  series = [];
  // Bucle que recorre data (es la respuesta de la promesa convertida en json)
  for (const item of data) {
    // Es la variable que recoge los campos que nos interesan de item.
    // Item es cada una de las series.
    let filteredItem = {
      name: item.show.name,
      image: item.show.image,
      id: item.show.id,
    };

    // Añadir al final del array filteredItem, que son los campo filtrados de item
    series.push(filteredItem);
  }
};

//Función manejadora

function handlerFavouriteList(ev) {
  savedFavourites(ev);
  paintFavouriteList();
}

//Funcion para guardar en favoritos
function savedFavourites(ev) {
  console.log(ev.currentTarget);
  const foundFavorite = favorites.find(
    (item) => item.id === parseInt(ev.currentTarget.id) // condición que compara el id clickado con el id en favoritos y devuelve el objeto de serie o undefinded
  );

  if (foundFavorite === undefined) {
    //no lo encuentra
    const dataSerie = series.find(
      (item) => item.id === parseInt(ev.currentTarget.id)
    ); //busca la información de ese id en el array de series y devuelve el objeto de serie o undefined
    if (dataSerie !== undefined) {
      //lo encuentra

      favorites.push(dataSerie);
      setItemLocalStorage();
    }
  }
}

//Funcion para eliminar favoritos

function deleteFavourites(ev) {
  favorites = favorites.filter(
    //machacamos el array de favoritos con todos los elementos menos el clickado
    (item) => item.id !== parseInt(ev.currentTarget.id)
  );
  setItemLocalStorage();
}

//Funcion para mostrar un listado de series
const paintList = () => {
  //Seleccionar el elemnto donde poner la informacion ---> ul

  const list = document.querySelector('.js-list');
  list.innerHTML = '';

  for (const item of series) {
    //creamos los elementos de la lista
    const li = document.createElement('li');
    const foundFavorite = favorites.find(
      (itemFavorite) => itemFavorite.id === item.id
    );
    if (foundFavorite !== undefined) {
      li.classList.add('background');
    }
    const serieName = document.createElement('h3');
    serieName.classList.add('js-name');
    const seriePicture = document.createElement('img');
    seriePicture.classList.add('js-image');

    li.setAttribute('id', item.id);
    serieName.innerHTML = item.name;
    seriePicture.innerHTML = item.image;

    //para las imágenes vacías metemos una fake image
    if (item.image === null) {
      seriePicture.src = emptyImage;
    } else {
      seriePicture.src = item.image.medium;
    }
    seriePicture.alt = 'Imagen de serie';

    //

    //Añadimos los elementos al ul
    list.appendChild(li);
    li.appendChild(serieName);
    li.appendChild(seriePicture);
    li.addEventListener('click', handlerFavouriteList);
  }
};

//Funcion pintar favoritos

function paintFavouriteList() {
  const list = document.querySelector('.js-favorites-list');
  list.innerHTML = '';

  for (const item of favorites) {
    const li = document.createElement('li');

    li.setAttribute('id', item.id);

    const serieName = document.createElement('h3');
    serieName.classList.add('js-name-favorites');
    const seriePicture = document.createElement('img');
    seriePicture.classList.add('js-image-favorites');
    const span = document.createElement('span');
    span.classList.add('js-delete');
    span.setAttribute('id', item.id);

    span.innerHTML = 'x';
    serieName.innerHTML = item.name;
    seriePicture.innerHTML = item.image;

    if (item.image === null) {
      seriePicture.src = emptyImage;
    } else {
      seriePicture.src = item.image.medium;
    }
    seriePicture.alt = 'Imagen de serie favorita';

    list.appendChild(li);
    li.appendChild(span);
    li.appendChild(serieName);
    li.appendChild(seriePicture);
    span.addEventListener('click', handlerDeleteFavourites);
  }
}

//Función manejadora que elimina favoritos

function handlerDeleteFavourites(ev) {
  deleteFavourites(ev);
  paintFavouriteList();
}

//Funcion para obtener datos de endpoint

const getSeriesFromApi = () => {
  const serieName = document.querySelector('.js-input').value;
  fetch(`${endpointSeries}${serieName}`)
    .then((response) => response.json())
    .then((data) => seriesContentFilter(data)) //respuesta filtrada
    .then(() => paintList());
};

searchButton.addEventListener('click', getSeriesFromApi);

//reset, vaciar favoritos

function resetFavorites() {
  favorites = [];
  localStorage.removeItem('favorites');
  paintFavouriteList();
}

resetButton.addEventListener('click', resetFavorites);

// Obtener datos de localStorage y pintarlos
getItemLocalStorage();
paintFavouriteList();
