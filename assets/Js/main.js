$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        console.log($('#searchText').val());
        e.preventDefault();
    });
});
//taking the user input/value
// ensuring function is being called

var apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=47db771dacc88ab617f8b9575e60675e&language=en-US&page=1'
var imgPath = 'https://image.tmdb.org/t/p/w1280' 
async function getMovies() {
    var response = await fetch(apiUrl);
    var responseData = await response.json();

    console.log(responseData)

    responseData.results.forEach((movie) => {
        var img = document.createElement('img');
        img.src = imgPath + movie.poster_path;

        document.body.appendChild(img);


    });
    return responseData;
}

getMovies();

