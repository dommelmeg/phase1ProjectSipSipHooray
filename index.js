
const getRandomCocktail = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((drink) => renderOneDrink(drink))
}

const renderOneDrink = (randomDrink) => {
  //*bonus* add event listener on 'shake it up' button – won't autogenerate when opening page
  const diveDeep = randomDrink.drinks
  const { strAlcoholic, strDrink, strGlass, strDrinkThumb } = diveDeep[0]
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
  document.getElementById('cocktailCardDiv').appendChild(card)
  // console.log(randomDrink)
}

//Alcoholic Section – able to filter by alcohol
const renderDrinks = (listOfDrinks) => {
  console.log(listOfDrinks)
}

const getAlcoholicDrinks = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
    .then((res) => res.json())
    .then((drinks) => renderDrinks(drinks))
}

const getNonAlcoholicDrinks = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
    .then((res) => res.json())
    .then(drinks => renderDrinks(drinks))
}

const alcoholicText = document.getElementById('alcoholic')
const nonAlcoholicText = document.getElementById('nonAlcoholic')
alcoholicText.addEventListener('click', getAlcoholicDrinks)
nonAlcoholicText.addEventListener('click', getNonAlcoholicDrinks)

//Add event listener that fills in heart when favorited

getRandomCocktail()

//Non-alcoholic section
  //Able to filter by ingredient

//Search section
  //Search based on a keyword

//Favorites List
  //Add event listener to 'Yes, please' btn
    //Adds cocktail info + instructions to favorites list (adds to a new array)
    //Add button w/ event listener that deletes cocktail from favorites (deletes from new array)


