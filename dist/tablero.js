class tablero {
  constructor(estado = "", turno = -1, nivel = 0, movimiento = "99") {
    this.estado = this.estadoArreglo(estado);
    this.estadoCadena = estado;
    this.turno = turno;
    this.nivel = nivel;
    this.sucesores = [];
    this.movimiento = movimiento;
    this.heuristica = this.calculoHeuristica(estado);
  }

  estadoArreglo(estado) {
    let e = Array.from(estado);
    let arr = [];
    while (e.length > 0) {
      let a = e.splice(0, 8);
      a = a.map((x) => {
        return parseInt(x, 10);
      });
      arr.push(a);
    }
    return arr;
  }

  fichasActuales(estado) {
    let r = [];
    estado.forEach((fila, i) => {
      fila.forEach((columna, j) => {
        if (columna === this.turno) r.push([i, j]);
      });
    });
    return r;
  }

  analizarFicha(ficha) {
    let r = [];
    let filFicha = ficha[0];
    let colFicha = ficha[1];
    let enemigo = this.turno == 1 ? 0 : 1;
    //analizar izquierda
    if (colFicha - 1 >= 0 && this.estado[filFicha][colFicha - 1] == enemigo) {
      let col = colFicha - 1;
      let cont = 0;
      while (col >= 0 && this.estado[filFicha][col] == enemigo) {
        cont += 1;
        col -= 1;
      }
      if (cont > 0 && col >= 0) {
        r.push([filFicha, col]);
      }
    }
    //analizar derecha
    if (colFicha + 1 < 8 && this.estado[filFicha][colFicha + 1] == enemigo) {
      let col = colFicha + 1;
      let cont = 0;
      while (col < 8 && this.estado[filFicha][col] == enemigo) {
        cont += 1;
        col += 1;
      }
      if (cont > 0 && col < 8) {
        r.push([filFicha, col]);
      }
    }
    //analizar arriba
    if (filFicha - 1 >= 0 && this.estado[filFicha - 1][colFicha] == enemigo) {
      let fil = filFicha - 1;
      let cont = 0;
      while (fil >= 0 && this.estado[fil][colFicha] == enemigo) {
        cont += 1;
        fil -= 1;
      }
      if (cont > 0 && fil >= 0) {
        r.push([fil, colFicha]);
      }
    }
    //analizar abajo
    if (filFicha + 1 < 8 && this.estado[filFicha + 1][colFicha] == enemigo) {
      let fil = filFicha + 1;
      let cont = 0;
      while (fil < 8 && this.estado[fil][colFicha] == enemigo) {
        cont += 1;
        fil += 1;
      }
      if (cont > 0 && fil < 8) {
        r.push([fil, colFicha]);
      }
    }
    //analizar arriba-izquierda
    if (
      filFicha - 1 >= 0 &&
      colFicha - 1 >= 0 &&
      this.estado[filFicha - 1][colFicha - 1] == enemigo
    ) {
      let fil = filFicha - 1;
      let col = colFicha - 1;
      let cont = 0;
      while (fil >= 0 && col >= 0 && this.estado[fil][col] == enemigo) {
        cont += 1;
        fil -= 1;
        col -= 1;
      }
      if (cont > 0 && fil >= 0 && col >= 0) {
        r.push([fil, col]);
      }
    }
    //analizar arriba-derecha
    if (
      filFicha - 1 >= 0 &&
      colFicha + 1 < 8 &&
      this.estado[filFicha - 1][colFicha + 1] == enemigo
    ) {
      let fil = filFicha - 1;
      let col = colFicha + 1;
      let cont = 0;
      while (fil >= 0 && col < 8 && this.estado[fil][col] == enemigo) {
        cont += 1;
        fil -= 1;
        col += 1;
      }
      if (cont > 0 && fil >= 0 && col < 8) {
        r.push([fil, col]);
      }
    }
    //analizar abajo-izquierda
    if (
      filFicha + 1 < 8 &&
      colFicha - 1 >= 0 &&
      this.estado[filFicha + 1][colFicha - 1] == enemigo
    ) {
      let fil = filFicha + 1;
      let col = colFicha - 1;
      let cont = 0;
      while (fil < 8 && col >= 0 && this.estado[fil][col] == enemigo) {
        cont += 1;
        fil += 1;
        col -= 1;
      }
      if (cont > 0 && fil < 8 && col >= 0) {
        r.push([fil, col]);
      }
    }
    //analizar abajo-derecha
    if (
      filFicha + 1 < 8 &&
      colFicha + 1 < 8 &&
      this.estado[filFicha + 1][colFicha + 1] == enemigo
    ) {
      let fil = filFicha + 1;
      let col = colFicha + 1;
      let cont = 0;
      while (fil < 8 && col < 8 && this.estado[fil][col] == enemigo) {
        cont += 1;
        fil += 1;
        col += 1;
      }
      if (cont > 0 && fil < 8 && col < 8) {
        r.push([fil, col]);
      }
    }
    return r;
  }

  llenarTablero(tablero) {
    let enemigo = this.turno == 1 ? 0 : 1;
    let fichasActuales = this.fichasActuales(tablero);
    for (const ficha of fichasActuales) {
      let filFicha = ficha[0];
      let colFicha = ficha[1];
      //llenar izquierda
      let cont = 0;
      let col = colFicha - 1;
      while (col >= 0 && tablero[filFicha][col] == enemigo) {
        col -= 1;
        cont += 1;
      }
      if (cont > 0 && col >= 0 && tablero[filFicha][col] == this.turno) {
        while (cont > 0) {
          tablero[filFicha][col + 1] = this.turno;
          col += 1;
          cont -= 1;
        }
      }
      //llenar derecha
      cont = 0;
      col = colFicha + 1;
      while (col < 8 && tablero[filFicha][col] == enemigo) {
        col += 1;
        cont += 1;
      }
      if (cont > 0 && col < 8 && tablero[filFicha][col] == this.turno) {
        while (cont > 0) {
          tablero[filFicha][col - 1] = this.turno;
          col -= 1;
          cont -= 1;
        }
      }
      //llenar arriba
      cont = 0;
      let fil = filFicha - 1;
      while (fil >= 0 && tablero[fil][colFicha] == enemigo) {
        fil -= 1;
        cont += 1;
      }
      if (cont > 0 && fil >= 0 && tablero[fil][colFicha] == this.turno) {
        while (cont > 0) {
          tablero[fil + 1][colFicha] = this.turno;
          fil += 1;
          cont -= 1;
        }
      }
      //llenar abajo
      cont = 0;
      fil = filFicha + 1;
      while (fil < 8 && tablero[fil][colFicha] == enemigo) {
        fil += 1;
        cont += 1;
      }
      if (cont > 0 && fil < 8 && tablero[fil][colFicha] == this.turno) {
        while (cont > 0) {
          tablero[fil - 1][colFicha] = this.turno;
          fil -= 1;
          cont -= 1;
        }
      }
      //llenar arriba-izquierda
      cont = 0;
      fil = filFicha - 1;
      col = colFicha - 1;
      while (fil >= 0 && col >= 0 && tablero[fil][col] == enemigo) {
        fil -= 1;
        col -= 1;
        cont += 1;
      }
      if (cont > 0 && fil >= 0 && col >= 0 && tablero[fil][col] == this.turno) {
        while (cont > 0) {
          tablero[fil + 1][col + 1] = this.turno;
          fil += 1;
          col += 1;
          cont -= 1;
        }
      }
      //llenar arriba-derecha
      cont = 0;
      fil = filFicha - 1;
      col = colFicha + 1;
      while (fil >= 0 && col < 8 && tablero[fil][col] == enemigo) {
        fil -= 1;
        col += 1;
        cont += 1;
      }
      if (cont > 0 && fil >= 0 && col < 8 && tablero[fil][col] == this.turno) {
        while (cont > 0) {
          tablero[fil + 1][col - 1] = this.turno;
          fil += 1;
          col -= 1;
          cont -= 1;
        }
      }
      //llenar abajo-izquierda
      cont = 0;
      fil = filFicha + 1;
      col = colFicha - 1;
      while (fil < 8 && col >= 0 && tablero[fil][col] == enemigo) {
        fil += 1;
        col -= 1;
        cont += 1;
      }
      if (cont > 0 && fil < 8 && col >= 0 && tablero[fil][col] == this.turno) {
        while (cont > 0) {
          tablero[fil - 1][col + 1] = this.turno;
          fil -= 1;
          col += 1;
          cont -= 1;
        }
      }
      //llenar abajo-derecha
      cont = 0;
      fil = filFicha + 1;
      col = colFicha + 1;
      while (fil < 8 && col < 8 && tablero[fil][col] == enemigo) {
        fil += 1;
        col += 1;
        cont += 1;
      }
      if (cont > 0 && fil < 8 && col < 8 && tablero[fil][col] == this.turno) {
        while (cont > 0) {
          tablero[fil - 1][col - 1] = this.turno;
          fil -= 1;
          col -= 1;
          cont -= 1;
        }
      }
    }
    let nest = "";
    for (const fila of tablero) {
      nest += fila.join("");
    }
    return nest;
  }

  generarSucesores() {
    let r = [];
    let fichasActuales = this.fichasActuales(this.estado);
    for (const ficha of fichasActuales) {
      const posiblesMovimientos = this.analizarFicha(ficha);
      for (const movimiento of posiblesMovimientos) {
        let e = JSON.parse(JSON.stringify(this.estado));
        e[movimiento[0]][movimiento[1]] = this.turno;
        let lleno = this.llenarTablero(e);
        let enemigo = this.turno == 1 ? 0 : 1;
        let tableroSucesor = new tablero(
          lleno,
          enemigo,
          this.nivel + 1,
          `${movimiento[0]}${movimiento[1]}`
        );
        r.push(tableroSucesor);
      }
    }
    return r;
  }

  calculoHeuristica(estado) {
    let enemigo = this.turno == 1 ? 0 : 1;
    let fichasTurno = (estado.match(new RegExp(this.turno, "g")) || []).length;
    let fichasEnemigo = (estado.match(new RegExp(enemigo, "g")) || []).length;
    return fichasTurno - fichasEnemigo;
  }

  minmax(maximizar = true) {
    if (this.nivel >= 5) return [this.heuristica, this.movimiento];
    this.sucesores = this.generarSucesores();
    let min = -999999;
    let max = 999999;
    let movMin, movMax;
    for (const sucesor of this.sucesores) {
      let r = sucesor.minmax(!maximizar);
      if (min == -999999) {
        min = r[0];
        movMin = sucesor.movimiento;
      } else if (r[0] < min) {
        min = r[0];
        movMin = sucesor.movimiento;
      }
      if (max == 999999) {
        max = r[0];
        movMax = sucesor.movimiento;
      } else if (r[0] > max) {
        max = r[0];
        movMax = sucesor.movimiento;
      }
    }
    return maximizar ? [max, movMax] : [min, movMin];
  }
}
