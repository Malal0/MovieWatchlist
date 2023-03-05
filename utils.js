import Movie from "/Movie.js"

function getMovie(id, arr) {
    fetch(`http://www.omdbapi.com/?apikey=beba8703&i=${id}`, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            arr.push(data);
            main.innerHTML = renderMovies(arr);
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

export { getMovie }