const api = axios.create({ baseURL: "https://api.thedogapi.com/v1" });
api.defaults.headers.common["x-api-key"] =
  "8db97e25-da53-4939-9908-339540374432";
const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=3&api_key=8db97e25-da53-4939-9908-339540374432";
const API_URL_FAVOURITES = "https://api.thedogapi.com/v1/favourites";
const API_URL_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;

const newDogs = document.getElementById("boton");
const spanError = document.getElementById("error");
const espacioFav = document.getElementById("favouritesDogs");
const addFav1 = document.getElementById("addFav1");
const addFav2 = document.getElementById("addFav2");
const addFav3 = document.getElementById("addFav3");

async function loadRandomDogs() {
  const result = await fetch(API_URL_RANDOM);
  const data = await result.json();
  console.log(data);
  if (result.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + result.status;
  } else {
    const foto0 = document.getElementById("foto0");
    const foto1 = document.getElementById("foto1");
    const foto2 = document.getElementById("foto2");
    foto0.src = data[0].url;
    foto1.src = data[1].url;
    foto2.src = data[2].url;
    addFav1.onclick = () => saveFavouriteDog(data[0].id);
    addFav2.onclick = () => saveFavouriteDog(data[1].id);
    addFav3.onclick = () => saveFavouriteDog(data[2].id);
  }
}
async function loadFavouritesDogs() {
  const result = await fetch(API_URL_FAVOURITES, {
    method: "GET",
    headers: {
      "x-api-key": "8db97e25-da53-4939-9908-339540374432",
    },
  });
  const data = await result.json();
  console.log(data);
  if (result.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + result.status;
  } else {
    espacioFav.innerHTML = "";
    data.forEach((dog) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const button = document.createElement("button");
      const btnText = document.createTextNode("Delete Dog");
      img.src = dog.image.url;
      button.appendChild(btnText);
      article.appendChild(img);
      article.appendChild(button);
      espacioFav.appendChild(article);
      button.onclick = () => deleteFavouriteDogs(dog.id);
    });
  }
}
async function saveFavouriteDog(id) {
  const { data, status } = await api.post("/favourites", {
    image_id: id,
  });

  // const result = await fetch(API_URL_FAVOURITES, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "x-api-key": "8db97e25-da53-4939-9908-339540374432",
  //   },
  //   body: JSON.stringify({
  //     image_id: id,
  //   }),
  // });
  // const data = await result.json();
  if (status !== 200) {
    spanError.innerHTML = "Hubo un error: " + status + data.message;
  } else {
    loadFavouritesDogs();
  }
}
async function deleteFavouriteDogs(id) {
  const result = await fetch(API_URL_DELETE(id), {
    method: "DELETE",
    headers: {
      "x-api-key": "8db97e25-da53-4939-9908-339540374432",
    },
  });
  if (result.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + result.status + data.message;
  } else {
    loadFavouritesDogs();
  }
}
newDogs.onclick = loadRandomDogs;
loadRandomDogs();
loadFavouritesDogs();
