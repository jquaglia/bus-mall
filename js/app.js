'use strict';

// Global Variables
var maxClicksAllowed = 25;
var actualClicks = 0;
var allProducts = [];

// get ids from the DOM
var myContainer = document.getElementById('container');
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var resultsList = document.getElementById('results');
var myButton = document.getElementById('button');

// product constructor
function Product(productName, src) {
  this.name = productName;
  this.src = `img/${productName}.${src}`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}



// DETERMINE WHICH PRODUCT IS VIEWED
// get random index
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// assign a src, alt, title to image
function renderProducts() {
  var productArray = [];
  // validation
  // productArray.push(productOneIndex);
  while (productArray.length < 3) {
    var tempIndex = getRandomIndex(allProducts.length);
    while (productArray.includes(tempIndex)){
      tempIndex = getRandomIndex(allProducts.length);
    }
    // console.log(tempIndex);
    productArray.push(tempIndex);

  }
  // console.log(productArray);
  // 1 random index, push 1 into array, get random index 2, check array for index 2, if false, move on, if true, get random index 2 again, get random index 3, check array for index 3, if true, get random index3 again, if false, move on.

  var productOneIndex = productArray.pop();
  // console.log('productOneIndex', productOneIndex);
  var productTwoIndex = productArray.pop();
  var productThreeIndex = productArray.pop();

  // console.log(productArray);

  imageOneElement.src = allProducts[productOneIndex].src;
  imageOneElement.alt = allProducts[productOneIndex].name;
  imageOneElement.title = allProducts[productOneIndex].name;
  //log the views
  allProducts[productOneIndex].views++;

  imageTwoElement.src = allProducts[productTwoIndex].src;
  imageTwoElement.alt = allProducts[productTwoIndex].name;
  imageTwoElement.title = allProducts[productTwoIndex].name;
  //log the views
  allProducts[productTwoIndex].views++;

  imageThreeElement.src = allProducts[productThreeIndex].src;
  imageThreeElement.alt = allProducts[productThreeIndex].name;
  imageThreeElement.title = allProducts[productThreeIndex].name;
  //log the views
  allProducts[productThreeIndex].views++;
}

// event handler
function handleClick(event) {
  actualClicks++;
  var clickedProduct = event.target.title;
  for (var i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }
  // reassign image src properties - call that function again?
  renderProducts();

  // validation for when we hit our max clicks
  if (actualClicks === maxClicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    var button = document.createElement('button');
    button.innerHTML = 'Results';
    myButton.appendChild(button);
    handlePush();
  }
}

function handlePush(event){
  var clickedButton = event.target.button;
  for (var j = 0; j < allProducts.length; j++) {
    var liElement = document.createElement('li');
    liElement.textContent = `${allProducts[j].name} was viewed ${allProducts[j].views} times and clicked ${allProducts[j].votes} times`;
    resultsList.appendChild(liElement);
    if (clickedButton === true){
      document.removeEventListener('click', handlePush);
    }
  }
}

//Instantiations
new Product('bag', 'jpg');
new Product('banana', 'jpg');
new Product('bathroom', 'jpg');
new Product('boots', 'jpg');
new Product('breakfast', 'jpg');
new Product('bubblegum', 'jpg');
new Product('chair', 'jpg');
new Product('cthulhu', 'jpg');
new Product('dog-duck', 'jpg');
new Product('dragon', 'jpg');
new Product('pen', 'jpg');
new Product('pet-sweep', 'jpg');
new Product('scissors', 'jpg');
new Product('shark', 'jpg');
new Product('sweep', 'png');
new Product('tauntaun', 'jpg');
new Product('unicorn', 'jpg');
new Product('usb', 'gif');
new Product('water-can', 'jpg');
new Product('wine-glass', 'jpg');

// executable code
renderProducts();

// event listener
myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handlePush);
