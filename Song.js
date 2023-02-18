console.log("Welcome to Spotify");

//Initialise the variables
let index = 0;
let audioElement = new Audio('1.mp3');
let masterplay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems =Array.from(document.getElementsByClassName('songItem')) ;

let songs =[
{songName:"Sparkling",filePath:"1.mp3", coverPath:"c0.jpg"},
{songName:"Punk Cyber",filePath:"2.mp3", coverPath:"c1.jpg"},
{songName:"Downtown Funk",filePath:"3.mp3", coverPath:"c2.jpg"},
{songName:"Rising Up",filePath:"4.mp3", coverPath:"c3.jpg"},
{songName:"Party Pary!!",filePath:"5.mp3", coverPath:"c4.jpg"},
]

songItems.forEach((element,i)=>
{
	console.log(element,i);
	element.getElementsByTagName("img")[0].src = songs[i].coverPath;
	element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


//Handle play/pause click
masterplay.addEventListener('click', ()=>
{
	if(audioElement.paused || audioElement.currentTime<=0)
	{
		audioElement.play();
		masterplay.classList.remove('fa-circle-play');
		masterplay.classList.add('fa-circle-pause');
		gif.style.opacity = 1;
	}
	else
	{
		audioElement.pause();
		masterplay.classList.remove('fa-circle-pause');
		masterplay.classList.add('fa-circle-play');
		gif.style.opacity = 0;
	}
})

//Listen to Events
audioElement.addEventListener('timeupdate',()=>
{
	console.log('timeupdate'); 
	//Update Seekbar
	progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
	console.log(progress);
	myProgressBar.value = progress;
})

//Change timing from progressbar
myProgressBar.addEventListener('change', ()=>
{
	audioElement.currentTime = myProgressBar.value * audioElement.duration /100 ; 
})

const makeAllPlays = ()=>
{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>
  {
  	element.classList.add('fa-circle-play');
  	element.classList.remove('fa-circle-pause');
  })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>
{
   element.addEventListener('click',(e)=>
   {
   	makeAllPlays();
   	index = parseInt(e.target.id);
   	e.target.classList.remove('fa-circle-play');
   	e.target.classList.add('fa-circle-pause');
   	audioElement.src = `${index+1}.mp3`;
   	masterSongName.innerText = songs[index].songName;
   	audioElement.currentTime = 0;
   	audioElement.play();
   	gif.style.opacity = 1;
   	masterplay.classList.remove('fa-circle-play');
	  masterplay.classList.add('fa-circle-pause');
   })
})

document.getElementById('next').addEventListener('click',()=>
{
	if(index>4)
	{
		index = 0;
	}
	else
	{
		index +=1;
	}
	audioElement.src = `${index+1}.mp3`;
	masterSongName.innerText = songs[index].songName;
	audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterplay.classList.remove('fa-circle-play');
	masterplay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>
{
	if(index<=4)
	{
		index  -=1;
	}
	else
	{
		index =0;
	}
	audioElement.src = `${index+1}.mp3`;
	masterSongName.innerText = songs[index].songName;
	audioElement.currentTime = 0;
   	audioElement.play();
   	masterplay.classList.remove('fa-circle-play');
	masterplay.classList.add('fa-circle-pause');
})