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
    var contactForm = document.querySelector('.contact-form');

    expertImage.src = expert.imgBig;
    expertName.textContent = expert.name;
    expertBio.textContent = expert.bio;

    contactForm.style.backgroundImage = 'url("' + expert.Label + '")';
    console.log('Expert Label:', expert.Label);


} else {
    // Handle the case where the expert with the specified 'id' is not found
    console.log('Expert not found');
}