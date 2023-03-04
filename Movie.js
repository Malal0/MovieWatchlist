export default class Movie {
    constructor(data) {
        this.image = data.Poster;
        this.title = data.Title;
        this.rating = data.imdbRating;
        this.duration = data.Runtime;
        this.genres = data.Genre;
        this.description = data.Plot;
        this.id = data.imdbID;
        this.addedToWatchlist = false;
    }

    toggleWatchlist() {
        this.addedToWatchlist = !this.addedToWatchlist;
    }

    getMovieHtml() {
        const { image, title, rating, duration, genres, description, id } = this;
        return `
        <div class="movie-content">
            <img class="movie-art" src="${image}"
                alt="${title} cover art" />
            <div class="movie-grid-block-one">
                <p class="movie-title">${title}</p>
                <p class="movie-rating">
                    <icon class="fa-solid fa-star"></icon>
                    ${rating}
                </p>
            </div>
            <div class="movie-grid-block-two">
                <p class="movie-duration">${duration}</p>
                <p class="movie-genres">${genres}</p>
                <button class="toggle-watchlist-btn" data-imdbid="${id}">
                    <i class="fa-solid fa-circle-plus"></i>
                    Watchlist
                </button>
            </div>
            <p class="movie-description">${description}</p>
        </div>
        `
    }
}