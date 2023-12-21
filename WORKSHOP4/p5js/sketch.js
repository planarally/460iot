let baseURL0 = "https://io.adafruit.com/api/v2/planarally/feeds/temp/data?";
let baseURL1 = "https://io.adafruit.com/api/v2/planarally/feeds/light/data?";
let limitKey = "";
let limitVal = "";
let includeKey = "include=";
let includeVal = "value,created_at";
let radii0 = [];
let radii1 = [];
let map0;
let map1;

function preload() {
  fetchData();
}

function setup() {
  createCanvas(800, 600)
  colorMode(HSB, TWO_PI, 1, 1, 1)
  setInterval(fetchData, 5000)
  map0 = createMap(220, 3650, 0, 100)
  map1 = createMap(1820, 2190, PI, PI+HALF_PI)
  
  background(0, 0, 1);
  noStroke();
  
  // Pass map0 for size and map1 for color
  drawCircles(radii0, 0, map0, map1);
}

function createMap(inputMin, inputMax, outputMin, outputMax) {
  return function (value) {
    return map(value, inputMin, inputMax, outputMin, outputMax);
  }
}

function draw() {
}

function drawCircles(radii, feedIndex, mapFunctionSize, mapFunctionColor) {
  for (let i = 0; i < radii.length; i++) {
    let x = random(width);
    let y = random(height);
    
    // Adjust the size scaling factor
    let radius = mapFunctionSize(radii[i]);
    
    // Map temperature values to color
    let hue = mapFunctionColor(radii[i]);
    console.log("Hue:", hue);  // Log the hue value to the console
    
    let fillColor = color(hue, 0.8, 0.8, 0.3);
    
    fill(fillColor);
    circle(x, y, radius);
  }
}

function fetchData() {
  loadJSON(baseURL0 + includeKey + includeVal, resultHandler(radii0), errorHandler);
  loadJSON(baseURL1 + includeKey + includeVal, resultHandler(radii1), errorHandler);
}

function resultHandler(radii) {
  return function (result) {
    radii.length = 10; // Ensure a minimum length for the array

    // Select a random subset of values without shuffling the entire array
    for (let i = 0; i < 100; i++) {
      let randomIndex = Math.floor(Math.random() * result.length);
      radii.push(result[randomIndex].value);
    }
  };
}


function customShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function errorHandler(error) {
  console.error(error);
}
