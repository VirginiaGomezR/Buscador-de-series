/*Pintar listas de HTML y escuchar evento botón*/
'use strict';
//Pintar lista de series
const paintList = (data) => {
  //Seleccionar el elemnto donde poner la informacion ---> ul
  const list = document.querySelector('.js-list');

  seriesURL.forEach(function (item) {
    //creamos los elementos de la lista
    const li = document.createElement('li');

    const serieName = document.createElement('h3');
    serieName.classList.add('name');
    const seriePicture = document.createElement('img');
    seriePicture.classList.add('image');

    serieName.innerHTML = item.name;
    seriePicture.innerHTML = item.image;
    seriePicture.src = item.image;
    seriePicture.alt = 'Imagen de serie';

    //Añadimos los elementos al ul
    list.appendChild(li);
    li.appendChild(serieName);
    li.appendChild(seriePicture);
  });
};

//Pintar lista de series favoritas

//Events
