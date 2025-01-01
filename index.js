const IMAGES = [
  "https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?ga=GA1.1.495411786.1732648319&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/nature-animals_1122-1999.jpg?ga=GA1.1.495411786.1732648319&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-hunt_23-2149167099.jpg?t=st=1735582486~exp=1735586086~hmac=de62c65fdb054d793096ae23e5836b5a253ef4aa9ce5136c2cdaa5a5ba36c278&w=1380",
  "https://img.freepik.com/free-photo/cute-cat-spending-time-indoors_23-2150649172.jpg?t=st=1735582472~exp=1735586072~hmac=af1698968a24be818740053541860c70b89def629da81b57e3669af2ba15f722&w=1380",
  "https://img.freepik.com/free-photo/closeup-shot-ginger-kitten-with-green-eyes-white-background_181624-29784.jpg?t=st=1735582496~exp=1735586096~hmac=4ae19d28985aacf038bd40139c34a5723450678622337d51c84f800dd2af1459&w=1380",
];
const activeImageContainer = document.querySelector("#active-image-container");
const activeImage = document.querySelector("#active-image-container > img");
const paginationContainer = document.querySelector("#pagination");
const nextImageBtn = document.querySelector("#next-image");
const previousImageBtn = document.querySelector("#previous-image");

let currentImageIndex = 0;
let isUserActive = false;

const showNextImage = () => {
  if (currentImageIndex >= IMAGES.length - 1) {
    currentImageIndex = 0;
  } else {
    currentImageIndex++;
  }
  activeImage.src = IMAGES[currentImageIndex];
};
const showPreviousImage = () => {
  if (currentImageIndex <= 0) {
    currentImageIndex = IMAGES.length - 1;
  } else {
    currentImageIndex--;
  }
  activeImage.src = IMAGES[currentImageIndex];
};

const updatePagination = () => {
  resetPagination();
  highlightCurrentPagination();
};
const updateActivityStatus = () => {
  isUserActive = true;
  setTimeout(() => (isUserActive = false), 1000);
};
nextImageBtn.addEventListener("click", () => {
  updateActivityStatus();
  showNextImage();
  updatePagination();
});
previousImageBtn.addEventListener("click", () => {
  updateActivityStatus();
  showPreviousImage();
  updatePagination();
});

const populatePagination = (() =>
  IMAGES.forEach((_, i) => {
    const button = document.createElement("button");
    const icon = document.createElement("i");
    icon.classList.add("fa-circle");
    paginationContainer.append(button);
    button.append(icon);
    if (i === 0) {
      icon.classList.add("fa-solid");
    } else {
      icon.classList.add("fa-regular");
    }
  }))();

const resetPagination = () => {
  const paginationButtonsArray = Array.from(paginationContainer.children);
  paginationButtonsArray.forEach((button) => {
    button.firstChild.classList.remove("fa-solid");
    button.firstChild.classList.add("fa-regular");
  });
};
const fillPaginationIcon = (icon) => {
  icon.classList.remove("fa-regular");
  icon.classList.add("fa-solid");
};

const highlightCurrentPagination = () => {
  const paginationButtonsArray = Array.from(paginationContainer.children);
  const buttonToHighlight = paginationButtonsArray[currentImageIndex];
  const buttonIcon = buttonToHighlight.firstChild;
  fillPaginationIcon(buttonIcon);
};

paginationContainer.addEventListener("click", ({ target }) => {
  if (target.tagName !== "I") {
    return;
  }
  updateActivityStatus();
  resetPagination();
  fillPaginationIcon(target);
  const paginationIndex = Array.from(paginationContainer.children).indexOf(
    target.parentNode
  );
  currentImageIndex = paginationIndex;
  activeImage.src = IMAGES[paginationIndex];
});

const slideshow = (() => {
  setInterval(() => {
    if (!isUserActive) {
      showNextImage();
    }
  }, 5000);
})();
