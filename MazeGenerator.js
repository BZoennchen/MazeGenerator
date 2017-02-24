var cells = [];
var stack = [];
var w;
var rows;
var cols;
var current;
var stack;
var numVisited;
var distance;
var width;
var height;

function setup() {
  colorMode(HSB, 360, 100, 100);
  //createCanvas(windowWidth, windowHeight); 
  width = 600;
  height = 600;
  createCanvas(width, height); 
  background(100);
  w = 10;
  rows = floor(height / w);
  cols = floor(width / w);
  
  for(var y = 0; y < rows; y++) {
  	for(var x = 0; x < cols; x++) {
      	var cell = new Cell(x, y, w);
     	cells.push(cell);
    }
  }
 
  current = cells[0];
  numVisited = 1;
  distance = 0;
  current.visit();
  frameRate(25);
} 

function draw() {
  background(0);
  for(var i = 0; i < cells.length; i++){
  	cells[i].show();
  }

  fill(255);
  rect(current.x*w, current.y*w, w, w);

  if (numVisited < cells.length) {
    var next = randomNeighbour(current);

    if (next != undefined) {
      stack.push(current);
      removeWall(current, next);
      current = next;
      numVisited++;
      current.visit();
      distance++;
    } else if(stack.length != 0) {
      current = stack.pop();
      distance = current.distance;
    }
  }
}

function Cell(x, y, w) {
	this.x = x;
  	this.y = y;
  	this.w = w;
 	this.walls = [true, true, true, true]
 	this.visited = false;
  	this.distance = 0;
  
  	this.visit = function() {
    	this.visited = true;
      	this.distance = distance;
    }
  
  	this.show = function() {
      	noStroke();
  		if(this.visited) {
      		fill(this.distance % 360, 80, 80);
      		rect(this.x*this.w, this.y*this.w, this.w, this.w);
    	}
      	var strokeWidth = 2;
        var w = this.w - strokeWidth;
      	strokeWeight(2);
    	stroke(255);
      
      	if (this.walls[0]) {
      		line(this.x*this.w, this.y*this.w, this.x*this.w + w , this.y*this.w);
    	}

    	if (this.walls[1]) {
      		line(this.x*this.w + this.w, this.y*this.w, this.x*this.w + this.w, this.y*this.w + w);
    	}

    	if (this.walls[2]) {
      		line(this.x*this.w, this.y*this.w + this.w, this.x*this.w + w, this.y*this.w + this.w);
    	}

    	if (this.walls[3]) {
      		line(this.x*this.w, this.y*this.w, this.x*this.w, this.y*this.w + w);
    	}
    }
}

function removeWall(c1, c2) {
  var xdiff = c1.x - c2.x;
  var ydiff = c1.y - c2.y;

  if (xdiff === 1) {
    c1.walls[3] = false;
    c2.walls[1] = false;
  } else if (xdiff == -1) {
    c1.walls[1] = false;
    c2.walls[3] = false;
  }

  if (ydiff === 1) {
    c1.walls[0] = false;
    c2.walls[2] = false;
  } else if (ydiff == -1) {
    c1.walls[2] = false;
    c2.walls[0] = false;
  }
}

function index(x, y) {
	return y * rows + x;
}

function randomNeighbour(cell) {
  var neighbours = [];

  if (cell.x > 0) {
    var candidate = cells[index(cell.x-1, cell.y)];
    if (!candidate.visited) {
      neighbours.push(candidate);
    }
  }

  if (cell.x < cols-1) {
    var candidate = cells[index(cell.x+1, cell.y)];
    if (!candidate.visited) {
      neighbours.push(candidate);
    }
  }

  if (cell.y > 0) {
    var candidate = cells[index(cell.x, cell.y-1)];
    if (!candidate.visited) {
      neighbours.push(candidate);
    }
  }

  if (cell.y < rows-1) {
    var candidate = cells[index(cell.x, cell.y+1)];
    if (!candidate.visited) {
      neighbours.push(candidate);
    }
  }

  if (neighbours.length === 0) {
    return undefined;
  } else {
    var r = floor(random(0, neighbours.length));
    return neighbours[r];
  }
}
