export default class Movie {
    constructor(data) {
        Object.assign(this, data)
        this.watchListed = data.watchListed || false;
    }

    toggleWatchlist() {
        this.watchListed = !this.watchListed;
        console.log(`added to watchist: ${this.watchListed}`);
    }

    getMovieHtml() {
        const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID } = this;
        const innerHtml = this.watchListed ? "<i class='fa-solid fa-circle-minus'></i>Remove" : "<i class='fa-solid fa-circle-plus'></i>Watchlist";
        console.log(this.watchListed);
        return `
        <div class="movie-content">
            <img class="movie-art" src="${Poster}"
                alt="${Title} cover art" />
            <div class="movie-grid-block-one">
                <p class="movie-title">${Title}</p>
                <p class="movie-rating">
                    <icon class="fa-solid fa-star"></icon>
                    ${imdbRating}
                </p>
            </div>
            <div class="movie-grid-block-two">
                <p class="movie-duration">${Runtime}</p>
                <p class="movie-genres">${Genre}</p>
                <button class="toggle-watchlist-btn" data-imdbid="${imdbID}">
                    ${innerHtml}
                </button>
            </div>
            <p class="movie-description">${Plot}</p>
        </div>
        `
    }
}