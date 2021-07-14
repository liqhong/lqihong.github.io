const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const squareSize = 60;
let gridWidthMax;
let gridHeightMax;

const colors = ['white', 'black', 'red', 'yellow'];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  gridWidthMax = canvas.width / squareSize;
  gridHeightMax = canvas.height / squareSize;
}

resize();

let offset = 0;
let noise = new Noise(Math.random());

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for(let i=0; i < gridWidthMax + 1;i++) {
    for(let j=0; j < gridHeightMax + 1;j++) {
      let value = noise.simplex2(i * squareSize + offset, j * squareSize) + 1;
      ctx.fillStyle=`hsl(${value * 30 + 240}, 100%, ${value * 20 + 20}%`;
      ctx.fillRect(i * squareSize-squareSize/2, j * squareSize -squareSize/2, squareSize, squareSize);
      const color = (i + j) % 4;
      
      ctx.beginPath();
      ctx.fillStyle= colors[color];
      ctx.arc(i * squareSize-squareSize/2, j * squareSize -squareSize/2, 6, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.fillStyle= colors[(color + 1) % 4];
      ctx.beginPath();
      ctx.arc(i * squareSize-squareSize/2, j * squareSize -squareSize/2, 6, 0, value * Math.PI);
      ctx.fill();
      
      //lines
      ctx.beginPath()
      ctx.strokeStyle = colors[(color + 2) % 4];
      ctx.moveTo(i * squareSize, j * squareSize);
      ctx.lineTo(i * squareSize - squareSize * value / 2, j * squareSize)

      ctx.moveTo(i * squareSize, j * squareSize);
      ctx.lineTo(i * squareSize, j * squareSize - squareSize * value / 2)
      ctx.stroke();
      
      ctx.fillStyle=colors[color];
      const size = 3 * value
      ctx.fillRect(i * squareSize - size / 2, j * squareSize - size / 2, size, size);
    }
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max- min + 1)) + min;
}

function loop() {
  requestAnimationFrame(loop);
  
  offset += 0.01;
  drawGrid();
}

loop();

window.addEventListener('resize', () => resize());