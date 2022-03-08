//Creating a function to report if my page is offline or online. Checks if the serviceworker is operating.
document.addEventListener('DOMContentLoaded', init, false);

function init() {
    if (!navigator.onLine) { //if navigator is not offline change `page-status` to offline instead of online.
        const statusElem = document.querySelector('.page-status')
        statusElem.innerHTML = 'offline'
    };
};