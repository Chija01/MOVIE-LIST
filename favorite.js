const BASE_URL = 'https://webdev.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const movies = JSON.parse(localStorage.getItem('favoriteMovies'))

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')

function renderMovieList(data) {
    let rawHTML = ''
    data.forEach((item) => {
        // title, image
        rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img src="${POSTER_URL + item.image
            }" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id}">More</button>
          <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
        </div>
      </div>
    </div>
  </div>`
    })
    dataPanel.innerHTML = rawHTML
}

function RemoveFromFavorite(id){
    const  movieIndex = movies.findIndex((movie) => movie.id === id)
    movies.splice(movieIndex,1)
    localStorage.setItem('favoriteMovies', JSON.stringify(movies))
}

// 從喜愛清單中刪除電影
dataPanel.addEventListener('click', function onPanelClicked(event) {
    if (event.target.matches('.btn-show-movie')) {
      showMovieModal(Number(event.target.dataset.id))
    } else if (event.target.matches('.btn-remove-favorite')) {
      RemoveFromFavorite(Number(event.target.dataset.id))
      renderMovieList(movies)
    }
  })


// 跳出點影細節視窗
function showMovieModal(id) {
    const modalTitle = document.querySelector('#movie-modal-title')
    const modalImage = document.querySelector('#movie-modal-image')
    const modalDate = document.querySelector('#movie-modal-date')
    const modalDescription = document.querySelector('#movie-modal-description')
    axios.get(INDEX_URL + id).then((response) => {
        const data = response.data.results
        modalTitle.innerText = data.title
        modalDate.innerText = 'Release date: ' + data.release_date
        modalDescription.innerText = data.description
        modalImage.innerHTML = `<img src="${POSTER_URL + data.image
            }" alt="movie-poster" class="img-fluid">`
    })
}

renderMovieList(movies)