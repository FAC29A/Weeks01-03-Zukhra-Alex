/* This will be our JS file for expert*/

const teamMembers = [
    {
        name: "John Doe",
        position: "Consultant 1",
        id: 1,
        img: './images/1.jpg',
        imgBig: "./images/1Big.jpg",
        bio: "Chapman was born in Leicester and was raised in Melton Mowbray. He enjoyed science, acting and comedy and, after graduating from Emmanuel College, Cambridge and St Bartholomew's Hospital Medical College, he turned down a career as a doctor to be a comedian. Chapman eventually established a writing partnership with John Cleese, which reached its critical peak with Monty Python during the 1970s. He subsequently left Britain for Los Angeles, where he attempted to be a success on American television, speaking on the college circuit and producing the pirate film Yellowbeard (1983), before returning to Britain in the early 1980s."
    },
    {
        name: "Jane Smith",
        position: "Consultant 2",
        id: 2,
        img: './images/2.jpg',
        imgBig: "./images/2Big.jpg",
        bio: "Chapman was born in Leicester and was raised in Melton Mowbray. He enjoyed science, acting and comedy and, after graduating from Emmanuel College, Cambridge and St Bartholomew's Hospital Medical College, he turned down a career as a doctor to be a comedian. Chapman eventually established a writing partnership with John Cleese, which reached its critical peak with Monty Python during the 1970s. He subsequently left Britain for Los Angeles, where he attempted to be a success on American television, speaking on the college circuit and producing the pirate film Yellowbeard (1983), before returning to Britain in the early 1980s."
    },
    {
        name: "Mike Johnson",
        position: "Consultant 3",
        id: 3,
        img: './images/3.jpg',
        imgBig: "./images/3Big.jpg",
        bio: "Chapman was born in Leicester and was raised in Melton Mowbray. He enjoyed science, acting and comedy and, after graduating from Emmanuel College, Cambridge and St Bartholomew's Hospital Medical College, he turned down a career as a doctor to be a comedian. Chapman eventually established a writing partnership with John Cleese, which reached its critical peak with Monty Python during the 1970s. He subsequently left Britain for Los Angeles, where he attempted to be a success on American television, speaking on the college circuit and producing the pirate film Yellowbeard (1983), before returning to Britain in the early 1980s."
    },
    {
        name: "Emily Davis",
        position: "Consultant 4",
        id: 4,
        img: './images/4.jpg',
        imgBig: "./images/4Big.jpg",
        bio: "Chapman was born in Leicester and was raised in Melton Mowbray. He enjoyed science, acting and comedy and, after graduating from Emmanuel College, Cambridge and St Bartholomew's Hospital Medical College, he turned down a career as a doctor to be a comedian. Chapman eventually established a writing partnership with John Cleese, which reached its critical peak with Monty Python during the 1970s. He subsequently left Britain for Los Angeles, where he attempted to be a success on American television, speaking on the college circuit and producing the pirate film Yellowbeard (1983), before returning to Britain in the early 1980s."
    },
    {
        name: "Chris Wilson",
        position: "Consultant 5",
        id: 5,
        img: './images/5.jpg',
        imgBig: "./images/5Big.jpg",
        bio: "Chapman was born in Leicester and was raised in Melton Mowbray. He enjoyed science, acting and comedy and, after graduating from Emmanuel College, Cambridge and St Bartholomew's Hospital Medical College, he turned down a career as a doctor to be a comedian. Chapman eventually established a writing partnership with John Cleese, which reached its critical peak with Monty Python during the 1970s. He subsequently left Britain for Los Angeles, where he attempted to be a success on American television, speaking on the college circuit and producing the pirate film Yellowbeard (1983), before returning to Britain in the early 1980s."
    },
    {
        name: "Lisa Brown",
        position: "Consultant 6",
        id: 6,
        img: './images/6.jpg',
        imgBig: "./images/6Big.jpg",
        bio: "Chapman was born in Leicester and was raised in Melton Mowbray. He enjoyed science, acting and comedy and, after graduating from Emmanuel College, Cambridge and St Bartholomew's Hospital Medical College, he turned down a career as a doctor to be a comedian. Chapman eventually established a writing partnership with John Cleese, which reached its critical peak with Monty Python during the 1970s. He subsequently left Britain for Los Angeles, where he attempted to be a success on American television, speaking on the college circuit and producing the pirate film Yellowbeard (1983), before returning to Britain in the early 1980s."
    },
];

// Get the current URL
var url = new URL(window.location.href);
// Get the search parameters from the URL
var params = new URLSearchParams(url.search);
// Retrieve the 'id' parameter from the URL, defaulting to 1 if not present
var expertId = parseInt(params.get('id')) || 1;

// Find the expert in the teamMembers array based on the 'id'
var expert = teamMembers.find(function (member) {
    return member.id === expertId;
});

if (expert) {
    // Populate the Expert-section with the expert's information
    var expertImage = document.querySelector('.expert-image img');
    var expertName = document.querySelector('.expert-bio h2');
    var expertBio = document.querySelector('.expert-bio p');

    expertImage.src = expert.imgBig;
    expertName.textContent = expert.name;
    expertBio.textContent = expert.bio;
} else {
    // Handle the case where the expert with the specified 'id' is not found
    console.log('Expert not found');
}


