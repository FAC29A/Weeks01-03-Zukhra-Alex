const teamMembers = [
    {
        name: "John Doe",
        position: "Consultant 1",
        id: 1,
        img: 'images/1.jpg',
    },
    {
        name: "Jane Smith",
        position: "Consultant 2",
        id: 2,
        img: 'images/2.jpg',
    },
    {
        name: "Mike Johnson",
        position: "Consultant 3",
        id: 3,
        img: 'images/3.jpg',
    },
    {
        name: "Emily Davis",
        position: "Consultant 4",
        id: 4,
        img: 'images/4.jpg',
    },
    {
        name: "Chris Wilson",
        position: "Consultant 5",
        id: 5,
        img: 'images/5.jpg',
    },
    {
        name: "Lisa Brown",
        position: "Consultant 6",
        id: 6,
        img: 'images/6.jpg',
    },
];

// Function to create a card for a team member
function createTeamMemberCard(member) {
    const card = document.createElement("div");
    card.classList.add("team-member-card");

    // Create card content (img, name, position)
    card.innerHTML = `
        <img src="${member.img}" alt="${member.name}" tabindex="${member.id}">
        <h3>${member.name}</h3>
        <p>${member.position}</p>
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