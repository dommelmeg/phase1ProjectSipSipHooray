const cocktailCardDiv = document.getElementById('cocktailCardDiv')
const sshLogo = document.getElementById('logo')
const alcoholicText = document.getElementById('alcoholic')
const nonAlcoholicText = document.getElementById('nonAlcoholic')
const feelingAdventurousText = document.getElementById('feelingAdventurous')
const loveItBtn = document.getElementById('loveItBtn')
const header = document.querySelector('div#title h1')
const subHead = document.querySelector('div#title p')
const filledHeart = '&#x2665'
const unfilledHeart = '&#x2661'
const titleDiv = document.getElementById('title')

const getDropDownItems = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
  .then((res) => res.json())
  .then((category) => createFilterContainer(category))
}

const getRandomCocktail = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then((res) => res.json())
  .then((drink) => createFeelingAdventurousContainer(drink))
}

const getAlcoholicDrinks = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
  .then((res) => res.json())
  .then((drinks) => createAlcoholicContainer(drinks))
}

const getNonAlcoholicDrinks = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
  .then((res) => res.json())
  .then(drinks => createNonAlcoholicContainer(drinks))
}

const getFilteredDrinks = (category) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
  .then((res) => res.json())
  .then((drinks) => renderMultipleDrinks(drinks))
}

const addMouseoverEvent = (card) => {
  card.addEventListener('mouseover', () => {
    card.id = 'dropshadow'
  })
  card.addEventListener('mouseout', () => {
    card.id = ''
  })
}

const removeShakeItUpBtn = () => {
  const shakeItUpBtn = document.getElementById('shakeItUp')
  if (!shakeItUpBtn) return
  shakeItUpBtn.remove()
}

const removeDropdown = () => {
  const dropdownDiv = document.getElementById('selector')
  if (!dropdownDiv) return
  dropdownDiv.remove()
}

const addLikeUnlikeBtn = (idDrink) => {
  const individualBtn = document.getElementById(`${idDrink}`)
  individualBtn.addEventListener('click', (e) => {
    const currentState = e.target.className
    if (currentState === 'loveItBtn') {
      individualBtn.innerHTML = `Love it! ${filledHeart}`
      individualBtn.className = 'overItBtn'
    } else if (currentState === 'overItBtn') {
      individualBtn.innerHTML = `Love it! ${unfilledHeart}`
      individualBtn.className = 'loveItBtn'
    }
  })
}

const clearTabs = () => {
  alcoholicText.style.textDecoration = 'none'
  alcoholicText.style.fontWeight = 'normal'
  nonAlcoholicText.style.textDecoration = 'none'
  nonAlcoholicText.style.fontWeight = 'normal'
  feelingAdventurousText.style.textDecoration = 'none'
  feelingAdventurousText.style.fontWeight = 'normal'
}

const toggleTab = (selectedTab) => {
  clearTabs()
  let tabSelected
  if (selectedTab === 'alcoholic') {
    tabSelected = alcoholicText
  } else if (selectedTab === 'non alcoholic') {
    tabSelected = nonAlcoholicText
  } else if (selectedTab === 'feeling adventurous') {
    tabSelected = feelingAdventurousText
  }
  tabSelected.style.textDecoration = 'underline'
  tabSelected.style.fontWeight = 'bold'
}

const createFilterContainer = (categories) => {
  header.textContent = 'Eat, Sleep, Cocktail, Repeat.'
  subHead.textContent = 'Have a favorite type of drink? Try selecting it below to switch up the recipe!'
  cocktailCardDiv.innerHTML = null

  clearTabs()

  const dropdownHolder = document.getElementById('selector') ?? document.createElement('div')
  if(dropdownHolder.id !== 'selector') {
    dropdownHolder.id = 'selector'
    cocktailCardDiv.parentNode.insertBefore(dropdownHolder, cocktailCardDiv)
  
    const dropdown = document.createElement('select')
    dropdown.name = 'categories'
    dropdown.id = 'categories'
    dropdownHolder.appendChild(dropdown)
    
    const allCategories = categories.drinks
    allCategories.forEach(category => {
      const { strCategory } = category
      const option = document.createElement('option')
      option.value = `${strCategory}`
      option.innerHTML = `${strCategory}`
      dropdown.appendChild(option)
    })

    dropdown.addEventListener('change', (e) => {
      const selectedCategory = e.target.value
      getFilteredDrinks(selectedCategory)
    })
  }
  removeShakeItUpBtn()
}

const renderMultipleDrinks = (objectOfDrinks) => {
  cocktailCardDiv.innerHTML = null
  cocktailCardDiv.className = 'multiCardHolder'

  const arrayOfDrinks = objectOfDrinks.drinks
  arrayOfDrinks.forEach(drink => {
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
      <button class=loveItBtn id=${idDrink}>Love it! ${unfilledHeart};
    `
    cocktailCardDiv.appendChild(card)

    addMouseoverEvent(card)
    addLikeUnlikeBtn(idDrink)
  })
  removeShakeItUpBtn()
}

const createAlcoholicContainer = (listOfDrinks) => {
  header.textContent = 'Knock knock, its cocktail o clock!'
  subHead.textContent = null
  removeDropdown()
  
  toggleTab('alcoholic')
  renderMultipleDrinks(listOfDrinks)
}

const createNonAlcoholicContainer = (listOfDrinks) => {
  header.textContent = 'Gunna be a mocktail for me.'
  subHead.textContent = null
  removeDropdown()
  
  toggleTab('non alcoholic')
  renderMultipleDrinks(listOfDrinks)
}

const createFeelingAdventurousContainer = (randomDrink) => {
  header.textContent = 'Feeling Adventurous?'
  subHead.textContent = 'We\'ll randomly select a cocktail for you. And let\'s be honest, it will probably be your new favorite.'

  cocktailCardDiv.innerHTML = null
  cocktailCardDiv.className = 'cocktailCardDiv'
  removeDropdown()
  
  toggleTab('feeling adventurous')
  
  const randomDrinkArray = randomDrink.drinks
  const { strAlcoholic, strDrink, strGlass, strDrinkThumb, idDrink } = randomDrinkArray[0]
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
    <button class=loveItBtn id=${idDrink}>Love it! ${unfilledHeart};
  `
  cocktailCardDiv.appendChild(card)

  addMouseoverEvent(card)
  addLikeUnlikeBtn(idDrink)
  
  const btn = document.getElementById('shakeItUp') ?? document.createElement('button')
  if(btn.id !== 'shakeItUp') {
    btn.id = 'shakeItUp'
    btn.textContent = 'Shake It Up!'
    cocktailCardDiv.parentNode.insertBefore(btn, cocktailCardDiv)
  }
  btn.addEventListener('click', getRandomCocktail)
}

alcoholicText.addEventListener('click', getAlcoholicDrinks)
nonAlcoholicText.addEventListener('click', getNonAlcoholicDrinks)
feelingAdventurousText.addEventListener('click', getRandomCocktail)
sshLogo.addEventListener('click', getDropDownItems)

getDropDownItems()
