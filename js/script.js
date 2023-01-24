let currentTab = 0,
    nextTab,
    prevTab,
    tabs = document.getElementsByClassName("tab");
mostrarPestaña(currentTab);

// Evento que se dispara cuando se avanza un step
const btnNext = document.getElementById("btn-next"); 
btnNext.addEventListener("click", displayNextTab);


// Evento que se dispara cuando se retrocede un step
const btnBack = document.getElementById("btn-back"); 
btnBack.addEventListener("click", displayPrevTab);


// Funciones

// Muestra la pestaña actual del formulario
function mostrarPestaña(currentTab) {
  let stepsContainer = document.getElementById("steps-container");
  if(currentTab == 0) {
    displayNoneBack();
  } else {
    displayBack();
  }
  switch (currentTab) {
    // Personal info
    case 0:
      hideTabs();
      displayNoneBack();
      tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      break;
    // Type
    case 1:
      tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      esMobile(630);
      break;
    // Add-ons
    case 2:
      tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      esMobile(570);
      break;
    // Summary
    case 3:
      tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      break;
  }
}

// Setea todas las pestañas en "display: none"
function hideTabs() {
  for (let currentTab of tabs) {
    if(currentTab.className.includes("tab-on")) {
      currentTab.className = currentTab.className.substring(0, currentTab.className.length-7);
    }
  }
}

// Determina si la pantalla es mobile o desktop
function esMobile(px) {
  if(screen.width <= 375) {
    let stepsContainer = document.getElementById("steps-container");
    stepsContainer.style.minHeight = px + "px";
  }
}

// Muestra el siguiente step del formulario
function displayNextTab() {
  currentTab++;
  hideTabs();
  tabs[currentTab].className = tabs[currentTab].className + " tab-on";
  setIndexTabs();
}


// Muestra el step previo del formulario
function displayPrevTab() {
  currentTab--;
  hideTabs();
  tabs[currentTab].className = tabs[currentTab].className + " tab-on";
  setIndexTabs();
  if(currentTab === 0) {
    displayNoneBack();
  }
}

// Asigna index de siguiente y anterior pestaña
function setIndexTabs() {
  if(currentTab !== 3) {
    nextTab = currentTab + 1;
  } else {

  }
  if(currentTab !== 0) {
    prevTab = currentTab - 1;
    displayBack();
  }
}

// Muestra botón "Go Back" y setea el footer en justify-content: space between
function displayBack() {
  Array.from(document.querySelectorAll('.footer__btn-back')).forEach((el) => el.classList.add('btn-displayed'));
  Array.from(document.querySelectorAll('.footer')).forEach((el) => el.classList.add('space-between'));
}

// Oculta botón "Go Back" y remueve el footer en justify-content: space between
function displayNoneBack() {
  Array.from(document.querySelectorAll('.footer__btn-back')).forEach((el) => el.classList.remove('btn-displayed'));
  Array.from(document.querySelectorAll('.footer')).forEach((el) => el.classList.remove('space-between'));
}

//  Cambia el botón "Next Step" por "Confirm"
function setConfirmBtn() {
  
  Array.from(document.querySelectorAll('.footer__btn-submit')).forEach((el) => el.classList.remove('btn-displayed'));
}