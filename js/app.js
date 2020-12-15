'use strict';

// Global Variables
var maxClicksAllowed = 25;
var actualClicks = 0;
var allProducts = [];
var renderQueue = [];

// get ids from the DOM
var myContainer = document.getElementById('container');
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var resultsList = document.getElementById('results');
var myButton = document.getElementById('button');
var hiddenSection = document.getElementById('hidden-results');

// product constructor
function Product(productName, src = 'jpg') {
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
  // validation
  // 1 random index, push 1 into array, get random index 2, check array for index 2, if false, move on, if true, get random index 2 again, get random index 3, check array for index 3, if true, get random index3 again, if false, move on.
  while (renderQueue.length < 3) {
    var tempIndex = getRandomIndex(allProducts.length);
    while (renderQueue.includes(tempIndex)){
      tempIndex = getRandomIndex(allProducts.length);
    }
    renderQueue.push(tempIndex);
  }

  var productOneIndex = renderQueue.pop();
  var productTwoIndex = renderQueue.pop();
  var productThreeIndex = renderQueue.pop();

  productViews(imageOneElement, productOneIndex);
  productViews(imageTwoElement, productTwoIndex);
  productViews(imageThreeElement, productThreeIndex);
}

// add src, alt, title to image tag
function productViews(imgElement, productIndex){
  imgElement.src = allProducts[productIndex].src;
  imgElement.alt = allProducts[productIndex].name;
  imgElement.title = allProducts[productIndex].name;
  allProducts[productIndex].views++;
}

// event handler
function handleClick(event) {
  // if (){
  //   alert('Please click on the images')
  // } else actualClicks++;
  actualClicks++;
  var clickedProduct = event.target.title;
  for (var i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }
  // reassign image src properties - call that function again
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
  hiddenSection.style.display = 'block';
  for (var j = 0; j < allProducts.length; j++) {
    var liElement = document.createElement('li');
    liElement.textContent = `${allProducts[j].name} was viewed ${allProducts[j].views} times and clicked ${allProducts[j].votes} times`;
    resultsList.appendChild(liElement);
  }
  document.removeEventListener('click', handlePush);
}

//Instantiations
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('usb', 'gif');
new Product('water-can');
new Product('wine-glass');

// executable code
renderProducts();

// event listener
myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handlePush);
