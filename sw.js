// console.log('service worker registered contact');

const cacheName = 'app-contact';
const dynamicCacheName = "dynamic-cache-v1";
const dataurl = [
     '/',
     'index.html',
     'js/app.js',
     'js/common.js',
     'js/materialize.min.js',
     'css/styles.css',
     'css/materialize.min.css',
     'img/contacts.png',
     'https://fonts.googleapis.com/icon?family=Material+Icons',
     'https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
     'pages/default.html',

];

// cache size limit function

const limitCacheSize = (name, size) => {
     caches.open(name).then((cache) => {
          cache.keys().then((keys) => {
               if (keys.length > size) {
                    cache.delete(keys[0]).then(limitCacheSize(name, size))
               }
          })
     })
}

// install ServiceWorker
self.addEventListener('install', evt => {
     // console.log('Service Worker has been Installed!');

     evt.waitUntil(
          caches.open(cacheName).then(cache => {
               cache.addAll(dataurl);
          })
     );
})

// activate server worker
self.addEventListener('activate', evt => {
     // console.log('Service Worker has been Activated!');
     evt.waitUntil(
          caches.keys().then(keyList => {
               return Promise.all(keyList
                    .filter(key => key !== cacheName)
                    .map(key => caches.delete())
               )
          }
          )
     )
})

// fetch event
self.addEventListener('fetch', evt => {
     console.log(evt);
     evt.respondWith(
          caches.match(evt.request).then(cacheRespones => {
               return cacheRespones || fetch(evt.request).then(fetchRespones => {
                    return caches.open(dynamicCacheName).then(cache => {
                         cache.put(evt.request.url, fetchRespones.clone())
                         limitCacheSize(dynamicCacheName, 5);
                         return fetchRespones;
                    })
               });
          }).catch(() =>{
               if(evt.request.url.indexOf('.html') >-1){
                    return caches.match('pages/default.html')
               }
               })
     );
})