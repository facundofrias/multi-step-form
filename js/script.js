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

// Declaración de variables
let client = new Client(),
  currentTab = 0,
  nextTab,
  prevTab,
  // tabs = document.getElementsByClassName("tab"),
  addOnsValues = Object.values(client.plan.addOns),
  multiplier = 10,   divisor = 10,
  validData,
  plans, switchPlan, modePlan, costPlans, yearly = false, 
  costAddOns, addOnsForm,
  stepOne, stepTwo, stepThree, stepFour;

stepTwo = `
  <div class="data" id="current-tab">              
    <div class="data__step-info">
      <p class="data__title">Select your plan</p>
      <p class="data__description">You have the option of monthly or yearly billing.</p>
    </div>
    <div class="data__plan-container" id="arcade-plan">
      <label class="mode-plan" for="arcade">
        <img src="./assets/images/icon-arcade.svg" alt="Arcade mode image">
        <span class="title-plan" id="arcade">Arcade</span>
        <span class="cost-plan" id="arcade-price">$${client.plan.prices[0]}/mo</span>
      </label>
      <input type="radio" name="plan">
    </div>
    <div class="data__plan-container">
      <label class="mode-plan selected-plan" for="advanced">
        <img src="./assets/images/icon-advanced.svg" alt="Advanced mode image">
        <span class="title-plan" id="advanced">Advanced</span>
        <span class="cost-plan" id="advanced-price">$${client.plan.prices[1]}/mo</span>
      </label>
      <input type="radio" name="plan" checked>
    </div>
    <div class="data__plan-container">
      <label class="mode-plan" for="pro">
        <img src="./assets/images/icon-pro.svg" alt="Pro mode image">
        <span class="title-plan" id="pro">Pro</span>
        <span class="cost-plan" id="pro-price">$${client.plan.prices[2]}/mo</span>
      </label>
      <input type="radio" name="plan">
    </div>
    <div class="data__type-plan-container">
      <span class="type-plan selected-type">Monthly</span>
      <div class="toggle-container">
        <input class="switch" type="checkbox" id="switch">
        <label class="toggle-label" for="switch" id="toggle-plan">Toggle</label>
    </div>
      <span class="type-plan">Yearly</span>
  </div> `;
  
// Asignación de precios de Plan
client.plan.prices = [9, 12, 15];

mostrarPestaña(currentTab);


// ---- EVENTOS ----

// Se dispara cuando se avanza un step
const btnNext = document.getElementById("btn-next");
btnNext.addEventListener("click", displayNextTab);

// Se dispara cuando se retrocede un step
const btnBack = document.getElementById("btn-back");
btnBack.addEventListener("click", displayPrevTab);


function setMode() {
  if (switchPlan.checked) {
    client.plan.type = "yr";
    modePlan[0].classList.remove("selected-type");
    modePlan[1].classList.add("selected-type");
    setYearlyPlanPrices(multiplier);
    setYearlyCostAddOns(multiplier)
  } else {
    client.plan.type = "mo";
    modePlan[1].classList.remove("selected-type");
    modePlan[0].classList.add("selected-type");
    setsetMonthlyPlanPrices(divisor);
    setMonthlyCostAddOns(divisor);
  }
}



// ---- FUNCIONES ----
// ---- Funciones generales ----

