const _alboms = [
	{
		id: 1,
		title: 'Humans (Deluxe)',
		year: 2017,
		songs: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,2,3,4,5,6,7,8,9,10,11,12,13,14],
		image: 'images/Album1.png',
	},
	{
		id: 2,
		title: 'Plastic Beach',
		year: 2010,
		songs: [1,3,4,7,8,9,11,12,14,3,4,5,6,7,8,9,10,11,12,13,14,2,3,4,5,6,7,8,9],
		image: 'images/Album2.png',
	},
	{
		id: 3,
		title: 'The Fall',
		year: 2010,
		songs: [1,2,4,1,3,4,7,8,9,11,12,14,3,4,5,6,7,8,9,10,11,12,13,14,2,3,4,5],
		image: 'images/Album3.png',
	},
	{
		id: 4,
		title: 'D Sides',
		year: 2009,
		songs: [1,2,1,2,4,1,3,4,7,8,9,11,12,14,3,4,5,6,7,8,9,10,11,12,13,14,2,3,4,5,3,10,9,8,7],
		image: 'images/Album4.png',
	},
	{
		id: 5,
		title: 'Demon Days',
		year: 2007,
		songs: [1,2,1,2,4,1,3,4,7,8,9,11,12,14,3,4,5,6,7,8,9,10,11,12,13,14,2,3,4,5,3,10,9,3],
		image: 'images/Album5.png',
	},
	{
		id: 6,
		title: 'Gorillaz',
		year: 2006,
		songs: [2,4,1,3,4,7,8,9,11,12,14,3,4,5,6,7,8,9,10,11,12,13,14,2,3,4,5,3,10,9,3,1,2,4,1,3,4,7,8,9,11,12,14,3,4,5],
		image: 'images/Album6.png',
	},
];

const _songs = [
	{
		id: 1,
		title: 'Gorillaz Clint_Eastwood',
		author: 'test author 1',
		url: 'data/Gorillaz Clint_Eastwood.mp3',
		time: '1:11',
	},
	{
		id: 2,
		title: 'song 2',
		author: 'test author 2',
		url: 'data/five.mp3',
		time: '1:20',
	},
	{
		id: 3,
		title: 'song 3',
		author: 'test author 3',
		url: 'data/four.mp3',
		time: '1:23',
	},
	{
		id: 4,
		title: 'song 4',
		author: 'test author 4',
		url: 'data/first.mp3',
		time: '1:45',
	},
	{
		id: 5,
		title: 'song 5',
		author: 'test author 5',
		url: 'data/first.mp3',
		time: '1:45',
	},
	{
		id: 6,
		title: 'song 6',
		author: 'test author 6',
		url: 'data/first.mp3',
		time: '1:45',
	},
	{
		id: 7,
		title: 'song 7',
		author: 'test author 7',
		url: 'data/first.mp3',
		time: '1:45',
	},
	{
		id: 8,
		title: 'song 8',
		author: 'test author 8',
		url: 'data/first.mp3',
		time: '1:45',
	},
	{
		id: 8,
		title: 'song 8',
		author: 'test author 8',
		url: 'data/first.mp3',
		time: '1:45',
	},
	{
		id: 9,
		title: 'song 9',
		author: 'test author 9',
		url: 'data/first.mp3',
		time: '1:45',
	},
	{
		id: 10,
		title: 'song 10',
		author: 'test author 10',
		url: 'data/first.mp3',
		time: '1:45',
	},
	{
		id: 11,
		title: 'song 11',
		author: 'test author 11',
		url: 'data/first.mp3',
		time: '1:45',
	},
	{
		id: 12,
		title: 'song 12',
		author: 'test author 12',
		url: 'data/first.mp3',
		time: '1:45',
	},
	{
		id: 13,
		title: 'song 13',
		author: 'test author 13',
		url: 'data/first.mp3',
		time: '1:45',
	},
	{
		id: 14,
		title: 'song 14',
		author: 'test author 14',
		url: 'data/first.mp3',
		time: '1:45',
	},

];

