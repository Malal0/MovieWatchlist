/////////////////////////////////////////////////////////////////////
//      VARIABLES
/////////////////////////////////////////////////////////////////////

import Movie from "/Movie.js"
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const main = document.getElementById("main");
let apiSearchResults = [];
let idArray = [];
let watchListArray = JSON.parse(localStorage.getItem("watchlist")) || [];

/////////////////////////////////////////////////////////////////////
//      FUNCTIONS
/////////////////////////////////////////////////////////////////////

function getMovies() {
    apiSearchResults = [];
    const search = searchInput.value ? `&s=${searchInput.value}` : '';
    searchInput.value = "";
    fetch(`http://www.omdbapi.com/?apikey=beba8703${search}`, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            idArray = data.Search.map(movie => movie.imdbID)
            idArray.forEach(id => {
                getMovie(id);
            })
        })
        .catch(() => {
            main.innerHTML = "<div class='default-content-container' id='content-container'><div class='default-content'><p>Unable to find what you’re looking for. Please try another search.</p></div></div>";
        })
}

function getMovie(id) {
    fetch(`http://www.omdbapi.com/?apikey=beba8703&i=${id}`, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            const movie = new Movie(data);
            if (watchListArray.filter(movie => movie.imdbID === id)[0]) {
                movie.watchListed = true;
            }
            apiSearchResults.push(movie);
            main.innerHTML = renderMovies(apiSearchResults);
        })
}

function renderMovies(arr) {
    const html = arr.map(obj => obj.getMovieHtml()).join('');
    return `
    <section class="movies" id="movies">
        ${html}
    </section>
    `
}

function handleClick(e) {
    if (e.target === searchBtn && searchInput.value) {
        getMovies();
    } else if (e.target.dataset.imdbid) {
        toggleWatchlistBtn(e);
    }
}

function toggleWatchlistBtn(e) {
    const movie = apiSearchResults.filter(movie => movie.imdbID === e.target.dataset.imdbid)[0];
    if (movie.watchListed) {
        movie.toggleWatchlist();
        watchListArray = watchListArray.filter(obj => obj.imdbID !== movie.imdbID);
        e.target.innerHTML = "<i class='fa-solid fa-circle-plus'></i>Watchlist";
        localStorage.setItem("watchlist", JSON.stringify(watchListArray))
    } else {
        movie.toggleWatchlist();
        watchListArray.push(movie);
        e.target.innerHTML = "<i class='fa-solid fa-circle-minus'></i>Remove";
        localStorage.setItem("watchlist", JSON.stringify(watchListArray))
    }
}

searchInput.focus();

/////////////////////////////////////////////////////////////////////
//      EVENT LISTENER
/////////////////////////////////////////////////////////////////////

document.addEventListener("click", handleClick);