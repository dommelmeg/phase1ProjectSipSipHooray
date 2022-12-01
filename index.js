const cocktailCardDiv = document.getElementById('cocktailCardDiv')
const headerBtns = document.getElementsByClassName('headerBtn')
const sshLogo = document.getElementById('logo')
const multiCardHolderDiv = document.getElementById('multiCardHolder')
const alcoholicText = document.getElementById('alcoholic')
const nonAlcoholicText = document.getElementById('nonAlcoholic')
const feelingAdventurousText = document.getElementById('feelingAdventurous')
const loveItBtn = document.getElementById('loveItBtn')
const header = document.querySelector('div#title h1')
const subHead = document.querySelector('div#title p')
const titleDiv = document.getElementById('title')


const getRandomCocktail = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((drink) => renderOneDrink(drink))
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

const renderOneDrink = (randomDrink) => {
  header.textContent = 'Feeling Adventurous?'
  subHead.textContent = 'We\'ll randomly select a cocktail for you. And let\'s be honest, it will probably be your new favorite.'
  // const shakeItUpBtn = document.createElement('button')
  // shakeItUpBtn.id = 'shakeItUp'
  // shakeItUpBtn.textContent = 'Shake It Up!'
  // cocktailCardDiv.parentNode.insertBefore(shakeItUpBtn, cocktailCardDiv)

  // shakeItUpBtn.addEventListener('click', getRandomCocktail)

  cocktailCardDiv.innerHTML = null
  cocktailCardDiv.className = 'cocktailCardDiv'
  nonAlcoholicText.style.textDecoration = 'none';
  nonAlcoholicText.style.fontWeight = 'normal';
  alcoholicText.style.textDecoration = 'none';
  alcoholicText.style.fontWeight = 'normal';
  feelingAdventurousText.style.textDecoration = 'underline';
  feelingAdventurousText.style.fontWeight = 'bold';

  const randomDrinkArray = randomDrink.drinks
  const { strAlcoholic, strDrink, strGlass, strDrinkThumb } = randomDrinkArray[0]
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
  <img src="${strDrinkThumb}"
    class='drinkImage'
    alt="${strDrink}"
    id='${strDrink} image'
  />
  <h2>${strDrink}</h2>
  <h3>${strAlcoholic} | ${strGlass}
  <br>
  <button class=loveItBtn>Love it! &#x2661;`
  cocktailCardDiv.appendChild(card)

  const individualBtn = document.getElementsByClassName('loveItBtn')[0]
    individualBtn.addEventListener('click', function(){
      individualBtn.innerHTML = 'Love it! &#x2665;'
  })
}

const renderAlcoholicDrinks = (listOfDrinks) => {
  cocktailCardDiv.innerHTML = null
  cocktailCardDiv.className = 'multiCardHolder'
  nonAlcoholicText.style.textDecoration = 'none';
  nonAlcoholicText.style.fontWeight = 'normal';
  feelingAdventurousText.style.textDecoration = "none";
  feelingAdventurousText.style.fontWeight = "normal";
  alcoholicText.style.textDecoration = 'underline';
  alcoholicText.style.fontWeight = 'bold';

  header.textContent = 'Knock knock, its cocktail o clock!'
  subHead.textContent = null

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
    <button class=loveItBtn id=${idDrink}>Love it! &#x2661;`
    cocktailCardDiv.appendChild(card)

    const individualBtn = document.getElementById(`${idDrink}`)
    individualBtn.addEventListener('click', function(){
      individualBtn.innerHTML = 'Love it! &#x2665'
    })
  })
}

const renderNonAlcoholicDrinks = (listOfDrinks) => {
  cocktailCardDiv.innerHTML = null
  cocktailCardDiv.className = 'multiCardHolder'
  alcoholicText.style.textDecoration = "none";
  alcoholicText.style.fontWeight = "normal";
  feelingAdventurousText.style.textDecoration = "none";
  feelingAdventurousText.style.fontWeight = "normal";
  nonAlcoholicText.style.textDecoration = "underline";
  nonAlcoholicText.style.fontWeight = "bold";

  header.textContent = 'Its gunna be a mocktail for me.'
  subHead.textContent = null
  
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
    <button class=loveItBtn id=${idDrink}>Love it! &#x2661;`
    cocktailCardDiv.appendChild(card)
    
    const individualBtn = document.getElementById(`${idDrink}`)
    individualBtn.addEventListener('click', function(){
      individualBtn.innerHTML = 'Love it! &#x2665;'
    })
  })
}

alcoholicText.addEventListener('click', getAlcoholicDrinks)
nonAlcoholicText.addEventListener('click', getNonAlcoholicDrinks)
feelingAdventurousText.addEventListener('click', getRandomCocktail)
