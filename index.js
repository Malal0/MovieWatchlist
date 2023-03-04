import Movie from "/Movie.js"
const errorHtml = {
    index: "<div class='default-content-container' id='content-container'><div class='default-content'><p>Unable to find what you’re looking for. Please try another search.</p></div></div>",
    watchlist: "<div class='default-content-container' id='content-container'><div class='default-content'><p>Your watchlist is looking a little empty...</p><a href='/index.html'><i class='fa-solid fa-circle-plus'></i>Let's add some movies!</a></div></div>"
}
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const main = document.getElementById("main");
let idArray = [];
let moviesDataArray = [];

function getMovies() {
    moviesDataArray = [];
    const search = searchInput.value ? `&s=${searchInput.value}` : '';
    fetch(`http://www.omdbapi.com/?apikey=beba8703${search}`, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            idArray = data.Search.map(movie => movie.imdbID)
            idArray.forEach(id => {
                getMovie(id);
            })
        })
        .catch(() => {
            main.innerHTML = errorHtml.index;
        })
}

function getMovie(id) {
    fetch(`http://www.omdbapi.com/?apikey=beba8703&i=${id}`, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            moviesDataArray.push(data);
            main.innerHTML = renderMovies(moviesDataArray);
        })
}

function renderMovies(arr) {
    const html = arr.map(obj => {
        const movie = new Movie(obj);
        return movie.getMovieHtml();
    }).join('');
    return `
    <section class="movies" id="movies">
        ${html}
    </section>
    `
}

function handleClick(e) {
    if (e.target.dataset.imdbid) {
        console.log(e.target.dataset.imdbid);
    }
}

searchBtn.addEventListener("click", getMovies);
document.addEventListener("click", handleClick);

/*
Here is your key: beba8703 Please append it to all of your API requests, OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=beba8703
*/