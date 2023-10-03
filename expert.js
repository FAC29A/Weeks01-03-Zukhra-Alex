// Get the current URL
var url = new URL(window.location.href);
// Get the search parameters from the URL
var params = new URLSearchParams(url.search);
// Retrieve the 'id' parameter from the URL, defaulting to 1 if not present
var expertId = parseInt(params.get("id")) || 1;

// Find the expert in the teamMembers array based on the 'id'
var expert = teamMembers.find(function (member) {
  return member.id === expertId;
});

if (expert) {
  // Populate the Expert-section with the expert's information
  var expertName = document.querySelector(".flex-expert-photo h2");
  var expertImage = document.querySelector(".flex-expert-photo img");
  var expertBio = document.querySelector(".flex-expert-bio article");
  var contactForm = document.querySelector(".contact-form");
  var contactFormExpertName = document.querySelector('label[for="message"]');

  expertImage.src = expert.imgBig;
  expertImage.alt = expert.altText;
  expertName.textContent = expert.name;
  expertBio.innerHTML = reformatbio(expert.bio);
  contactFormExpertName.textContent = "Message " + expert.name;
  contactForm.style.backgroundImage = 'url("' + expert.Label + '")';

  // Apply the background image to html. I need to do it this way to dont affect the html for the main
  document.documentElement.style.backgroundImage =
    "url(./images/MainLabel/paper05Big.png)";
  document.documentElement.style.backgroundSize = "cover";
  document.documentElement.style.backgroundRepeat = "no-repeat";
} else {
  // Handle the case where the expert with the specified 'id' is not found
  console.log("Expert not found");
}

function reformatbio(biotext) {
  // Initialize an empty string to store the reformatted bio
  let formattedBio = "<article>"; // Start with the opening <article> tag

  // Loop through each paragraph in the bio array and wrap it in <p> tags
  for (const paragraph of biotext) {
    formattedBio += `<p>${paragraph}</p>`;
  }

  formattedBio += "</article>"; // Add the closing </article> tag

  return formattedBio;
}

document.getElementById("backbutton").addEventListener("click", function () {
  window.location.href = "index.html#experts-section";
});

//Retrieves 9 items for the captcha Array
// Function to get random captcha items
function getRandomCaptchaItems() {
  // Get all captcha items with isWine = 1
  const wineCaptchaItems = captchaItems.filter((item) => item.isWine === 1);

  // Get all captcha items with isWine = 0
  const nonWineCaptchaItems = captchaItems.filter((item) => item.isWine === 0);

  // Shuffle the arrays to randomize the items
  shuffleArray(wineCaptchaItems);
  shuffleArray(nonWineCaptchaItems);

  // Select three random wine captcha items
  const randomWineItems = wineCaptchaItems.slice(0, 3);

  // Select three random non-wine captcha items
  const randomNonWineItems = nonWineCaptchaItems.slice(0, 3);

  // Combine the wine and non-wine items
  const randomCaptchaItems = [...randomWineItems, ...randomNonWineItems];

  return randomCaptchaItems;
}

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}


// Add an event listener to the form submit button
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get a reference to the modal content container
  const modalContent = document.querySelector("#captchaModal .captcha-grid");

  // Generate random captcha items
  const randomCaptchaItems = getRandomCaptchaItems();

  // Create a 3x3 grid for the modal content (grid of images)
  const modalContentHTML = randomCaptchaItems
    .map(
      (item) =>
        `<div class="captcha-cell"><img src="${item.captchaImg}" alt="Captcha Image ${item.id}" class="captchaImage" /></div>`
    )
    .join("");

  // Set the modal content HTML, without overwriting the text
  modalContent.innerHTML = modalContentHTML;

  // Display the modal
  const modal = document.getElementById("captchaModal");
  modal.style.display = "block";
});
