const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const content = document.querySelector(".container");
const popper = document.querySelector(".popper");

let productData = [];
let singleClickTimer;

//event to run fetch data
btn1.addEventListener("click", fetchProductData);
document.addEventListener("keypress", (event) => {
  console.log(event.keyCode);
  if (event.keyCode === 13 || event.which === 13) {
    fetchProductData();
  }
});

//event to handle one click
btn2.addEventListener("click", function () {
  popper.style.display = "block";

  clearTimeout(singleClickTimer);
  singleClickTimer = setTimeout(function () {
    popper.style.display = "none";
  }, 1500);
});
//event to delete product
btn2.addEventListener("dblclick", () => {
  clearTimeout(singleClickTimer);
  popper.style.display = "none";

  if (productData.length) {
    productData = [];
    content.innerHTML = `
  <div class="wellcomePage">
  Hello Form My Page Please Click in
  <span class="em">Get Product</span> to show Product
</div>`;
  }
});

// Function to fetch product
function fetchProductData() {
  let apiUrl = `https://dummyjson.com/products?limit=20`;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let weatherData = JSON.parse(xhr.responseText);
      displayProductData(weatherData);
    } else {
      displayErrorMessage("Failed to Fetch Product Data");
    }
  };

  xhr.onerror = function () {
    displayErrorMessage("Network Error Occurred");
  };

  xhr.send();
}

// Function to display product on the page
function displayProductData(data) {
  content.innerHTML = ""; // To Clear previous data
  productData = data.products;

  productData.forEach((el) => {
    content.innerHTML += `
    <div class="card-item">
      <div class="card-img">
        <img src="${el.thumbnail}" alt="Image" />
      </div>
      <div class="card-details">
        <div class="card-meta">
          <ul>
            <li><span>Brand</span> <span>${el.brand}</span></li>
            <li><span>Category</span> <span>${el.category}</span></li>
          </ul>
        </div>
        <h4 class="title">
          <a href="#">${el.title}</a>
        </h4>
        <p class="excerpt">${el.description}</p>
        <div class="fotter">
          <a href="#" class="btn">
            Read More
          </a>
          <span>$ ${el.price}</span>
        </div>
      </div>
    </div>`;
  });
}

// Function to display error messages on the page
function displayErrorMessage(message) {
  content.innerHTML = ""; // To Clear previous data

  let errorElement = document.createElement("p");
  content.textContent = message;
}
