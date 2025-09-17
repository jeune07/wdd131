
let hamburgerMenu = document.querySelector(".ham-menu")
let offScreenMenu = document.querySelector(".off-screen-menu")

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');

})



const templejson = [
    {
        name: "Mtchoirandorchestra Conference Center",
        url: "images/Mtchoirandorchestra_ConferenceCenter.jpg"
    },
    {
        name: "Mtchoirandorchestra Conference Center",
        url: "images/Mtchoirandorchestra_ConferenceCenter.jpg"
    },
    {
        name: "Mtchoirandorchestra Conference Center",
        url: "images/Mtchoirandorchestra_ConferenceCenter.jpg"
    },
    {
        name: "Mtchoirandorchestra Conference Center",
        url: "images/Mtchoirandorchestra_ConferenceCenter.jpg"
    },
    {
        name: "Mtchoirandorchestra Conference Center",
        url: "images/Mtchoirandorchestra_ConferenceCenter.jpg"
    },
    {
        name: "Mtchoirandorchestra Conference Center",
        url: "images/Mtchoirandorchestra_ConferenceCenter.jpg"
    },
    {
        name: "Mtchoirandorchestra Conference Center",
        url: "images/Mtchoirandorchestra_ConferenceCenter.jpg"
    },
    {
        name: "Mtchoirandorchestra Conference Center",
        url: "images/Mtchoirandorchestra_ConferenceCenter.jpg"
    }
];

const tentplesDisplay = document.querySelector(".tentples-display");

templejson.forEach((tem) => {
    // Create elements
    const h1 = document.createElement("h4");
    const div = document.createElement('div')
    h1.innerText = tem.name;

    const img = document.createElement("img");
    img.setAttribute("src", tem.url);
    img.setAttribute("alt", tem.name);

    // Append to the container

    div.appendChild(img);
    div.appendChild(h1);
    tentplesDisplay.appendChild(div)
});




(function () {
    const fullYearEl = document.querySelector('.fullYear');
    const lastModEl = document.querySelector('.lastModified');

    const now = new Date();
    const last = new Date(document.lastModified);

    if (fullYearEl) {
        const year = String(now.getFullYear());
        fullYearEl.textContent = year;          // human-readable
        fullYearEl.setAttribute('datetime', `${year}-01-01`); // always valid
    }

    if (lastModEl) {
        lastModEl.textContent = last.toLocaleString(undefined, {
            year: 'numeric', month: 'long', day: '2-digit',
            hour: '2-digit', minute: '2-digit'
        });                                     // human-readable
        lastModEl.setAttribute('datetime', last.toISOString()); // machine-readable
    }
})();