// Muestra la pestaña actual del formulario
function mostrarPestaña(currentTab) {
  // hideTabs();
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
      loadStepOne();
      // tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      break;
    // Type
    case 1:
      //tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      loadStepTwo();
      isMobile(630);
      break;
    // Add-ons
    case 2:
      // setPlan(document.getElementsByClassName("selected-plan")[0].getElementsByTagName("span"));
      // tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      isMobile(570);
      loadStepThree();
      break;
    // Summary
    case 3:
      // tabs[currentTab].className = tabs[currentTab].className + " tab-on";
      showConfirmBtn();
      loadStepFour();
      break;
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
  switch(currentTab) {
    case 0:
      validData = verifyPersonalData();
      break;
    case 1:
      setPlan(document.getElementsByClassName("selected-plan")[0].getElementsByTagName("span"));
      saveStepTwo();
      break;
    case 2: 
      saveStepThree();
      break;
    case 3:
      //saveStepFour();
      break
  }
  if(validData) {
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
  switch(currentTab) {
    case 0:
      validData = verifyPersonalData();
      break;
    case 1:
      setPlan(document.getElementsByClassName("selected-plan")[0].getElementsByTagName("span"));
      saveStepTwo();
      break;
    case 2: 
      saveStepThree();
      break;
    case 3:
      //saveStepFour();
      break
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
  Array.from(document.querySelectorAll(".step")).forEach((el) =>
    el.classList.remove("selected-step")
  );
  document.getElementsByClassName("step")[currentTab].classList.add("selected-step");
}


// ------------------------------
// ------ Funciones Step 1 ------

function verifyPersonalData() {
  // Obtengo inputs
  const name = document.getElementById("name"),
        email = document.getElementById("email"),
        phone = document.getElementById("phone");

  if (name.value !== "" && email.value !== "" && phone.value !== "") {
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        phoneFormat = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (email.value.match(mailFormat) && phone.value.match(phoneFormat)) {
      saveStepOne(name.value, email.value, phone.value);
      return true;
    } else {
      alert("Datos erróneos o incompletos");
      return false;
    }
  } else {
    alert("Datos erróneos o incompletos");
    return false;
  }
}

// Guarda datos ingresados en Step 1
function saveStepOne(name, email, phone) {
client.name = name;
client.email = email;
client.phone = phone;
stepOne = `
<div class="data" id="current-tab">
  <div class="data__step-info">
    <p class="data__title">Personal info</p>
    <p class="data__description">Please provide your name, email address, and phone number.</p>
  </div>
  <div class="field">
    <label class="field__title" for="name">Name</label>
    <input class="field-input" type="text" name="" id="name" placeholder="e.g. Stephen King" autofocus required>
  </div>
  <div class="field">
    <label class="field__title" for="email">Email Address</label>
    <input class="field-input" type="email" name="" id="email" placeholder="e.g. stephenking@lorem.com" required>
  </div>
  <div class="field">
    <label class="field__title" for="name">Phone Number (without 0 and 15)</label>
    <input class="field-input" type="text" name="" id="phone" placeholder="e.g. +1 234 567 890" required>
  </div>
</div> `;
}

function loadStepOne() {
if(!document.getElementById("current-tab").className.includes("default-data")) {
  document.getElementById("current-tab").remove();
  document.getElementById("sidebar").insertAdjacentHTML("afterend", stepOne);
  document.getElementById("name").value = client.name;
  document.getElementById("email").value = client.email;
  document.getElementById("phone").value = client.phone;
  document.getElementById("name").focus();
}
}

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


// ------------------------------
// ------ Funciones Step 2 ------

// Setea precios anuales cuando se cambia de 'Monthly' a 'Yearly'
function setYearlyPlanPrices(multiplier) {
  for (let i = 0; i < client.plan.prices.length; i++) {
    // Establece los precios anuales del tipo de plan
    client.plan.prices[i] = client.plan.prices[i] * multiplier;

    // Agrega la leyenda de meses gratuitos 
    costPlans[i].innerHTML = `$${client.plan.prices[i]}/yr`;
    plans[i].innerHTML = plans[i].innerHTML + '<span class="months-free" id="pro-price">2 months free</span>';
    isMobile(680);
  }

  
}

// Setea precios mensuales cuando se cambia de 'Yearly' a 'Monthly'
function setsetMonthlyPlanPrices(divisor) {
  for (let i = 0; i < client.plan.prices.length; i++) {
    // Establece los precios anuales del tipo de plan
    client.plan.prices[i] = client.plan.prices[i] / divisor;

    // Quita la leyenda de meses gratuitos 
    costPlans[i].innerHTML = `$${client.plan.prices[i]}/mo`;
    costPlans[i].nextElementSibling.remove();
    isMobile(630);
  }
}

function loadStepTwo() {
  document.getElementById("current-tab").remove();
  document.getElementById("sidebar").insertAdjacentHTML("afterend", stepTwo);
  // Se dispara cuando se selecciona un plan
  plans = document.getElementsByClassName("mode-plan");
  for (const plan of plans) {
    plan.addEventListener("click", () => {
      removeSelectedPlan();
      // Agrega la clase para dar estilo al plan seleccionado
      plan.classList.add("selected-plan");
    });
  }
  
  // Se dispara cuando se cambia el modo (Monthly - Yearly)
  switchPlan = document.getElementById("switch");
  yearly ?  switchPlan.checked = true : switchPlan.checked = false;
  switchPlan.addEventListener("click", setMode);
  
  modePlan = document.getElementsByClassName("type-plan"),
  costPlans = document.getElementsByClassName("cost-plan"),
  costAddOns = document.getElementsByClassName("add-ons__cost");
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

function saveStepTwo() {
  stepTwo = document.getElementById("current-tab").outerHTML;
  switchPlan.checked ? yearly = true : yearly = false;
}


// ------------------------------
// ------ Funciones Step 3 ------

function setYearlyCostAddOns(multiplier){

  for (let i = 0; i < addOnsValues.length; i++) {
    // Establece los precios anuales de los Add-ons
    addOnsValues[i][1] = addOnsValues[i][1] * multiplier;
    // Cambia el texto del costo de Add-ons "mo" a "yr"
    // costAddOns[i].textContent = `+$${addOnsValues[i][1]}/yr`;
  }
}

function setMonthlyCostAddOns(divisor) {
  for (let i = 0; i < addOnsValues.length; i++) {
    // Establece los precios mensuales de los Add-ons
    addOnsValues[i][1] = addOnsValues[i][1] / divisor;
    
    // Cambia el costo de Add-ons de "yr" a "mo"
    // costAddOns[i].textContent = `+$${addOnsValues[i][1]}/mo`;
  }
}

function loadStepThree() {
  document.getElementById("current-tab").remove();
stepThree = `
  <div class="data" id="current-tab">
    <div class="data__field-container">
      <p class="data__title">Pick add-ons</p>
      <p class="data__description">Add-ons help enhance your gaming experience.</p>
    </div>
    <div class="add-ons-container">
      <label class="add-ons" for="opt-in-service">
        <input type="checkbox" name="my-checkbox" id="opt-in-service">
        <span class="add-ons__title">Online service</span>
        <span class="add-ons__cost">+$${addOnsValues[0][1]}/${client.plan.type}</span>
        <span class="add-ons__description">Acces to multiplayer games</span>
      </label>
    </div>
    <div class="add-ons-container">
      <label class="add-ons" for="opt-in-storage">
        <input type="checkbox" name="my-checkbox" id="opt-in-storage">
        <span class="add-ons__title">Larger storage</span>
        <span class="add-ons__cost">+$${addOnsValues[1][1]}/${client.plan.type}</span>
        <span class="add-ons__description">Extra 1TB of cloud save</span>
      </label>
    </div>
    <div class="add-ons-container">
      <label class="add-ons" for="opt-in-profile">
        <input type="checkbox" name="my-checkbox" id="opt-in-profile">
        <span class="add-ons__title">Customizable profile</span>
        <span class="add-ons__cost">+$${addOnsValues[2][1]}/${client.plan.type}</span>
        <span class="add-ons__description">Custom theme on your profile</span>
      </label>
    </div>
  </div> `;
  document.getElementById("sidebar").insertAdjacentHTML("afterend", stepThree);
  
  // Evento que se dispara cuando se selecciona un add-on
  addOnsForm = document.getElementsByClassName("add-ons");
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
  // Llamada a la función que carga Add-ons seleccionados
  getAddOns();
}

function saveStepThree() {
  stepThree = document.getElementById("current-tab").outerHTML;
  setAddOns();
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
  }
}

// Carga Add-ons seleccionados
function getAddOns() {
  let addOns = client.plan.addOns;
  for (let i = 0; i < addOnsForm.length; i++) {
    if (addOns[Object.keys(addOns)[i]][0]) {
      addOnsForm[i].classList.add("selected-add-on");
      addOnsForm[i].firstElementChild.checked = true;
    } else {
      addOnsForm[i].classList.remove("selected-add-on");
      addOnsForm[i].firstElementChild.checked = false;
    }
  }
}

// ------------------------------
// ------ Funciones Step 4 ------

function loadStepFour() {
  document.getElementById("current-tab").remove();
  console.log(client.plan.priceSelected);
  let modeHTML;
  switch (client.plan.type) {
    case "mo":
      modeHTML = "Monthly";
      break;
    case "yr":
      modeHTML = "Yearly";
      break;

    default:
      break;
  }

  stepFour = `
  <div class="data" id="current-tab">
    <div class="data__field-container">
      <p class="data__title">Finishing up</p>
      <p class="data__description">Double-check everything looks OK before confirming.</p>
    </div>
    <div class="summary">
      <div class="check-plan-container">
        <div class="type-plan">
          <span class="check-plan">${client.plan.mode} (${modeHTML})</span>
          <span><a class="change-plan" href="">Change</a></span>
        </div>
        <span class="check-cost">+$${client.plan.priceSelected}/${client.plan.type}</span>
      </div>
      <div class="line"></div>
      <div class="check-add-ons-container">
        <span class="check-add-ons">Online service</span>
        <span class="check-add-ons-cost">+$2/mo</span>
      </div>
    </div>
    <div class="check-total-container">
      <span class="check-total">Total (per month)</span>
      <span class="check-total-cost">+$12/mo</span>
    </div>
  </div> `;
  document.getElementById("sidebar").insertAdjacentHTML("afterend", stepFour);
}



