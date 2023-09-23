/* const teamMembers = [
    {
        name: "John Doe",
        position: "Consultant 1",
        id: 1,
        img: 'images/1.jpg',
        bio: "Chapman was born in Leicester and was raised in Melton Mowbray. He enjoyed science, acting and comedy and, after graduating from Emmanuel College, Cambridge and St Bartholomew's Hospital Medical College, he turned down a career as a doctor to be a comedian. Chapman eventually established a writing partnership with John Cleese, which reached its critical peak with Monty Python during the 1970s. He subsequently left Britain for Los Angeles, where he attempted to be a success on American television, speaking on the college circuit and producing the pirate film Yellowbeard (1983), before returning to Britain in the early 1980s."
    },
    {
        name: "Jane Smith",
        position: "Consultant 2",
        id: 2,
        img: 'images/2.jpg',
        bio: "Chapman was born in Leicester and was raised in Melton Mowbray. He enjoyed science, acting and comedy and, after graduating from Emmanuel College, Cambridge and St Bartholomew's Hospital Medical College, he turned down a career as a doctor to be a comedian. Chapman eventually established a writing partnership with John Cleese, which reached its critical peak with Monty Python during the 1970s. He subsequently left Britain for Los Angeles, where he attempted to be a success on American television, speaking on the college circuit and producing the pirate film Yellowbeard (1983), before returning to Britain in the early 1980s."
    },
    {
        name: "Mike Johnson",
        position: "Consultant 3",
        id: 3,
        img: 'images/3.jpg',
        bio: "Chapman was born in Leicester and was raised in Melton Mowbray. He enjoyed science, acting and comedy and, after graduating from Emmanuel College, Cambridge and St Bartholomew's Hospital Medical College, he turned down a career as a doctor to be a comedian. Chapman eventually established a writing partnership with John Cleese, which reached its critical peak with Monty Python during the 1970s. He subsequently left Britain for Los Angeles, where he attempted to be a success on American television, speaking on the college circuit and producing the pirate film Yellowbeard (1983), before returning to Britain in the early 1980s."
    },
    {
        name: "Emily Davis",
        position: "Consultant 4",
        id: 4,
        img: 'images/4.jpg',
        bio: "Chapman was born in Leicester and was raised in Melton Mowbray. He enjoyed science, acting and comedy and, after graduating from Emmanuel College, Cambridge and St Bartholomew's Hospital Medical College, he turned down a career as a doctor to be a comedian. Chapman eventually established a writing partnership with John Cleese, which reached its critical peak with Monty Python during the 1970s. He subsequently left Britain for Los Angeles, where he attempted to be a success on American television, speaking on the college circuit and producing the pirate film Yellowbeard (1983), before returning to Britain in the early 1980s."
    },
    {
        name: "Chris Wilson",
        position: "Consultant 5",
        id: 5,
        img: 'images/5.jpg',
        bio: "Chapman was born in Leicester and was raised in Melton Mowbray. He enjoyed science, acting and comedy and, after graduating from Emmanuel College, Cambridge and St Bartholomew's Hospital Medical College, he turned down a career as a doctor to be a comedian. Chapman eventually established a writing partnership with John Cleese, which reached its critical peak with Monty Python during the 1970s. He subsequently left Britain for Los Angeles, where he attempted to be a success on American television, speaking on the college circuit and producing the pirate film Yellowbeard (1983), before returning to Britain in the early 1980s."
    },
    {
        name: "Lisa Brown",
        position: "Consultant 6",
        id: 6,
        img: 'images/6.jpg',
        bio: "Chapman was born in Leicester and was raised in Melton Mowbray. He enjoyed science, acting and comedy and, after graduating from Emmanuel College, Cambridge and St Bartholomew's Hospital Medical College, he turned down a career as a doctor to be a comedian. Chapman eventually established a writing partnership with John Cleese, which reached its critical peak with Monty Python during the 1970s. He subsequently left Britain for Los Angeles, where he attempted to be a success on American television, speaking on the college circuit and producing the pirate film Yellowbeard (1983), before returning to Britain in the early 1980s."
    },
];
*/

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