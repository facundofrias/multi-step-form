let tab = 1;
mostrarPestaña(tab);

// Funciones
function mostrarPestaña(tab) {
  let tabs = document.getElementsByClassName("tab");
  switch (tab) {
    case 0:
      tabs[tab].style.display = "inline";
      break;
    case 1:
      tabs[tab].style.display = "inline";
      break;
    case 2:
      tabs[tab].style.display = "inline";
      break;
    case 3:
      tabs[tab].style.display = "inline";
      break;
  }
}
