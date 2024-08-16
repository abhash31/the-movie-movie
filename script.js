// 8215638c
const results = document.querySelector('.results');
const showmore = document.querySelector('.show-more-button');
const scrollToTop = document.querySelector('.scroll-to-top-button');
const userInputBox = document.querySelector('.user-input-movie');
const searchButoon = document.querySelector('.search-btn');
const form = document.querySelector('form');
const card = document.querySelector('.card');
const helperText = document.querySelector('.helper-text');

let page = 1;
let flag = 0;
let resultFlag = 0;
// let errorFlag = 0;

function searchMovie(movieName, pagenumber=1, type='movie'){
    fetch(`https://www.omdbapi.com/?s=${movieName}&type=${type}&page=${pagenumber}&apikey=8215638c`)
    .then((response)=>response.json())
    .then((data) => {
        addResults(data.Search);
    }).catch(()=>{
        errorHandel();
    })
}

function getMoviePlot(movieName, year){
    fetch(`https://www.omdbapi.com/?t=${movieName}&y=${year}&plot=short&apikey=8215638c`)
    .then((response)=>response.json())
    .then((data) => {
        addInfoToCard(data);
    })
    .catch(()=>{
        errorHandel();
    })
}

function addResults(movie){
    if(resultFlag==0){
        helperText.textContent = `Showing results for: ${userInputBox.value.trim()}`
    }
    movie.forEach(element => {
        const divMovie = document.createElement('div');
        const movieName = document.createElement('p');
        
        divMovie.className = 'movie-div flex flex-col';
        movieName.className = 'movie-name'
        if(element.Poster!='N/A') divMovie.style.backgroundImage = `url(${element.Poster})`;
        else divMovie.style.backgroundImage = `url(default-poster.jpg)`;
        movieName.innerHTML = `${element.Title} (${element.Year})`;

        divMovie.append(movieName);
        document.querySelector('.loading').classList.remove('load');
        results.append(divMovie);
        
        divMovie.addEventListener('click', ()=>{
            if(flag==1) return;
            document.querySelector('.loading').classList.add('load');
            getMoviePlot(element.Title, element.Year);
        });
        document.querySelector('.bottom-btn').style.display = 'block';
        resultFlag=1;
        // errorFlag=0;
    });
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    helperText.textContent = '';
    document.querySelector('.loading').classList.add('load');
    document.querySelector('.bottom-btn').style.display = 'none';
    results.innerHTML = '';
    if(userInputBox.value==''){
        document.querySelector('.loading').classList.remove('load');
        helperText.textContent = 'Search Your Favorite Movie Here!'
        return;
    }
    searchMovie(userInputBox.value.trim());
    resultFlag=0;
});

function addInfoToCard(movie){
    const moviePoster = document.createElement('img');
    const movieTitle = document.createElement('p');
    const movieYear = document.createElement('p');
    const movieActor = document.createElement('p');
    const movieDir = document.createElement('p');
    const movieGenre = document.createElement('p');
    const moviePlot = document.createElement('p');
    const movieRating = document.createElement('p');

    if(movie.Poster!='N/A') moviePoster.setAttribute('src', `${movie.Poster}`);
    else moviePoster.setAttribute('src', `default-poster.jpg`);
    moviePlot.textContent = movie.Plot;
    movieTitle.textContent = movie.Title;
    movieYear.textContent = `Year: ${movie.Year}`;
    movieActor.textContent = `Actor: ${movie.Actors}`;
    movieDir.textContent = `Director: ${movie.Director}`;
    movieGenre.textContent = `Genre: ${movie.Genre}`;
    movieRating.innerHTML = `Rating: ${movie.imdbRating} &#x2B50`;

    moviePoster.className = 'movie-poster';
    movieTitle.className = 'card-movie-title';
    moviePlot.className = 'card-movie-plot';
    movieYear.classList = 'card-movie-oth';
    movieActor.classList = 'card-movie-oth';
    movieDir.classList = 'card-movie-oth';
    movieGenre.classList = 'card-movie-oth';
    movieRating.classList = 'card-movie-oth';

    card.appendChild(moviePoster);
    card.appendChild(movieTitle);
    card.appendChild(movieYear);
    card.appendChild(movieDir);
    card.appendChild(movieGenre);
    card.appendChild(movieActor);
    card.appendChild(moviePlot);
    card.appendChild(movieRating);
    document.querySelector('.loading').classList.remove('load');
    card.classList.add('active');
    document.querySelector('.container').classList.add('blur');
    flag=1;
}

showmore.addEventListener('click', ()=>{
    document.querySelector('.loading').classList.add('load');
    searchMovie(userInputBox.value.trim(), ++page);
})

document.body.addEventListener('click',()=>{
    card.innerHTML = '';
    card.classList.remove('active');
    document.querySelector('.container').classList.remove('blur');
    flag=0;
});

scrollToTop.addEventListener('click', ()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function errorHandel(){
    document.querySelector('.error-text').classList.add('load');
    // errorFlag=1;
    if(resultFlag==0)helperText.textContent = 'No results found';
    setTimeout(()=>{
        if(resultFlag==0){
            document.querySelector('.bottom-btn').style.display = 'none';
        }
        document.querySelector('.error-text').classList.remove('load');
        document.querySelector('.loading').classList.remove('load');
    },3000);
}

// function addSingleResult(movie){
//         const divMovie = document.createElement('div');
//         const moviePoster = document.createElement('img');
//         const movieName = document.createElement('p');
//         const movieYear = document.createElement('p');

//         if(element.Poster!='N/A') moviePoster.setAttribute('src', `${movie.Poster}`);
//         movieName.textContent = `${movie.Title}`;
//         movieYear.textContent = `${movie.Year}`;

//         divMovie.append(moviePoster);
//         divMovie.append(movieName);
//         divMovie.append(movieYear);
//         results.append(divMovie);  
// }














// other ways to search
// http://www.omdbapi.com/?i=tt3896198&apikey=8215638c
// http://www.omdbapi.com/?t=joker&apikey=8215638c
