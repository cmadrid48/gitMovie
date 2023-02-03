var apiUrl = 'https://api.themoviedb.org/3/tv/top_rated?api_key=47db771dacc88ab617f8b9575e60675e&language=en-US&page=1'
var imgPath = 'https://image.tmdb.org/t/p/w1280'
var searchApi = 'https://api.themoviedb.org/3/search/tv?&api_key=47db771dacc88ab617f8b9575e60675e&query='

var main = document.querySelector('main');
var form = document.getElementById('form');
var search = document.getElementById('search');

getShows(apiUrl);

async function getShows(url) {
    var response = await fetch(url);
    var responseData = await response.json();

    console.log(responseData);

    showShows(responseData.results);

    return responseData;
}

function showShows(shows) {
    //clears main
    main.innerHTML = '';

    shows.forEach(show => {
        var {poster_path, name, vote_average, overview} = show

        var showsEl = document.createElement('div');
        showsEl.classList.add('shows');

        showsEl.innerHTML = `
        <img src="${imgPath + poster_path}" alt="${name}">
        <div class="show-info">
            <h3>${name}</h3>
            <span>${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview:</h3>
            ${overview}
        </div>`;

        main.appendChild(showsEl)
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    var searchTerm = search.value;
    var recent = JSON.parse(localStorage.getItem("showSearches")) ?? [];
    if (searchTerm) {
        getShows(searchApi + searchTerm);
        search.value = "";
    }
    recent.push(searchTerm);
    localStorage.setItem("showSearches", JSON.stringify(recent));
    if (localStorage.recent && localStorage.recent != "") {
    recent = JSON.parse(localStorage.recent);
    } else {
        recent.push("1");
        JSON.stringify(recent);
      // console.log(searchTerm.value);
    }
    console.log(recent);
});