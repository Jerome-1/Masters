//Installing the service worker
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => { //Creating new cache deposit called 'static' and passing an array of all wanted items/files into it.
            return cache.addAll(["style.css", "images/logo1.png", "./",]);
        })
    );
});
//Fetch event 
self.addEventListener("fetch", e => {
    console.log(`Intercepting fetch request for: ${e.request.url}`);
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
})