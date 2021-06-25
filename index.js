let query = new URLSearchParams(window.location.search);
const ntab = new tablero(query.get("estado"), parseInt(query.get("turno")));
let r = ntab.minmax();
document.write(r[1]);