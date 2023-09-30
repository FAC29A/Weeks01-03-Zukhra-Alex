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
    var expertName = document.querySelector('.grid-expert-photo h2');
    var expertImage = document.querySelector('.grid-expert-photo img');
    var expertBio = document.querySelector('.grid-expert-bio article');
    var contactForm = document.querySelector('.contact-form');
    var contactFormExpertName = document.querySelector('.contact-form h2')

    expertImage.src = expert.imgBig;
    expertImage.alt = expert.altText
    expertName.textContent = expert.name;
    expertBio.innerHTML = expert.bio;
    contactFormExpertName.textContent = "Contact " + expert.name;

    contactForm.style.backgroundImage = 'url("' + expert.Label + '")';
   

 // Apply the background image to html. I need to do it this way to dont affect the html for the main
 document.documentElement.style.backgroundImage = 'url(./images/MainLabel/labelBackground.png)';
 document.documentElement.style.backgroundSize = 'cover';
 document.documentElement.style.backgroundRepeat = 'no-repeat';
 document.documentElement.style.backgroundColor = 'black';
 

} else {
    // Handle the case where the expert with the specified 'id' is not found
    console.log('Expert not found');
}

document.getElementById("backbutton").addEventListener("click", function() {
    console.log("pressed back");
    window.location.href = "index.html";
});