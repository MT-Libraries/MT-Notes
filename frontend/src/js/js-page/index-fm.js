/**
 * Created by thonatos on 14/12/7.
 */

var init = function () {
	
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
				//console.log(data);
				musicList = data.result.tracks;
				
				load(musicList[currentIndex]);

			}
		});
	}
	
	// volume
	$volumeRange.onchange = function () {

		if(audio && audio.src!==''){
			audio.volume = $volumeRange.value / 10;
		}
	};

	// next
	$next.click(function(e){
		e.preventDefault();
		if(currentIndex < musicList.length){
			++currentIndex;
			load(musicList[currentIndex]);
		}else{
            currentIndex = 0;
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

init();


$('.mt-nav-header').removeClass('white');
$('.mt-nav-header').addClass('nav-fm');