
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

// Add an event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
    createTeamMembersCards();
});

