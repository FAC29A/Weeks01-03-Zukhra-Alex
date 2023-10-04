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

// Initialize a flag to track the captcha status
let captchaResolved = false;
// A flag to track if the form has been submitted
let formSubmitted = false;

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

// Retrieves 9 items for the captcha Array
function getRandomCaptchaItems() {
  // Get all captcha items
  const allCaptchaItems = [...captchaItems];

  // Shuffle all captcha items to randomize them
  shuffleArray(allCaptchaItems);

  // Initialize arrays for wine and water items
  const wineCaptchaItems = [];
  const waterCaptchaItems = [];

  // Separate wine and water items
  for (const item of allCaptchaItems) {
    if (item.isWine === 1 && wineCaptchaItems.length < 5) {
      wineCaptchaItems.push(item);
    } else if (item.isWine === 0 && waterCaptchaItems.length < 4) {
      waterCaptchaItems.push(item);
    }
  }

  // Combine the wine and water items
  const randomCaptchaItems = [...wineCaptchaItems, ...waterCaptchaItems];

  shuffleArray(randomCaptchaItems);

  return randomCaptchaItems;
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Add an event listener to the form submit button
const submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get a reference to the modal and the modal content element
  const modal = document.getElementById("captchaModal");
  const modalContent = document.querySelector("#captchaModal div");

  // Generate random captcha items
  const randomCaptchaItems = getRandomCaptchaItems();

  // Create a 3x3 grid for the modal content (grid of images)
  const modalContentHTML =
    `<div class="captcha-text">Select only the wine bottles</div>
   <div class="captcha-grid">` +
    randomCaptchaItems
      .map(
        (item) =>
          `<div class="captcha-cell">
           <img src="${item.captchaImg}" alt="Captcha Image ${item.id}" class="captchaImage" data-selected="false" data-id="${item.id}" />
         </div>`
      )
      .join("") +
    `</div>`;

  // Set the modal content HTML
  modalContent.innerHTML = modalContentHTML;

  // Close the modal when the "Esc" key is pressed
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modal.style.display = "none";
    }
  });

  // Add click event listeners to the captcha images
  const captchaImages = modalContent.querySelectorAll(".captchaImage");
  captchaImages.forEach((image) => {
    image.addEventListener("click", function () {
      // Toggle the "data-selected" attribute between "true" and "false"
      const isSelected = image.getAttribute("data-selected") === "true";
      image.setAttribute("data-selected", isSelected ? "false" : "true");

      // Toggle the "grayed-out" class
      image.classList.toggle("grayed-out");

      // Check the count of selected items
      const selectedItemsCount = countSelectedItems();

      // Update the "captcha-text" content based on the selected item count
      let captchaText = document.getElementById("submit-btn");

      if (selectedItemsCount === 5) {
        const wineBottlesSelected = countSelectedWineItems();
        if (wineBottlesSelected === 5) {
          captchaText.innerText = "Send";
          // Set the captchaResolved flag to true
          captchaResolved = true;
          modal.style.display = "none";
          // Submit the form programmatically
          submitFormAndComposeEmail();
        } else {
          captchaText.innerText = "Incorrect";
          // Set the captchaResolved flag to false
          captchaResolved = false;
          modal.style.display = "none";
          // Greyed input fields
          nameInput.classList.add("fieldGreyed");
          emailInput.classList.add("fieldGreyed");
          messageTextarea.classList.add("fieldGreyed");
          // Lock the input on the textboxes
          nameInput.disabled = true;
          emailInput.disabled = true;
          messageTextarea.disabled = true;

          //Disable button
          submitButton.disabled = true;
        }
      } else {
        // Set the captchaResolved flag to false
        captchaResolved = false;
      }
    });
  });

  // Check if the form should be submitted
  if (captchaResolved) {
    // Proceed to submit the form
    // Prevent the modal from reopening
    formSubmitted = true;
  }

  if (!formSubmitted) {
    modal.style.display = "block";
  }
});

function countSelectedItems() {
  const selectedItems = Array.from(
    document.querySelectorAll(".grayed-out[data-selected='true']")
  );
  return selectedItems.length;
}

function countSelectedWineItems() {
  const selectedWineItems = Array.from(
    document.querySelectorAll(".grayed-out[data-selected='true']")
  ).filter((image) => {
    const id = parseInt(image.getAttribute("data-id"));
    const item = captchaItems.find((item) => item.id === id);
    return item && item.isWine === 1;
  });

  return selectedWineItems.length;
}

// Add an event listener to the form for submission
contactForm.addEventListener("submit", function (event) {
  // Check if the captcha is resolved
  if (!captchaResolved) {
    event.preventDefault(); // Prevent the form submission if captcha is not resolved
    console.log("Please complete the captcha.");
    return;
  }

  submitFormAndComposeEmail();
});

// Function to handle form submission and email composition
function submitFormAndComposeEmail() {
  // Check if all three fields have text
  const nameInput = document.querySelector('input[name="name"]');
  const emailInput = document.querySelector('input[name="email"]');
  const messageTextarea = document.querySelector('textarea[name="message"]');

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageTextarea.value.trim();

  if (!nameValue || !emailValue || !messageValue) {
    // If any field is empty, show an alert
    alert("Please fill in all the required fields.");
    return;
  }

  // All fields have data, proceed to compose and send the email
  const email = `From: ${nameValue}\nEmail: ${emailValue}\n\n${messageValue}`;
  console.log(email);

  // Check if the captcha is correctly resolved
  if (!captchaResolved) {
    // If the captcha is not correctly resolved, show an alert
    alert("Please resolve the captcha correctly.");
    submitButton.innerText = "Wrong Captcha";
    return;
  }

  // Prevent the modal from reopening
  formSubmitted = true;

  // Clear the content of the fields
  nameInput.value = "";
  emailInput.value = "";
  messageTextarea.value = "";

  // Lock the input on the textboxes
  nameInput.disabled = true;
  emailInput.disabled = true;
  messageTextarea.disabled = true;

  // Add a CSS class to the input elements
  nameInput.classList.add("fieldGreyed");
  emailInput.classList.add("fieldGreyed");
  messageTextarea.classList.add("fieldGreyed");

  // Change the button text to "Email Sent and disable"
  submitButton.innerText = "Email Sent";
  submitButton.disabled = true;
}

//Added here functionality to check all the fields:
// Get the form elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageTextarea = document.getElementById("message");

// Function to check if all fields are filled and validate email format
function checkFields() {
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageTextarea.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValidEmail = emailPattern.test(emailValue);

  const isAllFieldsFilled = nameValue && emailValue && messageValue;

  submitButton.disabled = !(isValidEmail && isAllFieldsFilled);
  submitButton.innerText =
    isValidEmail && isAllFieldsFilled ? "Verify" : "Fill up all the fields";
}

// Add event listeners to the form elements
nameInput.addEventListener("input", checkFields);
emailInput.addEventListener("input", checkFields);
messageTextarea.addEventListener("input", checkFields);
