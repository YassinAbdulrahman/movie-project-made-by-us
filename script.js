'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
	// const movies = await fetchMovies();
	const moviesMore = await moreFetchMovies()
	//  console.log(movies.results);
	renderMovies(moviesMore);
};

// Don't touch this function please
const constructUrl = (path) => {
	return `${TMDB_BASE_URL}/${path}?api_key=${atob(
		"NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
	)}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
	const movieRes = await fetchMovie(movie.id);
	renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
	const url = constructUrl(`movie/now_playing`);
	const res = await fetch(url);
	return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
	const url = constructUrl(`movie/${movieId}`);
	const res = await fetch(url);
	return res.json();
};

//sarah: fetch from multiple pages 
//to add more than 20 movies 
const moreFetchMovies = async () => {
	let moviesArray =[]
	 for (let i = 1; i<= 3 ;i++){
	   const url = constructUrl(`trending/all/day`);
	   const res = await fetch(`${url}&page=${i}`);
	   const data = await res.json()
	   moviesArray.push(...data.results)
	 }
	 return moviesArray;
   };

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
	const movieContainer = document.createElement("div");
	movieContainer.classList.add("movies");
	movies.map((movie) => {
		const movieDiv = document.createElement("div");
		movieDiv.classList.add("movie");
		movieDiv.innerHTML = `<div class="card">
		<div class="card card-top">
			<img class="card card-img-top"src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title
			} poster">
			<p class="overview card card-text">Genres: ${movie.genres}</p>
			</div>
			<div class="card card-body">
			<h3 class="card card-subtitle text-center fs-4 fw-bold">${movie.title}</h3>
				<p class="rating fw-bold text-center fs-3">Average: ${movie.vote_average}<i class="bi bi-star-fill text-warning fs-2 m-2"></i></p>
			</div>
			</div>
		`;
		movieDiv.addEventListener("click", () => {
			movieDetails(movie);
		});
		movieContainer.appendChild(movieDiv);
	});
	CONTAINER.appendChild(movieContainer);
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
	CONTAINER.innerHTML = `
		<div class="row">
				<div class="col-md-4">
					<img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path}>
				</div>
				<div class="col-md-8">
						<h2 id="movie-title">${movie.title}</h2>
						<p id="movie-release-date"><b>Release Date:</b> ${movie.release_date}</p>
						<p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
						<h3>Overview:</h3>
						<p id="movie-overview">${movie.overview}</p>
				</div>
				<div>
						<h3>Actors:</h3>
						<ul id="actors" class="list-unstyled"></ul>
						
		</div>`;
};

//genres function:1
const genresDropDown= async()=>{
	let fetchdeGenres = await fetchGenres()
	let dropDown = document.querySelector("#genres")
	// console.log(dropDown);
	dropDown.innerHTML = " "
	fetchdeGenres.genres.forEach(kind=> {
	  // console.log(kind.id);
	  let dropDown_item =`<li><a class="dropdown-item" data=${kind.id} href="#">${kind.name}</a></li>`
	 dropDown.innerHTML += dropDown_item
	})
	selectedGenres()
  }
  //genres function:2
  const fetchGenres = async()=>{
	let url = constructUrl('/genre/movie/list')
	// console.log(url);
	let res = await fetch(url)
   return res.json();
  }
  
  //genres function:3
  const selectedGenres = async ()=>{
	let movies = await moreFetchMovies()
	// console.log(movies);
	let found
	let dropDownItems = document.querySelectorAll("#genres li a")
	
	console.log(dropCollapse);
	 console.log(dropDownItems);
	dropDownItems.forEach(item =>{
	  item.addEventListener("click",(e)=>{
		console.log(e.target);
		dropCollapse.classList.remove("show")// to hide the collapse one dropdow item clicked
	  found =  movies.filter(movie => {
		return movie.genre_ids.find(id => {
		  return id === parseInt(item.getAttribute("data"))
		});
	  })
		
		 CONTAINER.innerHTML = " "
		 renderSearchAndFilter(found)
			// console.log(found);
	  })
	})
  }

document.addEventListener("DOMContentLoaded", autorun);
