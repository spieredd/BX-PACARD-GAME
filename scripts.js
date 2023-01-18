const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

function bringsound(){
  document.getElementById('mySound').play();

}

function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump");

    setTimeout(function () {
      dino.classList.remove("jump");
    }, 300);
  }
}

let isAlive = setInterval(function () {
  // get current dino Y position
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

  // get current cactus X position
  let cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("left")
  );



  // detect collision
  if (cactusLeft < 30 && cactusLeft > 0 && dinoTop >= 140) {
    // collision
    alert("The statement of the theorem was quite long but the proof is quite false");
    window.getComputedStyle(cactus).left="580px"
    console.log(window.getComputedStyle(cactus).left)
  }
}, 10);

document.addEventListener("keydown", function (event) {
  jump();
});