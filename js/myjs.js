const _alboms = [
	{
		id: 1,
		title: 'Humans (Deluxe)',
		year: 2017,
		songs: [1,2,3],
		image: 'images/Album1.png',
	},
	{
		id: 2,
		title: 'Plastic Beach',
		year: 2010,
		songs: [1,3,4],
		image: 'images/Album2.png',
	},
	{
		id: 3,
		title: 'The Fall',
		year: 2010,
		songs: [1,2,4],
		image: 'images/Album3.png',
	},
	{
		id: 4,
		title: 'D Sides',
		year: 2009,
		songs: [1,2,3],
		image: 'images/Album4.png',
	},
	{
		id: 5,
		title: 'Demon Days',
		year: 2007,
		songs: [1,2,3],
		image: 'images/Album5.png',
	},
	{
		id: 6,
		title: 'Gorillaz',
		year: 2006,
		songs: [1,2,3],
		image: 'images/Album6.png',
	},
];

const _songs = [
	{
		id: 1,
		title: 'song 1',
		url: 'data/too.mp3',
		time: '1:11',
	},
	{
		id: 2,
		title: 'song 2',
		url: 'data/five.mp3',
		time: '1:20',
	},
	{
		id: 3,
		title: 'song 3',
		url: 'data/four.mp3',
		time: '1:23',
	},
	{
		id: 4,
		title: 'song 4',
		url: 'data/first.mp3',
		time: '1:45',
	}
];

let _selectedAlbom = {};
let _selectedSong = {};

var context = new AudioContext();

var audio = new Audio();
//var songs = document.querySelectorAll("a");
var nowPlay= document.querySelector(".nowPlay");
var playSound = document.querySelector("#playSound");
var pause = document.querySelector(".pauseSound");
var stop = document.querySelector(".stopSound");
var next = document.querySelector(".next");
var prev = document.querySelector(".prev");
var rangeVolume = document.querySelector("#rangeVolume");
var progressTime = document.querySelector("#progressTime");
var timeAll = document.querySelector(".timeAll");
var timeNow = document.querySelector(".timeNow");
var temp  = 0;
var m = 0, tm = 0, s = 0, ts=0;

var gainNode = context.createGain();
var destination = context.destination;
var source;

audio.addEventListener('timeupdate',function (){
	let curtime = parseInt(this.currentTime,10);
			progressTime.max = this.duration;
			progressTime.value = curtime;
			m = parseInt(curtime/600,10);
	if (m > 0) {
		curtime = curtime-600*m;
	}
	tm = parseInt(curtime/60,10);
	if ( tm > 0) {
		curtime = curtime - 60*tm;
	}
	s = parseInt(curtime/10,10);
	if (s > 0) {
		curtime = curtime-10*s;
	}

	//tm = parseInt(curent/10,10);

	timeNow.innerHTML = m+""+tm+":"+s+""+curtime;
});


function render() {
	renderAlboms(_alboms)
}

function renderAlboms(alboms) {
	var ul = document.createElement('ul');
    ul.setAttribute("class","alb");
	for (i = 0; i < alboms.length; i++) {
		var li = document.createElement('li');
		li.innerHTML = `<img
								id='${alboms[i].id}'
								style="background-image: url('${alboms[i].image}');
									height: 170px;
									width: 170px;"
							/><br>
		                <span id='${alboms[i].id}'>
							${alboms[i].title}
						</span><br>
						<span id='${alboms[i].id}'>
							${alboms[i].year}
						</span>`;						
		ul.appendChild(li);
	}

	document.getElementById('alboms').innerHTML = "";
	document.getElementById('alboms').appendChild(ul);
}

function selectAlbom(event) {
	const albom = getItemById(event.target.getAttribute('id'), _alboms);
	_selectedAlbom = albom;
	if (albom && albom.songs) {
		renderSongs(albom.songs)
	}
}

function selectSong(event) {
	const song = getItemById(event.target.getAttribute('id'), _songs);
	_selectedSong = song;
	playSong();
	renderSongs(_selectedAlbom.songs);
}

function playSong() {
	if (_selectedSong && _selectedSong.url) {
		playSound.style.display = "none";
		pause.style.display = "block";
		temp = i;
		nowPlay.innerHTML = _selectedSong.title;
		event.preventDefault();
		audio.src = _selectedSong.url;
	 	play();
	}
}

function renderSongs(songs) {
	var ul = document.createElement('ul');

	for (i = 0; i < songs.length; i++) {
		var icon = '';
		if (_selectedSong.id === songs[i]) {
			icon = 'images/Playing.SVG';
		}

		const song = getItemById(songs[i], _songs);
		var li = document.createElement('li');
/*		li.innerHTML = `<span id='${song.id}'>			
							${song.title}
							<img
								id='${song.id}'
								style="background-image: url('${icon}');
									height: 18px;
									width: 16px;
									padding-right:100px;"
							/>
							${song.time}
						</span>`; */
		li.innerHTML = `<span id='${song.id}'
		                 style="padding-right:120px;">			
							${song.title}
							
						</span>
							<img
								id='${song.id}'
								style="background-image: url('${icon}');
									height: 18px;
									width: 16px;
									padding-right:10px;"
							/>
						<span id='${song.id}'>	
							${song.time}
						</span>`;				
		ul.appendChild(li);
	}

	document.getElementById('songs').innerHTML = "";
	document.getElementById('songs').appendChild(ul);
}

function getItemById(id, arr) {
  var result = arr.filter(item => {
    return item.id === Number(id)
  });
  return result[0];
}

function play(buffer, time) {
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.start(time);

	audio.onloadedmetadata = function(){
		let time = parseInt(this.duration,10);
				m = parseInt(time/600,10);
		if (m > 0) {
			time = time - 600 * m;
		}
		tm = parseInt(time/60,10);
		if (tm > 0) {
			time = time - 60*tm;
		}
		s = parseInt(time/10,10);
		if (s > 0) {
			time = time-10*s;
		}
		timeAll.innerHTML = m+""+tm+":"+s+""+time;
	}
	gainNode.gain.value = rangeVolume.value;
	audio.play();
}

playSound.onclick = function() {
	this.style.display = "none";
	pause.style.display = "block";
	play();
}

pause.onclick = function() {
	this.style.display = "none";
	playSound.style.display = "block";
	audio.pause();
}

rangeVolume.oninput = function() {
	audio.volume = this.value;
}

stop.onclick = function() {
	if(!audio.ended) {
		audio.pause();
		audio.currentTime = 0;
	}

	if(audio.currentTime == 0){
		pause.style.display = "none";
		playSound.style.display = "block";
	}
}

next.onclick = function() {
	const currentIndex = _selectedAlbom.songs.findIndex(item => item === _selectedSong.id);
	_selectedSong = getItemById(_selectedAlbom.songs[currentIndex + 1] || _selectedAlbom.songs[0], _songs);
	playSong();
	renderSongs(_selectedAlbom.songs);
}

prev.onclick = function() {
	const currentIndex = _selectedAlbom.songs.findIndex(item => item === _selectedSong.id);
	if (_selectedAlbom.songs[currentIndex - 1]) {
		_selectedSong = getItemById(_selectedAlbom.songs[currentIndex - 1], _songs);
		playSong();
		renderSongs(_selectedAlbom.songs);
	}
}

progressTime.oninput = function(){
	audio.currentTime = this.value;
	this.max = audio.duration;
	setTimeout(function(){
		play();
	},100);
}

render();
