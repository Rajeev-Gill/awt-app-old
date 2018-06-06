
var slider = Peppermint(document.getElementById('peppermint'), {
  dots: true,
  onSetup: function(n) {
    console.log('Peppermint setup done. Slides found: ' + n);
  }
});

var screens = [];

screens[0] = document.getElementById('screen1');
screens[1] = document.getElementById('screen2');
screens[2] = document.getElementById('screen3');
screens[3] = document.getElementById('screen4');

var button = document.querySelectorAll('.next');
var backButton = document.querySelectorAll('.back');
var footers = document.querySelectorAll('.footer');

var startScreen = screens[0];
var currentScreen = screens[0];
var nextScreen  = screens[1];

//Nutrient Table elements
var nutrientDOMelements = [];

//Food storage arrays
var skin = [];
var fat = [];
var cancer = [];
var muscle = [];
var cholesterol = [];
var immune = [];
var antImf = [];

//For each food item check if it belongs in a given category, if it does store it
for (var i = 0; i < foods.length; i++) {
  if (foods[i].foodItemBenefits.includes("skin")) {
    skin.push(foods[i]);
  }
  if (foods[i].foodItemBenefits.includes("fat")) {
    fat.push(foods[i]);
  }
  if (foods[i].foodItemBenefits.includes("cancer")) {
    cancer.push(foods[i]);
  }
  if (foods[i].foodItemBenefits.includes("muscle")) {
    muscle.push(foods[i]);
  }
  if (foods[i].foodItemBenefits.includes("cholesterol")) {
    cholesterol.push(foods[i]);
  }
  if (foods[i].foodItemBenefits.includes("immune")) {
    immune.push(foods[i]);
  }
  if (foods[i].foodItemBenefits.includes("antImf")) {
    antImf.push(foods[i]);
  }
}

function changeScreen(currentScreenNum, nextScreenNum) {
  //Hide the current screen if it is active
  if (screens[currentScreenNum].classList.contains('active')) {
    screens[currentScreenNum].classList.remove('active');
    screens[currentScreenNum].classList.add('hidden');
  }
  //Show the next screen if it is hidden
  if (screens[nextScreenNum].classList.contains('hidden')) {
    screens[nextScreenNum].classList.remove('hidden');
    screens[nextScreenNum].classList.add('active');
  }
  //Log the current screen to the console
  currentScreen = screens[nextScreenNum];
  console.log('Current screen: ' + currentScreen.id);
}

//----SCREEN 2----//

//List of health issues/problems
var issueList = document.querySelector('.issues');
var issueListItems = document.querySelectorAll('.issue')
//issueListItems[i].textContent

// function createFilteredFoodList(foodType) { //pass in food storage array name
//   //If UL is empty
//   if(items.hasChildNodes() === false){
//       // for each mindFood item:
//     for (var j = 0; j < foodType.length; j++) {
//       //Create a li element
//       var listItem = document.createElement('li');
//       //Give the li element a class name of food-item
//       listItem.setAttribute('class','food-item');
//       //Set the elements text content to the name of the food item
//       console.log('Food: ' + foodType[j])
//       listItem.textContent = foodType[j].foodItemName;
//       //Append the named li element to the UL
//       items.appendChild(listItem);
//     }
//   }
// }


function createFilteredFoodList(foodType) { //pass in food storage array name
    //Clear list
    items.innerHTML = '';
    // for each mindFood item:
    for (var j = 0; j < foodType.length; j++) {
      //Create a li element
      var listItem = document.createElement('li');
      //Give the li element a class name of food-item
      listItem.setAttribute('class','food-item');
      //Set the elements text content to the name of the food item
      console.log('Food: ' + foodType[j])
      listItem.textContent = foodType[j].foodItemName;
      //Append the named li element to the UL
      items.appendChild(listItem);
    }

}

//IssueList click listeners (Event delegation)
issueList.addEventListener('click', function(event){
  var elementClicked = event.target;
  console.log('Chosen issue: ' + elementClicked.textContent);

  //If trouble sleeping is clicked populate the issues UL with mindFoods
  if (elementClicked.textContent == 'Fat Fighting Foods') {
    createFilteredFoodList(fat)
    changeScreen(1,2);
  }

  if (elementClicked.textContent == 'Foods for Your Immune System') {
    createFilteredFoodList(immune)
    changeScreen(1,2);
  }

  if (elementClicked.textContent == 'Foods for Your Skin') {
    createFilteredFoodList(skin)
    changeScreen(1,2);
  }

  if (elementClicked.textContent == 'Foods for Sore Muscles') {
    createFilteredFoodList(muscle)
    changeScreen(1,2);
  }

  if (elementClicked.textContent == 'Foods for High Cholesterol') {
    createFilteredFoodList(cholesterol)
    changeScreen(1,2);
  }

  if (elementClicked.textContent == 'Anti Cancer Foods') {
    createFilteredFoodList(immune)
    changeScreen(1,2);
  }

  if (elementClicked.textContent == 'Anti Inflammatory Foods') {
    createFilteredFoodList(antImf)
    changeScreen(1,2);
  }

});



//----SCREEN 3----//

//List of food items
var items = document.querySelector('.food-items');
var foodList = document.querySelector('.food-items');
var foodItemClicked = '';

//FoodList event listener
foodList.addEventListener('click', function(event){
  var elementClicked = event.target;
  foodItemClicked = elementClicked.textContent;
  console.log('Chosen food: ' + elementClicked.textContent);

  //If trouble sleeping is clicked populate the issues UL with mindFoods
  //####TO-DO Ensure list only gets populated if empty
  if (elementClicked.textContent == 'Artichoke') {
    //Set image to image of artichoke
    var foodImage = document.querySelector('.foodImage');
    foodImage.setAttribute('src', foods[0].image);
    //Get nutritional info for selected item
    getNutritionalInfo('11226');
    //Get recipe for selected item
    getRecipe('artichoke');
    //Change screen to selected item
    changeScreen(2,3);
  }

});

