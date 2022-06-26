let pos = 0;
const pacArray = [
  ['images/pacman1.png', 'images/pacman2.png'],
  ['images/pacman3.png', 'images/pacman4.png'],
];

// Array to hold references to all pacmen
const pacMen = [];

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // Returns an object with random x and y values
  let velocity = setToRandom(10);

  // Set position to somewhere within the viewable window
  let position = setToRandom(
    window.innerHeight < window.innerWidth
      ? window.innerHeight - 100
      : window.innerWidth - 100
  );

  // Add image to div id = 'game'
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = 'images/pacman1.png';
  newimg.width = 100;
  newimg.direction = 0;
  newimg.mouthPosition = 0;
  newimg.frameCount = 0;

  game.appendChild(newimg);

  // Return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // Loop over the pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);

    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    // Update the mouth animation every 10 movement frames
    if (item.newimg.frameCount > 10) {
      updateAnimation(item);
      item.newimg.frameCount = 0;
    }
    item.newimg.frameCount += 1;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // Detect collisions and make pacman bounce

  if (item.position.x >= window.innerWidth - 100 || item.position.x <= 0) {
    item.velocity.x *= -1;
    item.newimg.direction = 1 - item.newimg.direction;
    updateAnimation(item); // update the animation immediately if a collision occurs to avoid moving 'bckwards' initially upon movement direction change
  }
  if (item.position.y >= window.innerHeight - 100 || item.position.y <= 0) {
    item.velocity.y *= -1;
  }
  return item.newimg.direction;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

function updateAnimation(item) {
  // Flip between open and closed mouth animations
  item.newimg.src = pacArray[item.newimg.direction][item.newimg.mouthPosition];
  item.newimg.mouthPosition = 1 - item.newimg.mouthPosition;
}
