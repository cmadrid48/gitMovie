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
var searchApi = 'https://api.themoviedb.org/3/search/movie?&api_key=47db771dacc88ab617f8b9575e60675e&query='


var main = document.querySelector('main');
var form = document.getElementById('form');
var search = document.getElementById('search');


// GETting movies initially
getMovies(apiUrl);


async function getMovies(url) {
    var response = await fetch(url);
    var responseData = await response.json();

    console.log(responseData)

    showMovies(responseData.results);

    // responseData.results.forEach(movie => {
    //     var {poster_path, title, vote_average} = movie
        
        
    //     var moviesEl = document.createElement('div');
    //     moviesEl.classList.add('movies');

    //     moviesEl.innerHTML = `
    //         <img src="${imgPath + poster_path}" alt="${title}">
    //             <div class="movie-info">
    //                 <h3>${title}</h3>
    //                 <span>${vote_average}</span>
    //             </div>`;

    //             main.appendChild(moviesEl);
    // });
    return responseData;
}

function showMovies(movies) {
    // clears main
    main.innerHTML = '';
    
    movies.forEach(movie => {
        var {poster_path, title, vote_average, overview} = movie
        
        
        var moviesEl = document.createElement('div');
        moviesEl.classList.add('movies');

        moviesEl.innerHTML = `
            <img src="${imgPath + poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span>${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview:</h3>
                    ${overview}
                </div>`;

                main.appendChild(moviesEl);
    });

}


form.addEventListener('submit',(e) => {
    e.preventDefault();

    var searchTerm = search.value;

    if(searchTerm) {
        getMovies(searchApi + searchTerm);
        search.value = '';

    }
});

