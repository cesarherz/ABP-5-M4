// Seleccionar elementos del DOM
const recipeForm = document.getElementById('recipeForm');
const searchInput = document.getElementById('searchInput');
const recipesContainer = document.getElementById('recipes');

// URL de la API
const API_URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';

// Función asíncrona para obtener las categorías de recetas
async function fetchCategories() {
    try {
        // Realizar la petición a la API usando fetch y await
        const response = await fetch(API_URL);

        // Manejar posibles errores en la respuesta
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }

        // Convertir la respuesta a formato JSON
        const data = await response.json();

        // Mostrar las categorías en la consola
        console.log('Categorías obtenidas:', data.categories);

        // Mostrar las categorías en el DOM
        displayCategories(data.categories);

    } catch (error) {
        // Manejar errores de la petición
        console.error('Hubo un problema con la petición Fetch:', error);
    }
}

// Función para mostrar las categorías en el DOM
function displayCategories(categories) {
    // Limpiar el contenedor de recetas
    recipesContainer.innerHTML = '';

    // Iterar sobre cada categoría y crear elementos en el DOM
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('col-md-4', 'mb-4');

        categoryDiv.innerHTML = `
      <div class="card">
        <img src="${category.strCategoryThumb}" class="card-img-top" alt="${category.strCategory}">
        <div class="card-body">
          <h5 class="card-title">${category.strCategory}</h5>
          <p class="card-text">${category.strCategoryDescription.substring(0, 100)}...</p>
        </div>
      </div>
    `;

        recipesContainer.appendChild(categoryDiv);
    });
}

// Evento para el formulario de búsqueda
recipeForm.addEventListener('submit', event => {
    event.preventDefault();

    // Llamar a la función de fetchCategories cuando se envía el formulario
    fetchCategories();
});

// Llamar a la función de fetchCategories al cargar la página
fetchCategories();

