// Function to create a card for a team member
function createTeamMemberCard(member) {
  const card = document.createElement("div");
  card.classList.add("team-member-card");

  // Create card content (img, name, tags)
  card.innerHTML = `
        <div class="team-img-container">
        <h3>${member.name}</h3>
        <img src="${member.imgBig}" alt="${member.name}">
        </div>  
        <p>${member.tags}</p>
        <button  tabindex="${member.id + 4}"> Contact ${
    member.name.split(" ")[0]
  } </button>
    `;

  // Add click event listener to the card
  card.addEventListener("click", () => navigateToExpertPage(member.id));

  return card;
}

// Function to create team members cards and append them to the container
function createTeamMembersCards() {
  // Get the team members container element
  const teamMembersContainer = document.getElementById("team-members");

  // Generate cards for each team member and append them to the container
  teamMembers.forEach((member) => {
    const card = createTeamMemberCard(member);
    teamMembersContainer.appendChild(card);
  });
}

// Function to navigate to the expert page
function navigateToExpertPage(memberId) {
  // Build the URL with parameters
  const url = `expert.html?id=${memberId}`;
  // Navigate to the expert.html page with parameters
  window.location.href = url;
}

// Function to open the testimonials modal
function openTestimonialModal(testimonialId) {
  // Find the testimonial object by its ID
  const testimonial = testimonials.find((item) => item.id === testimonialId);

  if (testimonial) {
    // Get the modal element
    const modal = document.getElementById("testimonialsModal");

    // Create a close button element
    const closeButton = document.createElement("span");
    closeButton.classList.add("close-modal-button");
    closeButton.innerHTML = "&times;"; // Use the "times" symbol (X) for the close button
    closeButton.tabIndex = 1; // Assign a tabindex to make it selectable with the keyboard

    // Add a click event listener to the close button to close the modal
    closeButton.addEventListener("click", closeTestimonialModal);

    // Add a keydown event listener to the close button to handle keypress events
    closeButton.addEventListener("keydown", function (event) {
      event.preventDefault(); // Prevent any default behavior
      closeTestimonialModal();
    });

    // Create a flex container for the modal content
    const flexContainer = document.createElement("div");
    flexContainer.classList.add("modal-flex-container");

    // Append the close button to the flex container
    flexContainer.appendChild(closeButton);

    // Create an element for the image
    const image = document.createElement("img");
    image.src = testimonial.bottleImg;
    image.alt = testimonial.name + " wine bottle";
    image.classList.add("modal-image");

    // Create a vertical flex container for the right side
    const rightContainer = document.createElement("div");
    rightContainer.classList.add("modal-right-container");

    // Create an element for the name
    const nameElement = document.createElement("h3");
    nameElement.textContent = testimonial.name;
    nameElement.classList.add("modal-name");

    // Create an element for the text
    const textElement = document.createElement("div");
    textElement.classList.add("modal-text");
    textElement.innerHTML = testimonial.text;

    // Append the name and text to the right container
    rightContainer.appendChild(nameElement);
    rightContainer.appendChild(textElement);

    // Append the close button, image, and right container to the flex container
    flexContainer.appendChild(closeButton);
    flexContainer.appendChild(image);
    flexContainer.appendChild(rightContainer);

    // Clear any existing content in the modal
    modal.innerHTML = "";

    // Append the flex container to the modal
    modal.appendChild(flexContainer);

    // Display the modal
    modal.style.display = "block";

    // Automatically focus on the close button when the modal opens
    closeButton.focus();
  }
}

// Function to close the testimonials modal
function closeTestimonialModal() {
  const modal = document.getElementById("testimonialsModal");
  modal.style.display = "none";
}

// Initialize scaleFactor this will resize the selecting Areas
let scaleFactor = 1;

// Original coordinates for each bottle
const originalCoordinates = [
  [245, 60, 345, 395], // Bottle 1
  [495, 60, 585, 395], // Bottle 2
  [745, 60, 840, 395], // Bottle 3
  [988, 60, 1085, 395], // Bottle 4
  [1230, 60, 1330, 395], // Bottle 5
];

// Function to scale and update the wine map
function updateWineMap() {
  // Get the current screen width
  const screenWidth = window.innerWidth;

  // Define the original image width and height
  const originalImageWidth = 1596;
  const originalImageHeight = 536;

  // Calculate the new scaleFactor based on the screen width
  scaleFactor = screenWidth / originalImageWidth;

  // Get the wineMap container
  const wineMapContainer = document.getElementById("wineMapContainer");

  // Clear the wineMapContainer
  wineMapContainer.innerHTML = "";

  // Create the wineMap element
  const wineMap = document.createElement("map");
  wineMap.name = "wineMap";

  // Create and add areas to the wineMap
  for (let i = 1; i <= originalCoordinates.length; i++) {
    // Create an area element
    const area = document.createElement("area");

    // Calculate and set the scaled coordinates
    const originalCoords = originalCoordinates[i - 1];
    const scaledCoords = originalCoords.map((coord) =>
      Math.round(coord * scaleFactor)
    );

    // Set other attributes for the area
    area.shape = "rect";
    area.coords = scaledCoords.join(",");
    area.alt = "Bottle " + i;
    area.setAttribute("data-testimonial-id", i);
    area.tabIndex = 10 + i;

    // Add the click event listener
    area.onclick = function () {
      openTestimonialModal(i);
    };

    // Add key press event listeners to the bottle areas
    area.addEventListener('keydown', (event) => handleBottleKeyPress(event, i));


    // Select the <h2> element that we will modify when hover on
    const introText = document.querySelector("#hoverMessage");

    // Add the mouseover event listener to apply the hover effect
    area.addEventListener("mouseover", function () {
      // Get the testimonial object by its ID
      const testimonial = testimonials.find((item) => item.id === i);
      // Check if the testimonial exists
      if (testimonial) {
        // Update the text with the wine name from the testimonial
        introText.textContent = `Click "${testimonial.name}" to explore its story`;
      }
      // Set focus on the area
      area.focus();
    });

    // Add the mouseout event listener to remove the hover effect
    area.addEventListener("mouseout", function () {
      // Restore the original text
      introText.textContent = "Click on a wine bottle to explore its story";
    });

    // Append the area to the wineMap
    wineMap.appendChild(area);
  }

  // Append the wineMap to the wineMapContainer
  wineMapContainer.appendChild(wineMap);
}

// Function to handle key presses for bottles
function handleBottleKeyPress(event, bottleId) {
  if (event.key === ' ' || event.key === 'Enter') {
    openTestimonialModal(bottleId);
  }
}

// Call the initial updateWineMap function and whenever the window is resized
updateWineMap();
window.addEventListener("resize", updateWineMap);

// Add an event listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  createTeamMembersCards();
});

// Function to convert vw to pixels, needed for the NavBar sticky function
function vwToPixels(vw) {
  return (vw * window.innerWidth) / 100;
}

// Function to handle key presses for navigation
function handleKeyPress(event) {
  if (event.key === " " || event.key === "Enter") {
    // Get the target section based on the href attribute of the focused link
    const targetId = event.target.getAttribute("href").slice(1); // Remove the '#' character
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Scroll to the target section
      targetSection.scrollIntoView({ behavior: "smooth" });
      event.preventDefault(); // Prevent default behavior for Space/Enter key
    }
  }
}

// Add key press event listeners to the navbar links
const navbarLinks = document.querySelectorAll(".navbar a");
navbarLinks.forEach((link) => {
  link.addEventListener("keydown", handleKeyPress);
});
