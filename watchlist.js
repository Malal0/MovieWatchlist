import Movie from "/Movie.js"
// import { getMovie } from "/utils.js"
const main = document.getElementById("main");
let watchListOnPageLoad = JSON.parse(localStorage.getItem("watchlist")) || []; //<----  this holds the Movie objects
let watchListArray = JSON.parse(localStorage.getItem("watchlist")) || [];

function renderMovies() {
    if (watchListArray.length) {
        const html = watchListArray.map(obj => {
            const movie = new Movie(obj);
            return movie.getMovieHtml();
        }).join('');
        return `
        <section class="movies" id="movies">
        ${html}
        </section>
        `
    } else {
        return "<div class='default-content-container' id='content-container'><div class='default-content'><p>Your watchlist is looking a little empty...</p><a href='/index.html'><i class='fa-solid fa-circle-plus'></i>Let's add some movies!</a></div></div>"
    }
}

function handleClick(e) {
    if (e.target.dataset.imdbid) {
        toggleWatchlistBtn(e);
        console.log(watchListArray);
    }
}

function toggleWatchlistBtn(e) {
    const movie = watchListOnPageLoad.filter(movie => movie.imdbID === e.target.dataset.imdbid)[0];
    console.log(movie.imdbID);
    // if (watchListArray.includes(movie)) {
    if (movie.watchListed) {
        movie.watchListed = false;
        e.target.innerHTML = "<i class='fa-solid fa-circle-plus'></i>Watchlist";
        watchListArray = watchListArray.filter(obj => obj.imdbID !== movie.imdbID);
        localStorage.setItem("watchlist", JSON.stringify(watchListArray))
    } else {
        movie.watchListed = true;
        e.target.innerHTML = "<i class='fa-solid fa-circle-minus'></i>Remove";
        watchListArray.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchListArray))
    }
}

document.addEventListener("click", handleClick);
main.innerHTML = renderMovies();

/*
Here is your key: beba8703 Please append it to all of your API requests, OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=beba8703
*/