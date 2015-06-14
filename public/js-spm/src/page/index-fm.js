/**
 * Created by thonatos on 14/12/7.
 */

var init = function () {

    var public = require('./public');
    public.init();

    console.log("\n\n" +
    "这是个电台。\n"+
    "听那些老歌，想念你。\n\n");
	
	var audio,
		musicList,
		currentIndex=0,
		$album=$('.album'),
		$info=$('.info'),
		$next=$('.player-next'),
		$playToogle = $('.player-play-pause'),
		$volumeRange = $('.player-seekbar').get(0);
		

	function load(musicObj){

		// Album
		$album.find('img')[0].src = musicObj.album.blurPicUrl; 

		// Title
		$info.find('.title').html(musicObj.album.name);
		
		// Audio
		audio.src = musicObj.mp3Url;
		audio.play();
	}

	function query(){
		audio = document.createElement('audio');
		$.get('/api/fm/playlist/'+PLAYLIST,function(data) {
			if(data && data.code === 200){
				console.log(data);
				musicList = data.result.tracks;
				
				load(musicList[currentIndex]);

			}
		});
	}
	
	// volume
	$volumeRange.onchange = function () {

		if(audio && audio.src!==''){
			audio.volume = $volumeRange.value / 10;
		};
	};

	// next
	$next.click(function(e){
		e.preventDefault();
		if(currentIndex < musicList.length){
			++currentIndex;
			load(musicList[currentIndex]);
		}
	});

	// play&pause
	$playToogle.click(function(e){
		e.preventDefault();
		if(audio){
			if(audio.paused){
				audio.play();
			}else{
				audio.pause();
			}
		}
	});
		
	query();

	if(audio){

		audio.addEventListener('play',function(){
			$playToogle.children('.fa-play').hide();
			$playToogle.children('.fa-pause').show();
		});

		audio.addEventListener('pause',function(){
			$playToogle.children('.fa-play').show();
			$playToogle.children('.fa-pause').hide();
		});

		audio.addEventListener('ended',function(){
			++currentIndex;
			load(musicList[currentIndex]);
		});
	}
};


exports.init = init;