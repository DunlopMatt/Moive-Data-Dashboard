const input = document.getElementById('search');
const dropDown = document.getElementById('dropDown');


document.addEventListener('keypress', logKey);

function logKey(e) {
  if (e.code === "Enter"){
    // console.log(input.value)
    let movieName = input.value;
    searchMoive(movieName);
  };
}

let foundMovies;

async function searchMoive(movie){
  await axios.get('http://www.omdbapi.com/', {
  params: {
    apikey: '728b38e6', 
    s: movie
  }
})
.then(function(response) {
  foundMovies = response.data.Search;
})
.catch(function (error) {
  console.log(error);
})

setInterval(createDrop(), 10000);
return foundMovies;
}

let finalMovie = ""
async function selectMoive(movie){
  await axios.get('http://www.omdbapi.com/', {
  params: {
    apikey: '728b38e6', 
    i: movie
  }
})
.then(function(response) {
  finalMovie = response.data;
})
.catch(function (error) {
  console.log(error);
})
hideDrop();
setInterval(showData(finalMovie), 10000)
return finalMovie;
}


let imdbID = ""
function createDrop(){
  // await searchMoive;
  for(movie of foundMovies){
    dropDown.appendChild(document.createElement('li')).innerHTML = `<a style data-id="${movie.imdbID}" href="index.html"> ${movie.Title} -  ${movie.Year} <img src="${movie.Poster}"> </a>  `
  }
  dropLi = document.querySelectorAll('li').forEach(li => 
    li.addEventListener('click', function(e){
      e.preventDefault()
      aTag = li.firstChild
      imdbID = aTag.getAttribute('data-id')
      selectMoive(imdbID);
    })
  )
}

function hideDrop(){
  document.querySelector('#dropDown').classList.add('hide')

}


function showData(movie){
  movieData = document.querySelector('#movieData');
  movieData.appendChild(document.createElement('ul')).innerHTML =`
  <li> ${movie.Title} </li>
  <li> Year - ${movie.Year}</li>
  <li> Awards - ${movie.Awards}</li>
  <li> Director - ${movie.Director}</li>
  <li> Rated - ${movie.Rated}</li>
  <li> Rating - ${movie.imdbRating}</li>
  <li> Votes -${movie.imdbVotes}</li>
  <li> ${movie.BoxOffice}</li>
  <li>   <img src="${movie.Poster}"> 
  </li>
  `
}