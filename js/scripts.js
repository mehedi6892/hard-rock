//Necessary Variables
const searchBtn = document.querySelector('.search-btn');
const resultShow = document.getElementById('resultDisplay');
const searchText = document.getElementById('searchByName');
const mainApiUrl = 'https://api.lyrics.ovh'

//Show result By song Name
function SongNameAndArtistInfo(data) {
    let outputResult = '';
    const songDetails= data.data;
    for(let i = 0; i < 10; i++) {
        const ParticularSongInfo = songDetails[i];
        outputResult += `
        <div>
        <!-- Song result -->
        <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                        <h3 class="lyrics-name">${ParticularSongInfo.title}</h3>
                        <h4 class="lyrics-name">Singer: ${ParticularSongInfo.artist.name}</h4>
                        <p class="author lead">Album by <span>${ParticularSongInfo.album.title}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success" data-artist = "${ParticularSongInfo.artist.name}" data-SongName = "${ParticularSongInfo.title}">Get Lyrics</button>
                </div>
            <!-- Song result -->
         </div>        
        `
    }
    resultShow.innerHTML =outputResult;
}

//Function of Search song With song name
function searchSong() {
    fetch(`${mainApiUrl}/suggest/${searchText.value}`)
    .then(response => response.json())
    .then(data => SongNameAndArtistInfo(data));
}

//Get Lyrics from (Get Lyrics) Button
function getLyrics(artistName, songTitle){
    fetch(`${mainApiUrl}/v1/${artistName}/${songTitle}`)
    .then(res => res.json())
    .then(data => {
        const lyrics = data.lyrics.replace(/(\n\r|\r|\n)/g, '<br>')

        resultShow.innerHTML = `
        <div class="single-lyrics text-center">
            <h2 class="text-success mb-4">${artistName} - ${songTitle}</h2>
            <pre class="lyric text-white">${lyrics}</pre>
        </div>
        `
    })
} 

// Search Button Event Handler
searchBtn.addEventListener('click' , ()=> {
    if(searchText.value === '' || searchText.value === ' '){
        alert('please Enter a Song Name')
    }
    else{
        searchSong();
        searchText.value = '';
    }
})

//Get Lyrics by {Get Lyrics} Button
resultShow.addEventListener('click', (button)=> {
    const btnTarget = button.target;
    if(btnTarget.tagName === 'BUTTON'){
        const artist = btnTarget.getAttribute('data-artist');
        const title = btnTarget.getAttribute('data-SongName');

        getLyrics(artist , title) ;
       
    }
  
   
})
