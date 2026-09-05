//  arreglos
let kangel1 = [];      
let kangel2 = [];      
let webcamFrames = [];    
let fondos = [];       
let comentarios = [];  


// variables
let boton, webcam2, cursor, click, boot, cancion;
let fondo = 0;   

let estado = 0;  
let frame = 0;      
let webcamFrame = 0;   
let velocidad = 8;  

let tiempoInicio = 0;
let sonidoClick = false;
let tiempoClick = 0;
let cancionEmpezo = false;
let finAnimacion = 0;

let cursorX = 400, cursorY = 500;
let personajeX = 60, personajeY = 374;
let personajeYDestino = 60;

let comentariosVisibles = 0;
let tiempoUltimoComentario = 0;


// imagenes y audioostiatio

function preload() {
  
  for (let i = 1; i <= 4; i++) kangel1.push(loadImage("data/a" + i + ".png"));
  for (let i = 1; i <= 10; i++) kangel2.push(loadImage("data/kangel" + i + ".png"));
  for (let i = 1; i <= 5; i++) webcamFrames.push(loadImage("data/C" + i + ".png"));
  for (let i = 1; i <= 4; i++) fondos.push(loadImage("data/B" + i + ".jpg"));
  for (let i = 1; i <= 7; i++) comentarios.push(loadImage("data/D" + i + ".png"));
  
  boton = loadImage("data/BOTON1.png");
  cursor = loadImage("data/CURSORWAW.png");
  webcam2 = loadImage("data/B5.png");
  
  soundFormats("mp3");
  click = loadSound("data/Click");
  boot = loadSound("data/Boot");
  cancion = loadSound("data/Angel_boring"); 
}

function setup() {
  createCanvas(800, 600);
  noCursor();
  reiniciar();
}


// cambio de pantnallas
function draw() {
  background(0);
  if (fondo == 0) pantallaInicio();
  else if (fondo == 1) escritorio();
  else if (fondo == 2) escritorioBoton();
  else if (fondo == 3) Stream();
  else if (fondo == 4) Reinicio();
}


// reinicio
function mousePressed() {
  let dentroDelBoton =
    mouseX >= 315 && mouseX <= 454 &&
    mouseY >= 340 && mouseY <= 363;
  if (fondo == 4 && dentroDelBoton) reiniciar();
}
