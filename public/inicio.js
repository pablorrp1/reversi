let query = new URLSearchParams(window.location.search);
const ntab = new tablero(query.get("estado"), parseInt(query.get("turno")));
let r = ntab.minmax();
document.getElementById("log").innerHTML = r[1]