// const mainBody = document.getElementById('title')
const cocktailCardDiv = document.getElementById('cocktailCardDiv')
const headerBtns = document.getElementsByClassName('headerBtn')
const sshLogo = document.getElementById('logo')
const multiCardHolderDiv = document.getElementById('multiCardHolder')
const alcoholicText = document.getElementById('alcoholic')
const nonAlcoholicText = document.getElementById('nonAlcoholic')
const searchBar = document.getElementsByTagName('input')
console.log(searchBar)

const getRandomCocktail = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((drink) => renderOneDrink(drink))
}

const renderOneDrink = (randomDrink) => {
  const randomDrinkArray = randomDrink.drinks
  const { strAlcoholic, strDrink, strGlass, strDrinkThumb } = randomDrinkArray[0]
  let card = document.createElement('div')
  card.className = 'card'
  //Add empty heart to button
  card.innerHTML = `
  <img src="${strDrinkThumb}"
    class='drinkImage'
    alt="${strDrink}"
    id='${strDrink} image'
  />
  <h2>${strDrink}</h2>
  <h3>${strAlcoholic} | ${strGlass}
  <br>
  <button class=yesPleaseBtn>Yes, please! &#x2661;`
  cocktailCardDiv.appendChild(card)
}

const renderAlcoholicDrinks = (listOfDrinks) => {
  cocktailCardDiv.innerHTML = null
  cocktailCardDiv.className = 'multiCardHolder'
  nonAlcoholicText.style.textDecoration = 'none';
  nonAlcoholicText.style.fontWeight = 'normal';
  alcoholicText.style.textDecoration = 'underline';
  alcoholicText.style.fontWeight = 'bold';

  const allDrinksArray = listOfDrinks.drinks
  allDrinksArray.forEach(drink => {
    const { strDrink, strDrinkThumb, idDrink } = drink
    let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
    <img src="${strDrinkThumb}"
    class='drinkImage'
    alt="${strDrink}"
    id='${strDrink} image'
    />
    <h2>${strDrink}</h2>
    <br>
    <button class=yesPleaseBtn id=${idDrink}>Yes, please! &#x2661;`
    cocktailCardDiv.appendChild(card)
  })
}

const getAlcoholicDrinks = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
  .then((res) => res.json())
  .then((drinks) => renderAlcoholicDrinks(drinks))
}

const getNonAlcoholicDrinks = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
  .then((res) => res.json())
  .then(drinks => renderNonAlcoholicDrinks(drinks))
}

alcoholicText.addEventListener('click', getAlcoholicDrinks)
nonAlcoholicText.addEventListener('click', getNonAlcoholicDrinks)

getRandomCocktail()

const renderNonAlcoholicDrinks = (listOfDrinks) => {
  cocktailCardDiv.innerHTML = null
  cocktailCardDiv.className = 'multiCardHolder'
  alcoholicText.style.textDecoration = "none";
  alcoholicText.style.fontWeight = "normal";
  nonAlcoholicText.style.textDecoration = "underline";
  nonAlcoholicText.style.fontWeight = "bold";

  const allDrinksArray = listOfDrinks.drinks
  allDrinksArray.forEach(drink => {
    const { strDrink, strDrinkThumb, idDrink } = drink
    let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
    <img src="${strDrinkThumb}"
    class='drinkImage'
    alt="${strDrink}"
    id='${strDrink} image'
    />
    <h2>${strDrink}</h2>
    <br>
    <button class=yesPleaseBtn id=${idDrink}>Yes, please! &#x2661;`
    cocktailCardDiv.appendChild(card)
  })
}
