//Get Elements
const player      = document.querySelector('.player');
const video       = player.querySelector('.viewer');
const progress    = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle      = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges      = player.querySelectorAll('.player__slider');
const full        = player.querySelector('.fullScreen');

//Functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
  // console.log(method)
    // if (video.paused) {
    //   video.play()
    // } else {
    //   video.pause()
    // }
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

function fullScreenVideo() {
  //console.log(webkitDisplayingFullscreen:false);
  console.log(video.webkitDisplayingFullscreen);
  console.dir(video);
  video.webkitDisplayingFullscreen = true
}
// video.controls = true
fullScreenVideo()


//Space bar for pause
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    togglePlay()
  }
})


video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) =>  mousedown && scrub(e))
progress.addEventListener('mousedown', () =>  mousedown = true)
progress.addEventListener('mouseup',   () =>  mousedown = false)
let mousedown = false

toggle.addEventListener('click', togglePlay)

ranges.forEach(range => {
range.addEventListener('change', handleRangeUpdate)
})


skipButtons.forEach(item => {
item.addEventListener('click', skip);
});