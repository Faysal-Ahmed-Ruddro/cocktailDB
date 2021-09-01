const searchDrink = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  
  //   clear the singleDrinks from display  here
  document.getElementById("single-drink").textContent = "";
  //   clear search result from display  here
  document.getElementById("search-result").textContent = "";
  //   error handle for if search empty
  if (searchText == "") {
    const errorMessage = document.getElementById("error-message");
    errorMessage.classList.remove("d-none");
  } else {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
    // spinner added here

    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    fetch(url)
      .then((res) => res.json())
      .then((data) => loadDrinks(data.drinks));
    const errorMessage = document.getElementById("error-message");
    errorMessage.classList.add("d-none");
  }
  searchField.value = "";
};
const loadDrinks = (drinks) => {
  console.log(drinks);
  // spinner remove here
  spinner.classList.add("d-none");
  // clear search result when search new data

  const searchResult = document.getElementById("search-result");
document.getElementById("search-result").textContent = ""
  if ( drinks == null) {
    console.log("error");
    const errorMessage = document.getElementById("error-message");
    errorMessage.classList.remove("d-none");
  } 
  else {

    drinks.forEach((drink) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="card h-100">
      <img src="${
        drink.strDrinkThumb ? drink.strDrinkThumb : N / A
      }" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${drink.strDrink ? drink.strDrink : N / A}</h5>
        <p class="card-text">${
          drink.strInstructions ? drink.strInstructions.slice(0, 100) : N / A
        }</p>
      </div>
      <div class="card-footer ">
        <button class="btn btn-primary" onclick="singleDrinks(${
          drink.idDrink
        })">See More</button>
      </div>
    </div>
        `;
      searchResult.appendChild(div);
    });
  }
};
// single Drink area
const singleDrinks = (drinks) => {
  // spinner added here
  spinner.classList.remove("d-none");
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinks}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySingleDrinks(data.drinks[0]));
};
// displaying single drinks
const displaySingleDrinks = (drink) => {
  // spinner remove here
  spinner.classList.add("d-none");
  // clear single drink  from display when search new data
  const singleDrink = document.getElementById("single-drink");
  document.getElementById("single-drink").textContent = "";
  const div = document.createElement("div");
  div.classList.add("col", "mx-auto");
  div.innerHTML = `
    <div class="card h-100">
      <img src="${
        drink.strDrinkThumb ? drink.strDrinkThumb : N / A
      }" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${drink.strDrink ? drink.strDrink : N / A}</h5>
        <p class="card-text">${
          drink.strInstructions ? drink.strInstructions.slice(0, 100) : N / A
        }</p>
      </div>
      <div class="card-footer ">
        <a href="https://www.google.com" class="btn btn-primary" target="_blank"> See More</a>
      </div>
    </div>
    `;
  singleDrink.appendChild(div);
};
