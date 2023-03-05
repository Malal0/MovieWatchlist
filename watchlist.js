import Movie from "/Movie.js"
// import { getMovie } from "/utils.js"
const errorHtml = {
    index: "<div class='default-content-container' id='content-container'><div class='default-content'><p>Unable to find what you’re looking for. Please try another search.</p></div></div>",
    watchlist: "<div class='default-content-container' id='content-container'><div class='default-content'><p>Your watchlist is having trouble loading...</p></div></div>"
}
const main = document.getElementById("main");
let moviesDataArray = []; //<----  this holds the Movie objects
let watchListArray = [];

let localWatchlist = JSON.parse(localStorage.getItem("watchlist"));

if (localWatchlist) {
    watchListArray = localWatchlist;
}

function getMovies() {
    watchListArray.forEach(id => {
        getMovie(id);
    })
}

function getMovie(id) {
    fetch(`http://www.omdbapi.com/?apikey=beba8703&i=${id}`, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            moviesDataArray.push(new Movie(data));
            main.innerHTML = renderMovies(moviesDataArray);
        })
        .catch(() => {
            main.innerHTML = errorHtml.watchlist;
        })
}

function renderMovies(arr) {
    const html = arr.map(obj => {
        // const movie = new Movie(obj);
        return obj.getMovieHtml();
    }).join('');
    return `
    <section class="movies" id="movies">
        ${html}
    </section>
    `
}

function handleClick(e) {
    if (e.target.dataset.imdbid) {
        toggleWatchlistBtn(e);
        console.log(watchListArray);
    }
}

function toggleWatchlistBtn(e) {
    if (watchListArray.includes(e.target.dataset.imdbid)) {
        console.log("included");
        watchListArray = watchListArray.filter(id => id !== e.target.dataset.imdbid);
        e.target.innerHTML = "<i class='fa-solid fa-circle-plus'></i>Watchlist";
        localStorage.setItem("watchlist", JSON.stringify(watchListArray))
    } else {
        console.log("not included");
        watchListArray.push(e.target.dataset.imdbid);
        e.target.innerHTML = "<i class='fa-solid fa-circle-minus'></i>Remove";
        localStorage.setItem("watchlist", JSON.stringify(watchListArray))
    }
    console.log(localStorage.getItem("watchlist"));
    console.log(e.target.dataset.imdbid);
}

document.addEventListener("click", handleClick);
getMovies();

/*
Here is your key: beba8703 Please append it to all of your API requests, OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=beba8703
*/