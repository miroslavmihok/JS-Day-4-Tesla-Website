gsap.registerPlugin(ScrollToPlugin);

// ARRAY WITH CAR OBJECTS
const cars = [
  {
    name: "Model S",
    reach: "634",
    zeroToH: "3.2",
    category: "Model-S",
    description:
      "Das Tesla Model S ist eine batterieelektrisch angetriebene Oberklasse-Limousine des US-amerikanischen Herstellers Tesla.",
    price: 94990,
    images: [
      "./assets/ModelS_1.jpg",
      "./assets/ModelS_2.jpg",
      "./assets/ModelS_3.jpg",
      "./assets/ModelS_4.jpg",
      "./assets/ModelS_5.jpg",
    ],
    mainImg: "./assets/ModelS_1.png",
  },
  {
    name: "Model 3",
    reach: "513",
    zeroToH: "6,1",
    category: "Model-3",
    description:
      "Das Model 3 ist eine batterieelektrisch angetriebene Limousine des US-amerikanischen Herstellers Tesla.",
    price: 42990,
    images: [
      "./assets/Model3_1.jpg",
      "./assets/Model3_2.jpg",
      "./assets/Model3_3.jpg",
      "./assets/Model3_4.jpg",
      "./assets/Model3_5.jpg",
    ],
    mainImg: "./assets/Model3_1.png",
  },
  {
    name: "Model X",
    reach: "576",
    zeroToH: "3.9",
    category: "Model-X",
    description:
      "Das Tesla Model X von Tesla, Inc. ist ein allradgetriebener SUV mit elektrischem Antrieb.",
    price: 99990,
    images: [
      "./assets/ModelX_1.jpg",
      "./assets/ModelX_2.jpg",
      "./assets/ModelX_3.jpg",
      "./assets/ModelX_4.jpg",
      "./assets/ModelX_5.jpg",
    ],
    mainImg: "./assets/ModelX_1.png",
  },
];

const sectionCars = document.querySelector(".wrapper__cars");

// ON PAGE LOAD

window.document.addEventListener("DOMContentLoaded", function () {
  displayCars(cars);
  addPagesToArray();
});

// BACKGROUND IMAGE DECLARATION and TIMER for IMAGE CHANGE

const imageSrcs = ["bg1.png", "bg2.png", "bg3.png"];
const base = "./assets/";

const preloadedImages = [];

imageSrcs.forEach(function (imageSrc) {
  let imagePath = base + imageSrc;
  console.log("Loading image:", imagePath);
  let image = new Image();
  image.src = imagePath;
  preloadedImages.push(image);
});

const bgContainer = document.getElementById("container");

let i = 0;

function changePicture() {
  bgContainer.style.background = `url(${preloadedImages[i].src}) no-repeat center/cover`;
  i++;

  if (i > imageSrcs.length - 1) {
    i = 0;
  }
}
changePicture();
window.setInterval(changePicture, 8000);

// CHECKING BUTTON CLASSLIST
let buttonClass = "";

const displayCars = (carItems) => {
  let displayCar = carItems.map((item) => {
    return `<div class="wrapper__car" id="${item.category}">
        <div class="wrapper__description">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <button class="button__car 
            ${item.category}">Show more</button>
        </div>
        <div class="wrapper__image">
          <img src="${item.mainImg}" alt="${item.name}" />
        </div>
      </div>`;
  });
  displayCar = displayCar.join("");
  sectionCars.innerHTML = displayCar;

  // MODAL DECLARATIONS for BUTTONS and OVERLAY

  const modalBtns = document.querySelectorAll(".button__car");
  const closeBtn = document.querySelector(".close-btn");
  const modalOverlay = document.querySelector(".modal-overlay");

  // BUTTONS to show MODAL

  modalBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      modalOverlay.classList.add("open-modal");
      if (btn.classList.contains("Model-S")) {
        buttonClass = "Model-S";
      } else if (btn.classList.contains("Model-3")) {
        buttonClass = "Model-3";
      } else {
        buttonClass = "Model-X";
      }
      displayModal(buttonClass);
    });
  });

  closeBtn.addEventListener("click", function () {
    modalOverlay.classList.remove("open-modal");
  });
};

