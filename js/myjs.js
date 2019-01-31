const _alboms = [
	{
		id: 1,
		title: 'Albom 1',
		songs: [1,2,3],
		image: 'https://uh8yh30l48rpize52xh0q1o6i-wpengine.netdna-ssl.com/wp-content/uploads/2014/05/header-image-photo-rights.png',
	},
	{
		id: 2,
		title: 'Albom 2',
		songs: [1,3,4],
		image: 'http://www.maximumwall.com/wp-content/uploads/2017/01/wallpaper-image-nourriture-hd-13.jpg',
	},
	{
		id: 3,
		title: 'Albom 3',
		songs: [1,2,4],
		image: 'https://www.violon.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/2/p200_face_2.jpg',
	}
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
var songs = document.querySelectorAll("a");
var nowPlay= document.querySelector(".nowPlay");
var playS = document.querySelector("#playSound");
var pause = document.querySelector(".pauseSound");
var stop = document.querySelector(".stopSound");
var next = document.querySelector(".next");
var prev = document.querySelector(".prev");
var range = document.querySelector("#rangeP");
var progressT = document.querySelector("#progressTime");
var timeS = document.querySelector(".timeAll");
var timeN = document.querySelector(".timeNow");
var temp  = 0;

var m = 0, tm = 0, s = 0, ts=0;

var gainNode = context.createGain();
var destination = context.destination;
var source;

audio.addEventListener('timeupdate',function (){
	let curtime = parseInt(this.currentTime,10);
			progressT.max = this.duration;
			progressT.value = curtime;
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

	timeN.innerHTML = m+""+tm+":"+s+""+curtime;
});


function render() {
	renderAlboms(_alboms)
}

function renderAlboms(alboms) {
	var ul = document.createElement('ul');

	for (i = 0; i < alboms.length; i++) {
		var li = document.createElement('li');
		li.innerHTML = `<span id='${alboms[i].id}'>
							${alboms[i].title}
							<img
								id='${alboms[i].id}'
								style="background-image: url('${alboms[i].image}');
									height: 100px;
									width: 700px;"
							/>
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
		playS.style.display = "none";
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
			icon = 'http://veshuel.v.e.pic.centerblog.net/m1w80ils.gif';
		}

		const song = getItemById(songs[i], _songs);
		var li = document.createElement('li');
		li.innerHTML = `<span id='${song.id}'>
							${song.title} - ${song.time}
							<img
								id='${song.id}'
								style="background-image: url('${icon}');
									height: 10px;
									width: 10px;"
							/>
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
		timeS.innerHTML = m+""+tm+":"+s+""+time;
	}
	gainNode.gain.value = range.value;
	audio.play();
}

playS.onclick = function() {
	this.style.display = "none";
	pause.style.display = "block";
	play();
}

pause.onclick = function() {
	this.style.display = "none";
	playS.style.display = "block";
	audio.pause();
}

range.oninput = function() {
	audio.volume = this.value;
}

stop.onclick = function() {
	if(!audio.ended) {
		audio.pause();
		audio.currentTime = 0;
	}

	if(audio.currentTime == 0){
		pause.style.display = "none";
		playS.style.display = "block";
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

progressT.oninput = function(){
	audio.currentTime = this.value;
	this.max = audio.duration;
	setTimeout(function(){
		play();
	},100);
}

render();