//----SCREEN 4----//

//Access food image via
// "url(" + foods[0].image + ")";

//Store nutrition table and button
var nutritionalButton = document.querySelector('.nutrition-button');
var nutritionTable = document.querySelector('.nutritional-info--table')

//When nutrition button is clicked expand the table
nutritionalButton.addEventListener('click', function () {
  nutritionTable.classList.toggle('table-expanded')
})

function getNutritionalInfo(databaseNumber) { //e.g. Oranges
  //Justify Technologies for blogging homework 22nd feb
  //GOV API key: 3D6pSDVULi3GrRrFMC6my8G9NMYG9GA3gRC7KpUv
  //Recieve info: result.foods[0].food.nutrients
  //Jquery AJAX call to USDA nutrition database
  $.ajax({url: 'https://api.nal.usda.gov/ndb/V2/reports?ndbno=' + databaseNumber + '&type=f&format=json&api_key=3D6pSDVULi3GrRrFMC6my8G9NMYG9GA3gRC7KpUv', success: function(result){
    console.log(result.foods[0].food.nutrients);

    //Store all nutrient values from api call
    var calories = result.foods[0].food.nutrients[1].value;
    console.log(calories);
    var fats = result.foods[0].food.nutrients[31].value;
    var carbs = result.foods[0].food.nutrients[6].value;
    var fiber = result.foods[0].food.nutrients[7].value;
    var protein = result.foods[0].food.nutrients[3].value;
    var vitamins = [];

    //Loop through nutrients and pick out any vitamins
    for (var i = 0; i < result.foods[0].food.nutrients.length; i++) {
      if (result.foods[0].food.nutrients[i].group == 'Vitamins') {
        vitamins.push(result.foods[0].food.nutrients[i].name);
      }
    }

    //Store dom elements for nutrients
    nutrientDOMelements = [
      document.getElementById('calories'),
      document.getElementById('fats'),
      document.getElementById('carbs'),
      document.getElementById('fiber'),
      document.getElementById('proteins'),
      document.getElementById('vits')
    ]

    //Set DOM elements to values from API call
    //for each dom element
    //if the id name matches calories
    //You will have to reset these dom elements when leaving page
    for (var i = 0; i < nutrientDOMelements.length; i++) {
      if (nutrientDOMelements[i].innerHTML == '') {
        if (nutrientDOMelements[i].id === 'calories') {
          nutrientDOMelements[i].innerHTML = calories;
        } else if (nutrientDOMelements[i].id === 'fats') {
          nutrientDOMelements[i].innerHTML = fats;
        } else if (nutrientDOMelements[i].id === 'carbs') {
          nutrientDOMelements[i].innerHTML = carbs;
        } else if (nutrientDOMelements[i].id === 'fiber') {
          nutrientDOMelements[i].innerHTML = fiber;
        } else if (nutrientDOMelements[i].id === 'proteins') {
          nutrientDOMelements[i].innerHTML = protein;
        } else if (nutrientDOMelements[i].id === 'vits') {
          nutrientDOMelements[i].innerHTML = vitamins;
        }
      }
    }
  }});
}

function clearDOM(element) { //nutrientDOMelements
  for (var i = 0; i < element.length; i++) {
    element[i].innerHTML = '';
  }
}

function getRecipe(ingredient) {
  //RECIPE API CODE
  //Key: a7bcebc0a91d34322a4ff5272180369b
  //Request: http://food2fork.com/api/search?key={a7bcebc0a91d34322a4ff5272180369b}&q=oranges
  $.ajax({url: 'https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=a7bcebc0a91d34322a4ff5272180369b&q=' + ingredient, success: function(result){
        //Store result as JSON in 'p' variable
        var p = JSON.parse(result);
        var recipes = p.recipes;
        console.log(recipes);
        //Grab recipe list
        var recipeList = document.querySelector('.recipe-list')
        //For each recipe item
        for (var i = 0; i < recipes.length; i++) {
          //Create a list item
          var recipeItem = document.createElement('li');
          //Create a link
          var a = document.createElement('a');
          //Set the link text to recipe item title
          a.textContent = recipes[i].title;
          //Set a href to recipe link
          a.setAttribute('href', recipes[i].source_url);
          //Set list item background to recipe image
          recipeItem.style.background = "url('" + recipes[i].image_url + "')";
          recipeItem.style.backgroundSize = "cover";
          recipeItem.appendChild(a);
          //Add list item to to list
          recipeList.appendChild(recipeItem);
        }

  }});
}

//Buttons
//Home button hides the current screen and shows the home screen
var homeButton = document.querySelector('.footer');

homeButton.addEventListener('click', function () {
  changeScreen(1,0);
});

button[0].addEventListener('click', function () {
  changeScreen(0, 1);
  nextScreen = screens[2];
});

//Back buttons
backButton[0].addEventListener('click', function(){
  changeScreen(1,0);
});
backButton[1].addEventListener('click', function(){
  changeScreen(2,1);
});

//Screen4 (Back)
backButton[2].addEventListener('click', function(){
  changeScreen(3,2);
  clearDOM(nutrientDOMelements);
})

//Home/footer
footers[0].addEventListener('click', function(){
  changeScreen(1, 0);
})
footers[1].addEventListener('click', function(){
  changeScreen(2, 0);
})
footers[2].addEventListener('click', function(){
  changeScreen(3, 0);
})
