import Movie from "/Movie.js"
const errorHtml = {
    index: "<div class='default-content-container' id='content-container'><div class='default-content'><p>Unable to find what you’re looking for. Please try another search.</p></div></div>",
    watchlist: "<div class='default-content-container' id='content-container'><div class='default-content'><p>Your watchlist is looking a little empty...</p><a href='/index.html'><i class='fa-solid fa-circle-plus'></i>Let's add some movies!</a></div></div>"
}

/*
        <section class="movies" id="movies">
        <div class="movie-content">
        <img class="movie-art" src="https://g.christianbook.com/g/slideshow/7/795810/main/795810_1_ftc.jpg"
        alt="movie cover art" />
        <div class="movie-grid-block-one">
        <p class="movie-title">Jonah</p>
        <p class="movie-rating">
        <icon class="fa-solid fa-star"></icon>
        8.1
        </p>
        </div>
        <div class="movie-grid-block-two">
        <p class="movie-duration">120 min</p>
        <p class="movie-genres">Action, Drama, Sci-fi</p>
        <button class="toggle-watchlist-btn">
        <i class="fa-solid fa-circle-plus"></i>
        <p>Watchlist</p>
        </button>
        </div>
        <p class="movie-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
        doloremque
        quas debitis maxime molestiae harum accusamus sapiente placeat fuga possimus expedita temporibus?
        </p>
        </div>
        </section>
*/

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const main = document.getElementById("main");

async function getMoviesData() {
    const search = searchInput.value ? `&t=${searchInput.value}` : '';
    const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=beba8703${search}`, { method: "GET" });
    const data = await res.json();
    console.log(data);
    main.innerHTML = `
        <section class="movies" id="movies">
            ${new Movie(data).getMovieHtml()}
        </section>
    `;
}

searchBtn.addEventListener("click", getMoviesData);

/*
Here is your key: beba8703 Please append it to all of your API requests, OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=beba8703 Click the following URL to activate your key: http://www.omdbapi.com/apikey.aspx?VERIFYKEY=d4ff0c4f-e35d-4e97-b79d-c4c5fd1a9188 If you did not make this request, please disregard this email.
*/