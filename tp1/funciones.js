function pantallaInicio() {
  mostrarFondo(0);

  let tiempo = millis() - tiempoInicio;

  // fade pntalla inicio
  if (tiempo > 6000) {
    fill(0, map(tiempo, 6000, 8000, 0, 255));
    rect(0, 0, width, height);
  }

  if (tiempo > 8000) cambiarPantalla(1);
}

function escritorio() {
  mostrarFondo(1);


  webcamFrame = actualizarFrame(webcamFrame, webcamFrames.length, velocidad, false);
  dibujarFrame(webcamFrames, webcamFrame, 0, 0, width, height);

  // cursor inicia stream
  cursorX = moverHacia(cursorX, 65, 4);
  cursorY = moverHacia(cursorY, 350, 4);
  image(cursor, cursorX, cursorY, 32, 32);

  if (!sonidoClick && cursorX == 65 && cursorY == 350) {
    click.play();
    sonidoClick = true;
    tiempoClick = millis();
  }

  if (sonidoClick && millis() - tiempoClick > 1000) cambiarPantalla(2);
}

function escritorioBoton() {
  mostrarFondo(2);

  dibujarFrame(webcamFrames, webcamFrame, 0, 0, width, height);

  let tiempo = millis() - tiempoInicio;
  if (tiempo > 500) cambiarPantalla(3);
}

function Stream() {
  mostrarFondo(3);

  if (!cancionEmpezo && !boot.isPlaying()) {
    cancion.loop();
    cancionEmpezo = true;
  }

  animarPersonaje();
  
  image(webcam2, 0, 0, width, height);

  mostrarComentarios();
}

function Reinicio() {
  image(boton, 0, 0, width, height);
  image(cursor, mouseX, mouseY, 32, 32);
}


function animarPersonaje() {
  if (estado == 1) {
    personajeY = moverHacia(personajeY, personajeYDestino, 3);
    frame = actualizarFrame(frame, kangel2.length, velocidad, false);
    dibujarFrame(kangel2, frame, personajeX, personajeY, 450, 450);

    if (frame >= kangel2.length - 1 && personajeY == personajeYDestino) {
      estado = 0;
      frame = 0;
    }
  } else {
    frame = actualizarFrame(frame, kangel1.length, velocidad, true);
    dibujarFrame(kangel1, frame, personajeX, personajeYDestino, 450, 450);
  }
}


// coso para agregar comentarios x segundo

function mostrarComentarios() {
  if (comentariosVisibles < comentarios.length &&
      millis() - tiempoUltimoComentario > 1000) {
    comentariosVisibles++;
    tiempoUltimoComentario = millis();
  }

  for (let i = 0; i < comentariosVisibles; i++) {
    image(comentarios[i], 0, 0, width, height);
  }

  if (comentariosVisibles >= comentarios.length) {
    if (finAnimacion == 0) finAnimacion = millis();
    if (millis() - finAnimacion > 1000) cambiarPantalla(4);
  }
}


function mostrarFondo(i) {
  image(fondos[i], 0, 0, width, height);
}


function actualizarFrame(posicion, total, velocidad, loop) {
  if (frameCount % velocidad == 0) {
    posicion = posicion + 1;

    if (posicion >= total) {
      if (loop) {
        posicion = 0;          
      } else {
        posicion = total - 1; 
      }
    }
  }

  return posicion;
}

function dibujarFrame(frames, posicion, x, y, ancho, alto) {
  let img = frames[posicion];

  let factorAncho = ancho / img.width;
  let factorAlto = alto / img.height;

  let escala = min(factorAncho, factorAlto);

  image(img, x, y, img.width * escala, img.height * escala);
}

function moverHacia(posicionActual, destino, avance) {
  if (posicionActual < destino) {
    if (destino - posicionActual <= avance) {
      return destino;
    } else {
      return posicionActual + avance;
    }
  } else if (posicionActual > destino) {
    if (posicionActual - destino <= avance) {
      return destino;
    } else {
      return posicionActual - avance;
    }
  } else {
    return destino;
  }
}

function cambiarPantalla(nuevaPantalla) {
  fondo = nuevaPantalla;
  tiempoInicio = millis();
  frame = 0;
  sonidoClick = false;
  finAnimacion = 0;

  let vaAlStream = (nuevaPantalla == 3);

  if (vaAlStream) {
    estado = 1;
    personajeY = 374;
    comentariosVisibles = 0;
    tiempoUltimoComentario = millis();
  }
}


function reiniciar() {
  fondo = 0;
  estado = 0;
  frame = 0;
  webcamFrame = 0;
  tiempoInicio = millis();

  cursorX = 400;
  cursorY = 500;
  sonidoClick = false;

  personajeY = 374;
  comentariosVisibles = 0;
  cancionEmpezo = false;
  finAnimacion = 0;

  if (cancion.isPlaying()) cancion.stop();
  if (boot.isPlaying()) boot.stop();
  boot.play();
}