var _selectedAlbom = {};
var _selectedSong = {};

var context = new AudioContext();

var audio = new Audio();
var nowPlay= document.querySelector(".nowPlay");
var playSound = document.querySelector("#playSound");
var pause = document.querySelector(".pauseSound");
var stop = document.querySelector(".stopSound");
var next = document.querySelector(".next");
var prev = document.querySelector(".prev");
var mute = document.querySelector("#mute");
var unmute = document.querySelector(".unmute");
var rangeVolume = document.querySelector("#rangeVolume");
var progressTime = document.querySelector("#progressTime");
var timeAll = document.querySelector(".timeAll");
var timeNow = document.querySelector(".timeNow");
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
	for (i = 0; i < alboms.length; i++) {
		var li = document.createElement('li');
		li.innerHTML = `<img
								key='${alboms[i].id}'
								style="background-image: url('${alboms[i].image}');
									height: 170px;
									width: 170px;"
							/><br>
		                <span key='${alboms[i].id}'>
							${alboms[i].title}
						</span><br>
						<span key='${alboms[i].id}'>
							${alboms[i].year}
						</span>`;
		ul.appendChild(li);
	}

	document.getElementById('alboms').innerHTML = "";
	document.getElementById('alboms').appendChild(ul);
}

function selectAlbom(event) {
	const albom = getItemById(event.target.getAttribute('key'), _alboms);
	_selectedAlbom = albom;
	_selectedSong = {};
	if (albom && albom.songs) {
		renderSongs(albom.songs)
	}
}

function selectSong(event) {
	const song = getItemById(event.target.getAttribute('key'), _songs);
	_selectedSong = song;
	playSong();
	renderSongs(_selectedAlbom.songs);
}

function playSong() {
	if (_selectedSong && _selectedSong.url && _selectedAlbom) {
		playSound.style.display = "none";
		pause.style.display = "block";
		nowPlay.innerHTML = `
			<div class='content'>
				<img class='image'
					style="background-image: url('${_selectedAlbom.image}')"
				/>
				<span class='title'>${_selectedSong.title}</span><br/>
				<span class='author'>${_selectedSong.author}</span>
			</div>`;
		event.preventDefault();
		audio.src = _selectedSong.url;
	 	play();
	}
}

function renderSongs(songs) {
	if (!_selectedSong) {
		return;
	}
	var ul = document.createElement('ul');

	for (i = 0; i < songs.length; i++) {
		var icon = '';
		var isSelected = false;
		const song = getItemById(songs[i], _songs);
		var li = document.createElement('li');
		if (_selectedSong.id === songs[i]) {
			icon = 'images/Playing.SVG';
			li.setAttribute('class', 'active');
		}

		li.innerHTML = `<span key='${song.id}' class='title'>
							${song.title}
						</span>
						<span key='${song.id}' class='time'>
							${song.time}
						</span>
						<div
							key='${song.id}'
							style="background-image: url('${icon}');"
							class='plaingIcon'
						></div>
						<p key='${song.id}' class='author'>
							${song.author}
						</p>`;

		ul.appendChild(li);
	}

	document.getElementById('songs').innerHTML = "";
	document.getElementById('songs').appendChild(ul);
}

function getItemById(id, arr) {
  var result = arr.filter(function(item) {
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
mute.onclick = function(){
	this.style.display = "none";
	unmute.style.display = "block";
	audio.muted = false;
}
unmute.onclick = function() {
	this.style.display = "none";
	mute.style.display = "block";
	audio.muted = true;
}	

next.onclick = function() {
	const currentIndex = _selectedAlbom.songs.findIndex(function(item) { return item === _selectedSong.id});
	_selectedSong = getItemById(_selectedAlbom.songs[currentIndex + 1] || _selectedAlbom.songs[0], _songs);
	playSong();
	renderSongs(_selectedAlbom.songs);
}

prev.onclick = function() {
	const currentIndex = _selectedAlbom.songs.findIndex(function(item) { return item === _selectedSong.id});
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
