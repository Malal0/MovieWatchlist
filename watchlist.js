/////////////////////////////////////////////////////////////////////
//      VARIABLES
/////////////////////////////////////////////////////////////////////

import Movie from "/Movie.js"
const main = document.getElementById("main");
let watchListOnPageLoad = JSON.parse(localStorage.getItem("watchlist")) || [];
let watchListArray = JSON.parse(localStorage.getItem("watchlist")) || [];
main.innerHTML = renderMovies();

/////////////////////////////////////////////////////////////////////
//      FUNCTIONS
/////////////////////////////////////////////////////////////////////

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
    }
}

function toggleWatchlistBtn(e) {
    const movie = watchListOnPageLoad.filter(movie => movie.imdbID === e.target.dataset.imdbid)[0];
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

/////////////////////////////////////////////////////////////////////
//      EVENT LISTENER
/////////////////////////////////////////////////////////////////////

document.addEventListener("click", handleClick);