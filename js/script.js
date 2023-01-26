// Clase
class Client {
  constructor(name, email, phone, plan = {mode: "monthly", type: "Advanced", price: "12", priceText: "12/mo"}, addOns = {onlineService : false, largerSotrage : false, customizableProfile: false}) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.plan = plan;
    this.addOns = addOns;
  }
}

let client = new Client,
    currentTab = 2,
    nextTab,
    prevTab,
    tabs = document.getElementsByClassName("tab");
mostrarPestaña(currentTab);


// Eventos


// Evento que se dispara cuando se avanza un step
const btnNext = document.getElementById("btn-next"); 
btnNext.addEventListener("click", displayNextTab);

// Evento que se dispara cuando se retrocede un step
const btnBack = document.getElementById("btn-back"); 
btnBack.addEventListener("click", displayPrevTab);


// Evento que se dispara cuando se selecciona un plan
const plans = document.getElementsByClassName("mode-plan");
for (const plan of plans) {
  plan.addEventListener("click", () => {
    removeSelectedPlan();    
    plan.classList.add('selected-plan'); // Agrega la clase para dar estilo al plan seleccionado
    setPlan(plan.getElementsByTagName("span"));
    
  });
}

// Evento que se dispara cuando se selecciona un add-on
const addOnsForm = document.getElementsByClassName("add-ons");
for (const addOn of addOnsForm) {
  addOn.addEventListener("click", () => {
    let checkbox = addOn.firstElementChild; 
    if(checkbox.checked) {
      addOn.classList.add("selected-add-on");
    } else {
      addOn.classList.remove("selected-add-on");
    }
  });
}


function setAddOns() {
  for(let i=0; i<addOnsForm.length; i++){
    if(addOnsForm[i].firstElementChild.checked){
      console.log(`Entra: ${i}`);
    }
  }
}

// Funciones

// Muestra la pestaña actual del formulario
function mostrarPestaña(currentTab) {
  hideTabs();
  setSelectedStep();
  let stepsContainer = document.getElementById("steps-container");
  if(currentTab == 0) {
    displayNoneBack();
  } else {
    displayBack();
  }
  switch (currentTab) {
    // Personal info
    case 0:
      tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      break;
    // Type
    case 1:
      tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      isMobile(630);
      setPersonalInfo();
      break;
    // Add-ons
    case 2:
      tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      isMobile(570);
      break;
    // Summary
    case 3:
      tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      showConfirmBtn();
      setAddOns();
      break;
  }
}

// Setea todas las pestañas en "display: none" y limpia los steps de la navbar
function hideTabs() {
      Array.from(document.querySelectorAll('.step')).forEach((el) => el.classList.remove('selected-step'));
  for (let currentTab of tabs) {
    if(currentTab.className.includes("tab-on")) {
      currentTab.className = currentTab.className.substring(0, currentTab.className.length-7);
    }
  }
}

// Determina si la pantalla es mobile o desktop
function isMobile(px) {
  if(screen.width <= 375) {
    let stepsContainer = document.getElementById("steps-container");
    stepsContainer.style.minHeight = px + "px";
  }
}

// Muestra el siguiente step del formulario
function displayNextTab() {
  if(currentTab == 0) {
    let flag = false;
    // Obtengo inputs
    const name = document.getElementById("name"),
          email = document.getElementById("email"),
          phone = document.getElementById("phone");
  
         

    if((name.value !== "") && (email.value !== "") && (phone.value !== "")) {
      let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if(email.value.match(mailFormat) && (phone.value.match(phoneFormat))) {
        currentTab++;
        mostrarPestaña(currentTab);
        setIndexTabs();
      } else {
        alert("Datos erróneos o incompletos");
      }
    } else {
      alert("Datos erróneos o incompletos");
    }
  } else {
  
    currentTab++;
    mostrarPestaña(currentTab);
    setIndexTabs();
  }
}

// Muestra el step previo del formulario
function displayPrevTab() {
  if(currentTab == 3) {
    removeConfirmBtn();
  }
  currentTab--;
  mostrarPestaña(currentTab);
  setIndexTabs();
}

// Asigna index de siguiente y anterior pestaña
function setIndexTabs() {
  if(currentTab > 0) {
    nextTab = currentTab + 1;
    prevTab = currentTab - 1;
  }
  if(currentTab >= 3) {
    currentTab = 3;
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

// Cambia el botón "Next Step" por "Confirm"
function showConfirmBtn() {
  Array.from(document.querySelectorAll('.footer__btn-next')).forEach((el) => el.classList.remove('btn-displayed'));
  Array.from(document.querySelectorAll('.footer__btn-submit')).forEach((el) => el.classList.add('btn-displayed'));
}

// Cambia el botón "Confirm" por "Next Step"
function removeConfirmBtn() {
  Array.from(document.querySelectorAll('.footer__btn-next')).forEach((el) => el.classList.add('btn-displayed'));
  Array.from(document.querySelectorAll('.footer__btn-submit')).forEach((el) => el.classList.remove('btn-displayed'));
}

// Cambia el estilo del step actual
function setSelectedStep() {
  document.getElementsByClassName("step")[currentTab].classList.add('selected-step');
}

// Carga datos personales de cliente
function setPersonalInfo() {
  let personalInfo = document.getElementsByClassName("field-input");
  // client.name = personalInfo[0].value;
  // client.email = personalInfo[1].value;
  // client.phone = personalInfo[2].value;

  // Valores ejemplo para trabajar
  client.name = "Ejemplo nombre"
  client.email = "ejemplo@mail.com"
  client.phone = "1234567890"
}

// Quita el css del plan seleccionado actualmente
function removeSelectedPlan() {
  Array.from(document.querySelectorAll('.mode-plan')).forEach((el) => el.classList.remove('selected-plan'));
} 

// Carga el plan seleccionado por cliente
function setPlan(plan) {
  client.plan.type = plan[0].textContent;
  client.plan.priceText = plan[1].textContent;
  client.plan.price = client.plan.priceText.match(/(\d+)/)[0];
}