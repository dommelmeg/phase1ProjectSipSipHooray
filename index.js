const mainBody = document.getElementById('title')
const cocktailCardDiv = document.getElementById('cocktailCardDiv')
const headerBtns = document.getElementsByClassName('headerBtn')
const sshLogo = document.getElementById('logo')
const multiCardHolderDiv = document.getElementById('multiCardHolder')
const alcoholicText = document.getElementById('alcoholic')
const nonAlcoholicText = document.getElementById('nonAlcoholic')

const getRandomCocktail = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((drink) => renderOneDrink(drink))
}

//Need to add title text via JS (not hard coded)
const renderOneDrink = (randomDrink) => {
  //*bonus* add event listener on 'shake it up' button – won't autogenerate when opening page
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
  <button class=yesPleaseBtn>Yes, please!`
  cocktailCardDiv.appendChild(card)
}

//Add click event to logo

//Alcoholic Section
const renderAlcoholicDrinks = (listOfDrinks) => {
  cocktailCardDiv.innerHTML = null
  cocktailCardDiv.className = 'multiCardHolder'
  nonAlcoholicText.style.backgroundColor = 'white'
  alcoholicText.style.backgroundColor = '#F2F2F2'

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
    <button class=yesPleaseBtn>Yes, please!`
    cocktailCardDiv.appendChild(card)
  })
}

const renderManyDrinks = (listOfDrinks) => {
  
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

//Add event listener that fills in heart when favorited

getRandomCocktail()

//Non-alcoholic section
//Able to filter by ingredient
const renderNonAlcoholicDrinks = (listOfDrinks) => {
  cocktailCardDiv.innerHTML = null
  cocktailCardDiv.className = 'multiCardHolder'
  alcoholicText.style.backgroundColor = 'white'
  nonAlcoholicText.style.backgroundColor = '#F2F2F2'

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
    <button class=yesPleaseBtn>Yes, please!`
    cocktailCardDiv.appendChild(card)
  })
}

//Favorites List
//Add event listener to 'Yes, please' btn
//Adds cocktail info + instructions to favorites list (adds to a new array)
//Add button w/ event listener that deletes cocktail from favorites (deletes from new array)


sshLogo.addEventListener('click', function(){
  console.log('hi')
  getRandomCocktail()
})
