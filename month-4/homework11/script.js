let elForm = document.querySelector(".form-js");
let elInput = elForm.querySelector(".input-js");
let elResultBox = document.querySelector(".result-box-js");
let elSpinner = document.querySelector(".content-spinner-js");
let elError = document.querySelector(".js-error");


const renderCountry = data => {
  elResultBox.innerHTML = "";

  data.forEach(data => {
    let elCountryInfo = document.createElement("li");
    elCountryInfo.classList.add("box", "border", "border-2", "border-dark", "rounded-3", "mt-3", "bg-light");
    elCountryInfo.innerHTML = `
      <img class="rounded-top" src=${data.flags.png} alt=${data.name.common} width="300" height="200">
      <h5 class="mt-2 heading">Name: ${data.name.common}</h5>
      <p class="d-block m-0 mb-1">Capital: ${data.capital}</p>
      <p class="d-block m-0 mb-1">Area: ${data.area}</p>
      <p class="d-block m-0 mb-1">Population: ${data.population}</p>`

      elResultBox.appendChild(elCountryInfo);
  })
};

const renderErrors = function (error) {
  let elCountryInfo = document.createElement("div");
  elError.innerHTML = `${error}`

  elResultBox.appendChild(elCountryInfo);
};

const renderCountries = country => {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => {
    if (res.status != 200) {
      throw new Error(renderErrors('Country was not found!'));
    }
    return res.json()
    })
    .then(data => renderCountry(data))

    .finally(function spinnedAdd() {
      elSpinner.classList.add("d-none");
    });
};

function spinnnewerRemove() {
  elSpinner.classList.remove("d-none")
}
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  elResultBox.innerHTML='';

  spinnnewerRemove()
  let inputVal = elInput.value.trim().toLowerCase();
  renderCountries(inputVal);
});