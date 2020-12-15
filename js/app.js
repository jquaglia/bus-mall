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
var hiddenSection = document.getElementById('hidden-results');
var ctx = document.getElementById('myChart').getContext('2d');

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
  while (renderQueue.length < 6) {
    var tempIndex = getRandomIndex(allProducts.length);
    while (renderQueue.includes(tempIndex)) {
      tempIndex = getRandomIndex(allProducts.length);
    }
    renderQueue.unshift(tempIndex);
  }
  // console.log(renderQueue);

  var productOneIndex = renderQueue.pop();
  var productTwoIndex = renderQueue.pop();
  var productThreeIndex = renderQueue.pop();

  productViews(imageOneElement, productOneIndex);
  productViews(imageTwoElement, productTwoIndex);
  productViews(imageThreeElement, productThreeIndex);
}

// add src, alt, title to image tag
function productViews(imgElement, productIndex) {
  imgElement.src = allProducts[productIndex].src;
  imgElement.alt = allProducts[productIndex].name;
  imgElement.title = allProducts[productIndex].name;
  allProducts[productIndex].views++;
}

// event handler
function handleClick(event) {
  if (event.target === myContainer){
    alert('Please click on the images');
  } else actualClicks++;
  // actualClicks++;
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
    hiddenSection.style.display = 'block';
    renderChart();
  }
}

// function to render the chart
function renderChart(){
  var namesArray = [];
  var votesArray = [];
  var viewsArray = [];

  for (var i = 0; i < allProducts.length; i++){
    namesArray.push(allProducts[i].name);
    votesArray.push(allProducts[i].votes);
    viewsArray.push(allProducts[i].views);
  }

  var myChart = new Chart(ctx, {    //eslint-disable-line
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: 'Number of Views',
        data: viewsArray,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      },
      {
        label: 'Number of Votes',
        data: votesArray,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        labels: {
          fontColor: 'black'
        }
      },
      responsive: false,
      scales: {
        scaleLabel: {
          fontColor: 'black'
        },
        xAxes: {
          ticks: {
            fontColor: 'black'
          }
        },
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: 'black'
          }
        }]
      }
    }
  });
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
