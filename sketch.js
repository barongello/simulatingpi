let seed = new Date().getTime();
let circleRadius = 160;
let circleSize = circleRadius * 2;
let prngHits = 0;
let prgnPi = 0;
let pointsPerCycle = 1;
let pointsPerCycleP;
let pointsPerCycleS;
let outputP;
let qrngHits = 0;
let qrngPi = 0;
let index = 1;

function halton(i, b) {
  let f = 1;
  let r = 0;

  while (i > 0) {
    f = f / b;
    r += f * (i % b);
    i = Math.floor(i / b);
  }
  
  return r;
}

function PRNG() {
  let x = map(Math.random(), 0, 1, -1, 1);
  let y = map(Math.random(), 0, 1, -1, 1);
  let d = Math.sqrt(x * x + y * y);
  let r;

  if (d <= 1) {
    stroke(0, 255, 0);
    r = true;
  }
  else {
    stroke(0, 0, 255);
    r = false;
  }

  point(circleRadius + x * circleRadius, circleRadius + y * circleRadius);

  return r;
}

function QRNG() {
  let x = map(halton(seed + index, 2), 0, 1, -1, 1);
  let y = map(halton(seed + index, 3), 0, 1, -1, 1);
  let d = Math.sqrt(x * x + y * y);
  let r;

  if (d <= 1) {
    stroke(0, 255, 0);
    r = true;
  }
  else {
    stroke(0, 0, 255);
    r = false;
  }

  point(circleSize + circleRadius + x * circleRadius, circleRadius + y * circleRadius);

  return r;
}

function setup() {
  createCanvas(circleSize * 2, circleSize);

  pointsPerCycleP = createP('Points per cycle: ' + pointsPerCycle);
  pointsPerCycleS = createSlider(1, 10000, pointsPerCycle, 1);

  pointsPerCycleS.changed(() => {
    pointsPerCycle = pointsPerCycleS.value();

    pointsPerCycleP.html('Points per cycle: ' + pointsPerCycle);
  });

  let html = 'PRNG Pi = 0<br />';

  html += 'QRNG Pi = 0<br />';
  html += '<br />';
  html += 'Points = 0<br />';
  html += '<br />';
  html += 'PRNG Hits = 0<br />';
  html += 'QRNG Hits = 0';

  outputP = createP(html);

  background(0);

  stroke(255);
  strokeWeight(4);
  noFill();

  ellipse(circleRadius, circleRadius, circleSize, circleSize);
  ellipse(circleSize + circleRadius, circleRadius, circleSize, circleSize);
}

function draw() {
  for (let i = 0; i < pointsPerCycle; ++i) {
    if (PRNG()) {
      ++prngHits;

      prngPi = 4 * prngHits / index;
    }

    if (QRNG()) {
      ++qrngHits;

      qrngPi = 4 * qrngHits / index;
    }

    ++index;
  }

  let html = 'PRNG Pi = ' + prngPi + '<br />';

  html += 'QRNG Pi = ' + qrngPi + '<br />';
  html += '<br />';
  html += 'Points = ' + (index - 1) + '<br />';
  html += '<br />';
  html += 'PRNG Hits = ' + prngHits + '<br />';
  html += 'QRNG Hits = ' + qrngHits;

  outputP.html(html);
}
