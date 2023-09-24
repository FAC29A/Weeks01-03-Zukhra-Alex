
// Function to create a card for a team member
function createTeamMemberCard(member) {
    const card = document.createElement("div");
    card.classList.add("team-member-card");

    // Create card content (img, name, position)
    card.innerHTML = `
        <img src="${member.imgBig}" alt="${member.name}" tabindex="${member.id}">
        <h3>${member.name}</h3>
        <p>${member.position}</p>
        <button> Contact me </button>
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

// Add an event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
    createTeamMembersCards();
});

// Testimonial section code (start)
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cardContainer = document.querySelector('.cards-review-container');
const cards = document.querySelectorAll('.card-review');
const cardsPerPage = 3; // Display three cards at a time
let currentIndex = 0;

function updateVisibility() {
    cards.forEach((card, index) => {
        if (index >= currentIndex && index < currentIndex + cardsPerPage) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }

        // Add the zoom class to the middle card
        if (index === currentIndex + Math.floor(cardsPerPage / 2)) {
            card.classList.add('zoom-card');
        } else {
            card.classList.remove('zoom-card');
        }
    });
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= 1;
        updateVisibility();
    } else {
        // If at the beginning, loop to the end
        currentIndex = cards.length - cardsPerPage;
        updateVisibility();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex + cardsPerPage < cards.length) {
        currentIndex += 1;
        updateVisibility();
    } else {
        // If at the end, loop to the beginning
        currentIndex = 0;
        updateVisibility();
    }
});

updateVisibility();

// Testimonial section code (start)