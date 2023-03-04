export default class Movie {
    constructor(data) {
        Object.assign(this, data);
        this.title = "";
        this.rating = "";
    }

    getMovieHtml() {
        const { image, title, rating, duration, genres, description } = this;
        return `
        <div class="movie-content">
            <img class="movie-art" src="${image}"
                alt="movie cover art" />
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
                <button class="toggle-watchlist-btn">
                    <i class="fa-solid fa-circle-plus"></i>
                    <p>Watchlist</p>
                </button>
            </div>
            <p class="movie-description">${description}</p>
        </div>
        `
    }
}