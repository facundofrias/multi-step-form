// Definición de  Clases
class Plan {
  constructor(type, mode, prices = [], priceSelected, addOns = {
    onlineService: [],
    largerSotrage: [],
    customizableProfile: [],
  }) {
    this.type = type;
    this.mode = mode;
    this.prices = prices;
    this.priceSelected = priceSelected;
    this.addOns = addOns ;
  }
}


class Client {
  constructor(
    name,
    email,
    phone,
    plan = new Plan("mo", "Advanced", [9, 12, 15], undefined, {onlineService: [false, 1], largerSotrage: [false, 2], customizableProfile: [false, 2]})
    
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.plan = plan;
  }
}

// ---- MAIN ----
let client = new Client(),
  currentTab = 1,
  nextTab,
  prevTab,
  tabs = document.getElementsByClassName("tab"),
  addOnsValues = Object.values(client.plan.addOns);
mostrarPestaña(currentTab);
client.plan.prices = [9, 12, 15];


// ---- EVENTOS ----

// Se dispara cuando se avanza un step
const btnNext = document.getElementById("btn-next");
btnNext.addEventListener("click", displayNextTab);

// Se dispara cuando se retrocede un step
const btnBack = document.getElementById("btn-back");
btnBack.addEventListener("click", displayPrevTab);

// Se dispara cuando se selecciona un plan
const plans = document.getElementsByClassName("mode-plan");
for (const plan of plans) {
  plan.addEventListener("click", () => {
    removeSelectedPlan();
    plan.classList.add("selected-plan"); // Agrega la clase para dar estilo al plan seleccionado
  });
}

// Se dispara cuando se cambia el modo (Monthly - Yearly)
const switchPlan = document.getElementById("switch");
switchPlan.addEventListener("click", setMode);
const modePlan = document.getElementsByClassName("type-plan"),
      costPlans = document.getElementsByClassName("cost-plan"),
      costAddOns = document.getElementsByClassName("add-ons__cost");

function setMode() {
  if (switchPlan.checked) {
    client.plan.type = "yr";
    modePlan[0].classList.remove("selected-type");
    modePlan[1].classList.add("selected-type");
    setYearlyPrices(10);
  } else {
    client.plan.type = "mo";
    modePlan[1].classList.remove("selected-type");
    modePlan[0].classList.add("selected-type");
    setMonthlyPrices(10);
  }
}



// Se dispara cuando se selecciona un add-on
const addOnsForm = document.getElementsByClassName("add-ons");
for (const addOn of addOnsForm) {
  addOn.addEventListener("click", () => {
    let checkbox = addOn.firstElementChild;
    if (checkbox.checked) {
      addOn.classList.add("selected-add-on");
    } else {
      addOn.classList.remove("selected-add-on");
    }
  });
}

// Asigna los Add-ons en caso de haber sido seleccionados
function setAddOns() {
  for (let i = 0; i < addOnsForm.length; i++) {
    if (addOnsForm[i].firstElementChild.checked) {
      client.plan.addOns[Object.keys(client.plan.addOns)[i]][0] = true;
    }
    else{
      client.plan.addOns[Object.keys(client.plan.addOns)[i]][0] = false;
    }
    // console.log(client.plan.addOns[Object.keys(client.plan.addOns)[i]][0]);
  }
}



// ---- FUNCIONES ----
// ---- Funciones generales ----

// Muestra la pestaña actual del formulario
function mostrarPestaña(currentTab) {
  hideTabs();
  setSelectedStep();
  let stepsContainer = document.getElementById("steps-container");
  if (currentTab == 0) {
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
      setPlan(document.getElementsByClassName("selected-plan")[0].getElementsByTagName("span"));
      tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      isMobile(570);
      setCostAddOnsText();
      break;
    // Summary
    case 3:
      tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      showConfirmBtn();
      setAddOns();
      // console.log(client);
      break;
  }
}


function setCostAddOnsText() {
  switchPlan.checked ? setYearlyCostAddOnsText() : setMonthlyCostAddOnsText();
}

// Cambia el costo de Add-ons "mo" a "yr"
function setYearlyCostAddOnsText() {
  for (let i = 0; i < costAddOns.length; i++) {
    costAddOns[i].textContent = `+$${addOnsValues[i][1]}/yr`;
  }
}

// Cambia el costo de Add-ons de "yr" a "mo"
function setMonthlyCostAddOnsText() {
  for (let i = 0; i < costAddOns.length; i++) {
    costAddOns[i].textContent = `+$${addOnsValues[i][1]}/mo`;
  }
}


// Setea todas las pestañas en "display: none" y limpia los steps de la navbar
function hideTabs() {
  Array.from(document.querySelectorAll(".step")).forEach((el) =>
    el.classList.remove("selected-step")
  );
  for (let currentTab of tabs) {
    if (currentTab.className.includes("tab-on")) {
      currentTab.className = currentTab.className.substring(
        0,
        currentTab.className.length - 7
      );
    }
  }
}

// Determina si la pantalla es mobile o desktop
function isMobile(px) {
  if (screen.width <= 375) {
    let stepsContainer = document.getElementById("steps-container");
    stepsContainer.style.minHeight = px + "px";
  }
}

