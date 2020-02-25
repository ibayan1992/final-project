const cName = 'rest-v1';
const cAssests =
[
'./',
'./index.html','./restaurant.html',
'./css/styles.css',
'./data/restaurants.json',
'./js/main.js','./js/restaurant_info.js','./js/dbhelper.js',
'./img/1.jpg','./img/2.jpg','./img/3.jpg','./img/4.jpg','./img/5.jpg',
'./img/6.jpg','./img/7.jpg','./img/8.jpg','./img/9.jpg','./img/10.jpg'
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(cName).then(function(cache){
      console.log('catching page assests');
    return cache.addAll(cAssests);
  })
);
});

self.addEventListener('activate', function(e) {
    e.waitUntil(caches.keys().then(cNames => {
            return Promise.all(
                cNames.map(cache => {
                    if (cache != cName){
                        console.log('Service Worker, removing old caches');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});
