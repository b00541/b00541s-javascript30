//============
//GET ELEMENTS
//============
const player      = document.querySelector('.player');
const video       = player.querySelector('.viewer');
const progress    = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle      = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges      = player.querySelectorAll('.player__slider');
const full        = player.querySelector('.fullScreen');

//=========
//FUNCTIONS
//=========
function togglePlay() {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}

function skip() {
video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
  video[this.name] = this.value
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
const scrubTime =(e.offsetX / progress.offsetWidth) *video.duration
video.currentTime = scrubTime
}

function toggleFullScreen(e) {
  if (isFullScreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else {
      console.error('Unable to find a fullscreen exit method.');
    }
    console.log('removing fullscreen class');
  } else {
    if (player.requestFullscreen) {
      player.requestFullscreen(); // standard
    } else if (player.webkitRequestFullscreen) {
      player.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    } else if (player.msRequestFullscreen) {
      player.msRequestFullscreen();
    } else {
      console.error('Unable to find a fullscreen request method');
    }
  }
}

function toggleFullScreenClasses() {
  player.classList.toggle('fullscreen');
  isFullScreen = !isFullScreen;
}

let isFullScreen = false;

//===============
//EVENT LISTENERS
//===============



//Space bar for pause
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    togglePlay()
  }
})
//forward and back skip on left and right button press
window.addEventListener('keydown', (e) => {
  // console.log(e.key);
  if (e.key === 'ArrowRight') {
    video.currentTime += 10
  }
})
window.addEventListener('keydown', (e) => {
  // console.log(e.key);
  if (e.key === 'ArrowLeft') {
    video.currentTime -= 10
  }
})
window.addEventListener('keydown', (e) => {
  // console.log(e.key);
  if (e.key === 'ArrowUp') {
    video.volume += 0.5
  }
})
window.addEventListener('keydown', (e) => {
  // console.log(e.key);
  if (e.key === 'ArrowDown') {
    video.volume -= 0.5
  }
})



// Press f to pay respect
window.addEventListener('keydown', (e) => {
  // console.log(e.key);
  if (e.key === 'f') {
    toggleFullScreen()
  }
})

full.addEventListener('click', toggleFullScreen);

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) =>  mousedown && scrub(e))
progress.addEventListener('mousedown', () =>  mousedown = true)
progress.addEventListener('mouseup',   () =>  mousedown = false)

toggle.addEventListener('click', togglePlay)

ranges.forEach(range => {
range.addEventListener('change', handleRangeUpdate)
})

skipButtons.forEach(item => {
item.addEventListener('click', skip);
});

document.addEventListener('fullscreenchange', toggleFullScreenClasses);
document.addEventListener('mozfullscreenchange', toggleFullScreenClasses);
document.addEventListener('webkitfullscreenchange', toggleFullScreenClasses);
document.addEventListener('msfullscreenchange', toggleFullScreenClasses);