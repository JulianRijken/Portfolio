let pillars = [];

let i = 0;
let j = 0;

function setup() 
{
  
  createCanvas(windowWidth, windowHeight);
  
  pillars = new Array(width);
  
  for (let i = 0; i < pillars.length; i++) 
    pillars[i] = random(height);
  

}

function draw() 
{
  
  background(30);

  sortPillars();

  for (let i = 0; i < pillars.length; i++) 
  {
    stroke(255);
    line(i, height, i, height - pillars[i]);
  }
  
}



function sortPillars()
{
  
    for (let i = 0; i < 1; i++) 
    {
      for (let i = 0; i < pillars.length; i++) 
      {
        if(pillars[i] > pillars[i+ 1])
        swap(pillars, i, i + 1);
      }
    }
  
  
  /*
   if (i < pillars.length) 
  {
    for (let j = 0; j < pillars.length - i - 1; j++) {
      let a = pillars[j];
      let b = pillars[j + 1];
      if (a > b) {
        swap(pillars, j, j + 1);
      }
    }
  } else {
    console.log("finished");
    noLoop();
  }
  i++; 
  
  */
}



function swap(arr, a, b) 
{
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}