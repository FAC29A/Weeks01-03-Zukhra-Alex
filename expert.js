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
  expertBio.innerHTML = expert.bio;
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

document.getElementById("backbutton").addEventListener("click", function () {
  console.log("pressed back");
  window.location.href = "index.html#experts-section";
});

//Retrieves 9 items for the captcha Array
function getRandomCaptchaItems() {
  const randomCaptchaItems = [];
  while (randomCaptchaItems.length < 9) {
    const randomIndex = Math.floor(Math.random() * captchaItems.length);
    const randomCaptchaItem = captchaItems[randomIndex];
    if (!randomCaptchaItems.includes(randomCaptchaItem)) {
      randomCaptchaItems.push(randomCaptchaItem);
    }
  }
  console.log(randomCaptchaItems);
  return randomCaptchaItems;
}

// Add an event listener to the form submit button
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get a reference to the modal and the modal content element
  const modal = document.getElementById("captchaModal");
  //const modalContent = modal.querySelector(".modal-content");
  const modalContent = document.querySelector("#captchaModal div");

  // Generate random captcha items
  const randomCaptchaItems = getRandomCaptchaItems();

  // Create a 3x3 grid for the modal content (grid of images)

  const modalContentHTML =
    `
  <div class="captcha-text">Select only the wine bottles</div>
  <div class="captcha-grid">` +
    randomCaptchaItems
      .map(
        (item) =>
          `<div class="captcha-cell"><img src="${item.captchaImg}" alt="Captcha Image ${item.id}" class="captchaImage" /></div>`
      )
      .join("") +
    `</div>`;

  // Set the modal content HTML
  modalContent.innerHTML = modalContentHTML;

  // Display the modal
  modal.style.display = "block";
});