// Muestra el siguiente step del formulario
function displayNextTab() {
  if (currentTab == 0) {
    let flag = false;
    // Obtengo inputs
    const name = document.getElementById("name"),
      email = document.getElementById("email"),
      phone = document.getElementById("phone");

    if (name.value !== "" && email.value !== "" && phone.value !== "") {
      let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (email.value.match(mailFormat) && phone.value.match(phoneFormat)) {
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
  if (currentTab == 3) {
    removeConfirmBtn();
  }
  currentTab--;
  mostrarPestaña(currentTab);
  setIndexTabs();
}

// Asigna index de siguiente y anterior pestaña
function setIndexTabs() {
  if (currentTab > 0) {
    nextTab = currentTab + 1;
    prevTab = currentTab - 1;
  }
  if (currentTab >= 3) {
    currentTab = 3;
  }
}

// Muestra botón "Go Back" y setea el footer en justify-content: space between
function displayBack() {
  Array.from(document.querySelectorAll(".footer__btn-back")).forEach((el) =>
    el.classList.add("btn-displayed")
  );
  Array.from(document.querySelectorAll(".footer")).forEach((el) =>
    el.classList.add("space-between")
  );
}

// Oculta botón "Go Back" y remueve el footer en justify-content: space between
function displayNoneBack() {
  Array.from(document.querySelectorAll(".footer__btn-back")).forEach((el) =>
    el.classList.remove("btn-displayed")
  );
  Array.from(document.querySelectorAll(".footer")).forEach((el) =>
    el.classList.remove("space-between")
  );
}

// Cambia el botón "Next Step" por "Confirm"
function showConfirmBtn() {
  Array.from(document.querySelectorAll(".footer__btn-next")).forEach((el) =>
    el.classList.remove("btn-displayed")
  );
  Array.from(document.querySelectorAll(".footer__btn-submit")).forEach((el) =>
    el.classList.add("btn-displayed")
  );
}

// Cambia el botón "Confirm" por "Next Step"
function removeConfirmBtn() {
  Array.from(document.querySelectorAll(".footer__btn-next")).forEach((el) =>
    el.classList.add("btn-displayed")
  );
  Array.from(document.querySelectorAll(".footer__btn-submit")).forEach((el) =>
    el.classList.remove("btn-displayed")
  );
}

// Cambia el estilo del step actual
function setSelectedStep() {
  document
    .getElementsByClassName("step")
    [currentTab].classList.add("selected-step");
}


// ---- Funciones Step 1  ----
// Carga datos personales de cliente
function setPersonalInfo() {
  let personalInfo = document.getElementsByClassName("field-input");
  client.name = personalInfo[0].value;
  client.email = personalInfo[1].value;
  client.phone = personalInfo[2].value;

  // Valores ejemplo para trabajar
  // client.name = "Ejemplo nombre";
  // client.email = "ejemplo@mail.com";
  // client.phone = "1234567890";
}


// ---- Funciones Step 2 ----

// Setea precios anuales cuando se cambia de 'Monthly' a 'Yearly'
function setYearlyPrices(multiplier) {
  for (let i = 0; i < client.plan.prices.length; i++) {
    // Establece los precios anuales del tipo de plan
    client.plan.prices[i] = client.plan.prices[i] * multiplier;

    // Agrega la leyenda de meses gratuitos 
    costPlans[i].innerHTML = `$${client.plan.prices[i]}/yr`;
    plans[i].innerHTML = plans[i].innerHTML + '<span class="months-free" id="pro-price">2 months free</span>';
    isMobile(680);
  }

  // Establece los precios anuales de los Add-ons
  for (let i = 0; i < addOnsValues.length; i++) {
    addOnsValues[i][1] = addOnsValues[i][1] * multiplier;
  }
}

// Setea precios mensuales cuando se cambia de 'Yearly' a 'Monthly'
function setMonthlyPrices(divisor) {
  for (let i = 0; i < client.plan.prices.length; i++) {
    // Establece los precios anuales del tipo de plan
    client.plan.prices[i] = client.plan.prices[i] / divisor;

    // Quita la leyenda de meses gratuitos 
    costPlans[i].innerHTML = `$${client.plan.prices[i]}/mo`;
    costPlans[i].nextElementSibling.remove();
    isMobile(630);
  }
  

  // Establece los precios mensuales de los Add-ons
  for (let i = 0; i < addOnsValues.length; i++) {
    addOnsValues[i][1] = addOnsValues[i][1] / divisor;
  }
}

// Quita el css del plan seleccionado actualmente
function removeSelectedPlan() {
  Array.from(document.querySelectorAll(".mode-plan")).forEach((el) =>
    el.classList.remove("selected-plan")
  );
}

// Carga el plan seleccionado por cliente
function setPlan(plan) {
  client.plan.mode = plan[0].textContent;
  client.plan.priceSelected = plan[1].textContent.match(/(\d+)/)[0];
}

// ---- Funciones Step 3 ----



// ---- Funciones Step 4 ----
