const mainBody = document.getElementById('title')
const cocktailCardDiv = document.getElementById('cocktailCardDiv')
const headerBtns = document.getElementsByClassName('headerBtn')

const getRandomCocktail = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((drink) => renderOneDrink(drink))
}

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
  document.getElementById('cocktailCardDiv').appendChild(card)
}

//Alcoholic Section
const renderAlcoholicDrinks = (listOfDrinks) => {
  cocktailCardDiv.innerHTML = null
  cocktailCardDiv.className = 'multiCardHolder'
  nonAlcoholicText.style.backgroundColor = 'white'
  alcoholicText.style.backgroundColor = '#F2F2F2'
  const allDrinksArray = listOfDrinks.drinks
  // console.log(allDrinksArray)
  allDrinksArray.forEach((drink, index) => {
    console.log(index)
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
    // card.innerHTML = `
    // <img src="${strDrinkThumb}"
    // class='drinkImage'
    // alt="${strDrink}
    // id='${strDrink} image'
    // />
    // <h2>${strDrink}</h2>
    // <button class=imOverItBtn>I'm Over It!`
    document.getElementById('cocktailCardDiv').appendChild(card)
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

const alcoholicText = document.getElementById('alcoholic')
const nonAlcoholicText = document.getElementById('nonAlcoholic')
alcoholicText.addEventListener('click', getAlcoholicDrinks)
nonAlcoholicText.addEventListener('click', getNonAlcoholicDrinks)

//Add event listener that fills in heart when favorited

getRandomCocktail()

//Non-alcoholic section
  //Able to filter by ingredient
const renderNonAlcoholicDrinks = (listOfDrinks) => {
  mainBody.innerHTML = null
  alcoholicText.style.backgroundColor = 'white'
  nonAlcoholicText.style.backgroundColor = '#F2F2F2'
  console.log(listOfDrinks)
  }

//Search section
  //Search based on a keyword

//Favorites List
  //Add event listener to 'Yes, please' btn
    //Adds cocktail info + instructions to favorites list (adds to a new array)
    //Add button w/ event listener that deletes cocktail from favorites (deletes from new array)


