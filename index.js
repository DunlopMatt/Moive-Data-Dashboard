const input = document.getElementById('search');
const dropDown = document.getElementById('dropDown');


document.addEventListener('keypress', logKey);

function logKey(e) {
  if (e.code === "Enter"){
    let movieName = input.value;
    searchMoive(movieName);
  };
}

let foundMovies;
async function searchMoive(movie){
if (!foundMovies) {
  await axios.get('https://www.omdbapi.com/', {
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
  await createDrop();
return foundMovies;
}
}

let finalMovie = ""
async function selectMoive(movie){
  await axios.get('https://www.omdbapi.com/', {
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
await showData(finalMovie)
return finalMovie;
}


let imdbID = ""
async function createDrop(){
  // await searchMoive;
  for(movie of foundMovies){
    dropDown.appendChild(document.createElement('li')).innerHTML =
     `
    <a data-id="${movie.imdbID}" href="index.html">
    <img src="${movie.Poster}">
    <h3> ${movie.Title} -  ${movie.Year} </h3>
    </a>
    `
  }
  dropLi = document.querySelectorAll('li').forEach(li => 
    li.addEventListener('click', function(e){
      e.preventDefault()
      aTag = li.firstElementChild
      imdbID = aTag.getAttribute('data-id')
      selectMoive(imdbID);
    })
  )
}

function hideDrop(){
  document.querySelector('#dropDown').classList.add('hide')
  input.value = ""
}


async function showData(movie){
  movieData = document.querySelector('#movieData');
  movieData.appendChild(document.createElement('div')).innerHTML =`
  <h1>${movie.Title}</h1>
        <div>
          <img src="${movie.Poster}">
        </div>
        <div>
          <li>Year - ${movie.Year}</li>
          <li> Awards - ${movie.Awards}</li>
          <li> Director - ${movie.Director}</li>
          <li> Rated - ${movie.Rated}</li>
          <li> Rating - ${movie.imdbRating}</li>
          <li> Votes -${movie.imdbVotes}</li>
           <li> Box Office - ${movie.BoxOffice}</li>
           <form action="/"> 
            <button type="submit">Go Back</button>
          </form>
        </div>
        
  
  `
}