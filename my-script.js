// Function to create a card for a team member
function createTeamMemberCard(member) {
    const card = document.createElement("div");
    card.classList.add("team-member-card");

    // Create card content (img, name, position)
    card.innerHTML = `
        <div class="team-img-container">
        <h3>${member.name}</h3>
        <img src="${member.imgBig}" alt="${member.name}" tabindex="${member.id}">
        </div>  
        <p>${member.position}</p>
        <button> Contact ${member.name.split(' ')[0]} </button>
    `;

    // Add click event listener to the card
    card.addEventListener("click", () => navigateToExpertPage(member.id));
    card.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            navigateToExpertPage(member.id);
        }
    });

    return card;
}

// Function to navigate to the expert page
function navigateToExpertPage(memberId) {
    // Build the URL with parameters
    const url = `expert.html?id=${memberId}`;
    // Navigate to the expert.html page with parameters
    window.location.href = url;
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

// Function to open the testimonials modal
function openTestimonialModal(testimonialId) {
    // Find the testimonial object by its ID
    const testimonial = testimonials.find(item => item.id === testimonialId);

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
         closeButton.addEventListener("keydown", function(event) {
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
        image.alt = "Bottle Image";
        image.classList.add("modal-image");
        
        // Create an element for the text
        const textElement = document.createElement("div");
        textElement.classList.add("modal-text");
        textElement.innerHTML = testimonial.text;

        // Append the image and text to the flex container
        flexContainer.appendChild(image);
        flexContainer.appendChild(textElement);

        // Clear any existing content in the modal
        modal.innerHTML = "";

        // Append the flex container to the modal
        modal.appendChild(flexContainer);

        // Calculate the left position based on the testimonial's position property
        const leftPosition = testimonial.position + "%";

        // Set the left property of the modal
        modal.style.left = leftPosition;

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
    [240, 57, 340, 400], // Bottle 1
    [480, 57, 580, 400], // Bottle 2
    [750, 57, 840, 400], // Bottle 3
    [990, 57, 1080, 400], // Bottle 4
    [1230, 57, 1320, 400] // Bottle 5
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
        const scaledCoords = originalCoords.map(coord => Math.round(coord * scaleFactor));

        // Set other attributes for the area
        area.shape = "rect";
        area.coords = scaledCoords.join(",");
        area.alt = "Bottle " + i;
        area.setAttribute("data-testimonial-id", i);

        // Add the click event listener
        area.onclick = function() {
            openTestimonialModal(i);
        };

        // Append the area to the wineMap
        wineMap.appendChild(area);
    }

    // Append the wineMap to the wineMapContainer
    wineMapContainer.appendChild(wineMap);
}

// Call the initial updateWineMap function and whenever the window is resized
updateWineMap();
window.addEventListener("resize", updateWineMap);

// Add an event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
    createTeamMembersCards();
});

// Function to convert vw to pixels, needed for the NavBar sticky function
function vwToPixels(vw) {
    return (vw * window.innerWidth) / 100;
}

// Make Navbar sticky
window.addEventListener("scroll", function() {
    var navbarContainer = document.getElementById("navbar-container");
    var headerHeight = document.querySelector("header").offsetHeight;
    
    if (window.scrollY >= headerHeight - vwToPixels(5)) {
      // When the user scrolls down past the header, add the "sticky" class to the navbar
      navbarContainer.classList.add("sticky");
    } else {
      // Remove the "sticky" class when the user scrolls back up
      navbarContainer.classList.remove("sticky");
    }
});
