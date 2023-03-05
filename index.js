import Movie from "/Movie.js"
// import { getMovie} from "/utils.js"
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const main = document.getElementById("main");
let apiSearchResults = [];
let idArray = [];
let watchListArray = JSON.parse(localStorage.getItem("watchlist")) || [];

// localStorage.clear();

function getMovies() {
    apiSearchResults = [];
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
            main.innerHTML = "<div class='default-content-container' id='content-container'><div class='default-content'><p>Unable to find what you’re looking for. Please try another search.</p></div></div>";
        })
}

function getMovie(id) {
    fetch(`http://www.omdbapi.com/?apikey=beba8703&i=${id}`, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            const movie = new Movie(data);
            if (watchListArray.filter(movie => movie.imdbID === id)[0]) {
                // return watchListArray.filter(movie => movie.imdbID === id)[0]
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
    if (e.target.dataset.imdbid) {
        toggleWatchlistBtn(e);
    }
    console.log(apiSearchResults)
}

function toggleWatchlistBtn(e) {
    const movie = apiSearchResults.filter(movie => movie.imdbID === e.target.dataset.imdbid)[0];
    console.log(movie);
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

searchBtn.addEventListener("click", getMovies);
document.addEventListener("click", handleClick);

/*
Here is your key: beba8703 Please append it to all of your API requests, OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=beba8703
*/