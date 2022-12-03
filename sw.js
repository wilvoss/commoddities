// the cache version gets updated every time there is a new deployment
const CACHE_VERSION = 9.3;
const CURRENT_CACHE = `main-${CACHE_VERSION}`;

// these are the routes we are going to cache for offline support
const cacheFiles = [
  '/',
  '',
  'manifest.webmanifest',
  'favicon.png',
  'favicon-16x16.png',
  '/audio/CommOdditiesTheme3.aac',
  '/fonts/Dosis-Regular.ttf',
  '/fonts/Lobster-Regular.ttf',
  '/favicon.ico',
  '/images/big_tent_logo.svg',
  '/images/icon.png',
  '/images/icon120.png',
  '/images/icon180.png',
  '/images/icon192.png',
  '/images/icon512.png',
  '/images/commodities/burning-stars.svg',
  '/images/commodities/chunky-boogers.svg',
  '/images/commodities/codswallup.svg',
  '/images/commodities/creepy-smiles.svg',
  '/images/commodities/doo-dahs.svg',
  '/images/commodities/emerald-dust.svg',
  '/images/commodities/failed-popcorn.svg',
  '/images/commodities/fall-leaves.svg',
  '/images/commodities/fir-fantasies.svg',
  '/images/commodities/holy-spoons.svg',
  '/images/commodities/insect-bones.svg',
  '/images/commodities/koala-needs.svg',
  '/images/commodities/limes-of-destiny.svg',
  '/images/commodities/mysterious-mojo.svg',
  '/images/commodities/orange-tangents.svg',
  '/images/commodities/origami-folds.svg',
  '/images/commodities/oxford-commas.svg',
  '/images/commodities/potato-eyes.svg',
  '/images/commodities/soda-fizz.svg',
  '/images/commodities/striped-pins.svg',
  '/images/commodities/syrup-holes.svg',
  '/images/commodities/tps-reports.svg',
  '/images/commodities/very-loud-moos.svg',
  '/images/commodities/wicked-thoughts.svg',
  '/helpers/vue.min.js',
  '/helpers/console-enhancer.js',
  '/styles/lightness.css',
  '/styles/commodities.css',
  '/index.html',
  '/scripts/commodities.js',
  '/models/ColorObject-min.js',
  '/models/CommodityObject-min.js',
  '/models/SimpleModels-min.js',
  '/models/TipObject-min.js',
  '/models/TutorialObject-min.js',
];

// on activation we clean up the previously registered service workers
self.addEventListener('activate', (evt) =>
  evt.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CURRENT_CACHE) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  ),
);

// on install we download the routes we want to cache for offline
self.addEventListener('install', (evt) =>
  evt.waitUntil(
    caches.open(CURRENT_CACHE).then((cache) => {
      return cache.addAll(cacheFiles);
    }),
  ),
);

// fetch cache first, but use network if cache fails
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }),
  );
});
