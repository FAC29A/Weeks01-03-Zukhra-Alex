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

const teamMembersContainer = document.getElementById("team-members");

teamMembers.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("team-member-card");

    // Create card content (img, name, position)
    card.innerHTML = `
        <img src=${member.img} alt="${member.name}" tabindex="${member.id}">
        <h3>${member.name}</h3>
        <p>${member.position}</p>  
    `;

    // Add click event listener to the card
    card.addEventListener("click", navigateToExpertPage);
    card.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            navigateToExpertPage();
        }
    });
    
    function navigateToExpertPage() {
        // Build the URL with parameters
        const url = `expert.html?id=${member.id}`;
        // Navigate to the experts.html page with parameters
        window.location.href = url;
    }
    teamMembersContainer.appendChild(card);
});
