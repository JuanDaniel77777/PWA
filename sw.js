self.addEventListener('install', e=>{
    caches.open('cache-v1')
    .then(cache =>{
        cache.addAll([
            './',
            'index.html',
            'css/style.css',
            'images/facebook.png',
            'images/Imagen1.jpg',
            'images/Imagen2.jpg',
            'images/Imagen3.jpg',
            'images/instagram.png',
            'images/Logo.png',
            'images/slide.png',
            'images/twiter.png',
            'videos/GamePass.mp4',
            'videos/XboxFanFest.mp4',
            'videos/XboxSeries.mp4',
        ])
    });
    e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e =>{
    //cache with network fallback
    const respuesta = caches.match( e.request )
        .then ( res => {
            if ( res ) return res;
            //no existe el archivo
            //tengo que ir a la web
            console.log('No existe', e.request.url);
            return fetch( e.request ).then ( newResp => {
                caches.open('cache-v1')
                    .then( cache => {
                        cache.put( e.request, newResp);
                    }

                    )
                return newResp.clone;
            });
        });
        e.respondWith(respuesta);
    //only cache
    //e.respondWith( caches.match(e.request));
});