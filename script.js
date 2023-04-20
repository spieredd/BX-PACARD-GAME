import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")
const pacard_song = document.getElementById("pacard_song")

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale
let score
function update(time) {
  if (window.innerWidth <= 1200) {
    
  } else {
    if (lastTime == null) {
      lastTime = time
      window.requestAnimationFrame(update)
      return
    }
    const delta = time - lastTime


    updateScore(delta)
    lastTime = time


    updateGround(delta, speedScale)
    updateDino(delta, speedScale)

    updateCactus(delta, speedScale)
    updateSpeedScale(delta)
    if (checkLose()) return handleLose()


  }


  window.requestAnimationFrame(update)


}

function checkLose() {
  const dinoRect = getDinoRect()
  return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {

  if (window.innerWidth > 1200) {
    return (
      rect1.left < rect2.right * 0.8 &&
      rect1.top < rect2.bottom * 0.8 &&
      rect1.right > rect2.left * 0.8 &&
      rect1.bottom > rect2.top * 0.8
    )

  }



}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)

}

function handleStart() {
  if (window.innerWidth <= 1200) {
    alert("The game is not available on phone or tablet yet. Please play on your PC ;)")
  }
  pacard_song.play()
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupDino()
  setupCactus()
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
}

function handleLose() {
  pacard_song.pause();
  pacard_song.currentTime = 0
  setDinoLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenElem.classList.remove("hide")
  }, 100)
}

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}