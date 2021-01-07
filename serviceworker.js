var url = "https://" + location.host.split(":")[0];
var CACHE_VERSION = 1;
var CACHE_NAME = 'TREASUREHUNT-DEV-' + CACHE_VERSION;
var urlsToCache = [
    url + '/index.html',
    url + '/hunt.js',
    url + '/style.css',
    url + '/confetti.js',
    url + '/icon-192.png',
    url + '/icon-512.png',
    url + '/icon.png',
    url + '/refresh.png',
    url + '/manifest.json',
];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});
self.addEventListener('activate', function(event) {
  // list of caches to keep
  var cacheWhitelist = CACHE_NAME;

  // cycling trough all caches and deleting every cache not on the whitelist
  event.waitUntil(
    caches.keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
          }
        })
      );
    })
  );
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
      
      caches.open(CACHE_NAME).then(function(cache) {
        // Try the cache
        return cache.match(event.request).then(function(response) {
          // Fall back to network
          var fetchPromise = fetch(event.request).then(function(networkResponse) {
            
            // Caching is disabled for now 
            // TODO enable caching
            /*if (event.request.method === 'GET'){
              // Clone response and put in cache
              cache.put(event.request, networkResponse.clone());
            }*/
            return networkResponse;
          })
          return response || fetchPromise;
        }).catch(function() {
          // If both fail, show a generic fallback:
          return null;
          // However, in reality you'd have many different
          // fallbacks, depending on URL & headers.
          // Eg, a fallback silhouette image for avatars.
        })
      })
    );
  
});
