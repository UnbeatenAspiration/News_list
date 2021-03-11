const {precacheAndRoute} = require('workbox-precaching');
precacheAndRoute(self.__WB_MANIFEST);

workbox.precaching.precacheAndRoute(self.__precacheManifest);  // To evade cache on browser