// MODAL DECLARATIONS for MODAL CONTENT

// const image1 = document.querySelector('#image1');
const infoCarName = document.querySelector("#car__name");
const infoCarDescription = document.querySelector("#car__description");
const statReach = document.querySelector("#car__reach");
const statZeroToH = document.querySelector("#car__zeroToH");
const priceCarName = document.querySelector("#price__car__name");
const carPrice = document.querySelector("#car__price");

//MODAL FUNCTION

const displayModal = (buttonClass) => {
  let index = 0;
  let item = null;

  if (buttonClass === "Model-S") {
    index = 0;
  } else if (buttonClass === "Model-3") {
    index = 1;
  } else {
    index = 2;
  }

  item = cars[index];

  const itemImages = item.images;

  // image1.src = item.images[0];
  infoCarName.textContent = item.name;
  infoCarDescription.textContent = item.description;
  statReach.textContent = item.reach;
  statZeroToH.textContent = item.zeroToH;
  priceCarName.textContent = item.name;
  carPrice.textContent = item.price;

  // CAROUSSEL DECLARATIONS and FUNCTIONALITY

  const modalLeftContainer = document.querySelector(".modal_left_container");

  // CREATING SLIDES

  let imageArray = itemImages.map((image, index) => {
    return `<div class="modal_slide">
    <img src=${image} alt=${item.name} id=${item.name} />
  </div>`;
  });
  imageArray = imageArray.join("");
  modalLeftContainer.innerHTML = imageArray;

  // TRANSLATING SLIDES

  const slides = document.querySelectorAll(".modal_slide");
  const nextBtn = document.querySelector(".btn-right");
  const prevBtn = document.querySelector(".btn-left");

  slides.forEach(function (slide, index) {
    slide.style.left = `${index * 100}%`;
  });

  let counter = 0;

  nextBtn.addEventListener("click", function () {
    counter++;
    carousel();
  });

  prevBtn.addEventListener("click", function () {
    counter--;
    carousel();
  });

  function carousel() {
    if (counter === slides.length) {
      counter = 0;
    }
    if (counter < 0) {
      counter = slides.length - 1;
    }

    slides.forEach(function (slide) {
      slide.style.transform = `translateX(-${counter * 100}%)`;
    });
  }
};

// CAROUSSEL BUTTON EFFECT

const buttonLeft = document.querySelector(".btn-left");
const buttonRight = document.querySelector(".btn-right");
const modalLeft = document.querySelector(".modal_left");

modalLeft.addEventListener("mouseover", function () {
  buttonLeft.classList.add("btn-in-right");
  buttonRight.classList.add("btn-in-left");
  buttonLeft.classList.remove("btn-out-left");
  buttonRight.classList.remove("btn-out-right");
});

modalLeft.addEventListener("mouseout", function () {
  buttonLeft.classList.remove("btn-in-right");
  buttonRight.classList.remove("btn-in-left");
  buttonLeft.classList.add("btn-out-left");
  buttonRight.classList.add("btn-out-right");
});

// slide animation
const homePage = document.querySelector("#container");
const container = document.querySelector("body");

function addPagesToArray() {
  const carPages = document.querySelectorAll(".wrapper__car");

  carPages.forEach((item) => {
    slides.push(item);
  });
}

const slides = [homePage];

let oldSlide = 0;
let activeSlide = 0;

// main function

function slideAnim(e) {
  oldSlide = activeSlide;

  // user doesnt have to scroll by steps with this
  if (gsap.isTweening(window)) {
    return;
  } else {
    activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
  }
  // making sure we're not past the end or beginning slide
  activeSlide = activeSlide < 0 ? 0 : activeSlide;
  activeSlide =
    activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
  if (oldSlide === activeSlide) {
    return;
  }
  gsap.to(window, { duration: 1, scrollTo: { y: slides[activeSlide] } });
}

// OUR MODELS BUTTON

const modelsBtn = document.querySelector(".button__allcars");

modelsBtn.addEventListener("click", () => {
  activeSlide = 1;
  gsap.to(window, { duration: 1, scrollTo: { y: `.wrapper__cars` } });
});

window.addEventListener("wheel", slideAnim);
