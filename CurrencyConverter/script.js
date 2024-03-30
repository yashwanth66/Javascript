const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
if(day<10){
    day = "0" + day;
}
if(month<10){
    month = "0" + month;
}
  let currentDate = `${year}-${month}-${day}`;

const BASE_URL =
  `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${currentDate}/v1/currencies/`;
  

  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");

for (let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
          } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
          }
        select.append(newOption);
    }

select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}



const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1){
        amtVal = 1;
        amtVal.value = "1";
    }

    const URL1 = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL1);
    let data1 = await response.json();
    let rate1 = data1[fromCurr.value.toLowerCase()];
    
    let finalAmount = amtVal * rate1[toCurr.value.toLowerCase()];
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
  
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });
  
window.addEventListener("load", () => {
    updateExchangeRate();
  });