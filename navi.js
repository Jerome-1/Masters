if ('serviceWorker' in navigator) { //Navigator contains information about the web browser.
    window.addEventListener("load", () => {
        navigator.serviceWorker.register('sw.js').then(reg => console.log("service Worker Registered"))
        .catch(err => console.log(`Service Worker Error: ${err}`));
    });
} else {
    console.log("service worker is not supported by browser.");
} 