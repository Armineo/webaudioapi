window.onload = function(){
    PlayerController.init();
}
var PlayerController = {
  _alboms: [
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
  ],
  _songs: [
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

  ],

  _selectedAlbom: {},
  _selectedSong: {},

  context: new AudioContext(),
  audio: new Audio(),

	nowPlay : document.querySelector("#nowPlay"),
	playSound :document.querySelector("#playSound"),
	pause :document.querySelector("#pauseSound"),
	stop : document.querySelector("#stopSound"),
	next : document.querySelector("#next"),
	prev : document.querySelector("#prev"),
	mute :document.querySelector("#mute"),
	unmute : document.querySelector("#unmute"),
	rangeVolume : document.querySelector("#rangeVolume"),
	progressTime : document.querySelector("#progressTime"),
	timeAll :document.querySelector("#timeAll"),
	timeNow : document.querySelector("#timeNow"), 	

  time: {
    m: 0,
    tm: 0,
    s: 0,
    ts:0,
  },

  gainNode: {},
  destination: {},
  source: {},

  isPause: null,
  isPlaying: null,

  init: function() {
    this.initEvents();
    this.gainNode = this.context.createGain();
    this.destination =  this.context.destination;

    this.audio.addEventListener('timeupdate', _ => {
    	let curtime = parseInt(this.audio.currentTime,10);
    			progressTime.max = this.audio.duration;
    			progressTime.value = curtime;
			this.time.m = parseInt(curtime/600,10);
    	if (this.time.m > 0) {
    		curtime = curtime-600*this.time.m;
    	}
    	this.time.tm = parseInt(curtime/60,10);
    	if (this.time.tm > 0) {
    		curtime = curtime - 60*this.time.tm;
    	}
    	this.time.s = parseInt(curtime/10,10);
    	if (this.time.s > 0) {
    		curtime = curtime-10*this.time.s;
    	}

    	//tm = parseInt(curent/10,10);
      console.log(this.time);
      console.log(curtime);
    	this.timeNow.innerHTML = this.time.m+""+this.time.tm+":"+this.time.s+""+curtime;
    });
    console.log("in::init");
    this.render();
  },

  initEvents: function() {
    console.log('initEvents');

    this.playSound.onclick =  _ => {
    	this.playSound.style.display = "none";
    	this.pause.style.display = "block";
    	this.play();
    }

    this.pause.onclick = _ => {
    	this.pause.style.display = "none";
    	this.playSound.style.display = "block";
    	this.audio.pause();
    }

    this.rangeVolume.oninput = _ => {
    	this.audio.volume = this.rangeVolume.value;
    }  

    this.stop.onclick = _ => {
    	if(!this.audio.ended) {
    		this.audio.pause();
    		this.audio.currentTime = 0;
    	}

    	if(this.audio.currentTime == 0){
    		this.pause.style.display = "none";
    		this.playSound.style.display = "block";
    	}
    }

    this.mute.onclick = _ => {
    	this.mute.style.display = "none";
    	this.unmute.style.display = "block";
    	this.audio.muted = false;
    }

    this.unmute.onclick = _ => {
    	this.unmute.style.display = "none";
    	this.mute.style.display = "block";
    	this.audio.muted = true;
    }

    this.next.onclick = _ => {
    	const currentIndex = this._selectedAlbom.songs.findIndex(item => item === this._selectedSong.id);
 //       const currentIndex = this.getSongIndex();
    	this._selectedSong = this.getItemById(this._selectedAlbom.songs[currentIndex + 1] || this._selectedAlbom.songs[0], this._songs);
    	this.playSong();
    	this.renderSongs(this._selectedAlbom.songs);
    }
    
    this.prev.onclick = _ => {
     	const currentIndex = this._selectedAlbom.songs.findIndex(item => item === this._selectedSong.id);
   //     const currentIndex = this.getSongIndex();
    	if (this._selectedAlbom.songs[currentIndex - 1]) {
    		this._selectedSong = this.getItemById(this._selectedAlbom.songs[currentIndex - 1] || this._selectedAlbom.songs[length-1], this._songs);
    		this.playSong();
    		this.renderSongs(this._selectedAlbom.songs);
    	}
    }
	
/*	getSongIndex: function(){
		this._selectedAlbom.songs.findIndex(item => item === this._selectedSong.id);
	} */
	
   this.audio.onended = _ =>{
	   this.next();
   }
   
    this.progressTime.oninput = _ => {
    	this.audio.currentTime = this.progressTime.value;
    	this.max = this.audio.duration;
    	setTimeout(_ => {
    		this.play();
    	},100);
    }
  },
  render: function() {
    var ul = document.createElement('ul');
    for (i = 0; i < this._alboms.length; i++) {
      var li = document.createElement('li');
      li.setAttribute('key', this._alboms[i].id);
      li.innerHTML = `<img
                  key='${this._alboms[i].id}'
                  style="background-image: url('${this._alboms[i].image}');
                    height: 170px;
                    width: 170px;"
                /><br>
                      <span key='${this._alboms[i].id}'>
                ${this._alboms[i].title}
              </span><br>
              <span key='${this._alboms[i].id}'>
                ${this._alboms[i].year}
              </span>`;
      ul.appendChild(li);
    }

    document.getElementById('alboms').innerHTML = "";
    document.getElementById('alboms').appendChild(ul);
  },

  renderSongs: function(songs) {
  	if (!this._selectedSong || !songs) {
  		return;
  	}
  	var ul = document.createElement('ul');

  	for (i = 0; i < songs.length; i++) {
  		var icon = '';
  		var isSelected = false;
  		const song = this.getItemById(songs[i], this._songs);
  		var li = document.createElement('li');
      li.setAttribute('key', song.id);

  		if (this._selectedSong.id === songs[i]) {
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
  },

  selectAlbom: function(event) {
  	const albom = this.getItemById(event.target.getAttribute('key'), this._alboms);
  	this._selectedAlbom = albom;
  	this._selectedSong = {};
  	if (albom && albom.songs) {
  		this.renderSongs(albom.songs)
  	}
  },

  selectSong: function(event) {
  	const song = this.getItemById(event.target.getAttribute('key'), this._songs);
  	this._selectedSong = song;
  	this.playSong();
  	this.renderSongs(this._selectedAlbom.songs);
  },

  playSong: function() {
  	if (this._selectedSong && this._selectedSong.url && this._selectedAlbom) {
  		this.playSound.style.display = "none";
  		this.pause.style.display = "block";
  		this.nowPlay.innerHTML = `
  			<div class='content'>
  				<img class='image'
  					style="background-image: url('${this._selectedAlbom.image}')"
  				/>
  				<span class='title'>${this._selectedSong.title}</span><br/>
  				<span class='author'>${this._selectedSong.author}</span>
  			</div>`;
  		event.preventDefault();
  		this.audio.src = this._selectedSong.url;
  	 	this.play();
  	}
  },

  getItemById: function(id, arr) {
    var result = arr.filter(function(item) {
      return item.id === Number(id)
    });
    return result[0];
  },

  play: function(buffer, time) {
  	var source = this.context.createBufferSource();
  	source.buffer = this.buffer;
  	source.connect(this.context.destination);
  	source.start(time);

  	this.audio.onloadedmetadata = _ => {
  		let time = parseInt(this.audio.duration,10);
			this.time.m = parseInt(time/600,10);
  		if (this.time.m > 0) {
  			time = time - 600 * this.time.m;
  		}
  		this.time.tm = parseInt(time/60,10);
  		if (this.time.tm > 0) {
  			time = time - 60*this.time.tm;
  		}
  		this.time.s = parseInt(time/10,10);
  		if (this.time.s > 0) {
  			time = time-10*this.time.s;
  		}
  		this.timeAll.innerHTML = this.time.m+""+this.time.tm+":"+this.time.s+""+time;
  	}
  	this.gainNode.gain.value = this.rangeVolume.value;
  	this.audio.play();
  },

}
