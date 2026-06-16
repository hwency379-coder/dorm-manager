const CACHE_NAME = 'dorm-manager-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png',
  './favicon.ico',
  'https://cdn.tailwindcss.com'
];

// 安装时缓存所有静态资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// 激活时清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 拦截请求，优先从缓存读取，缓存没有则网络请求并缓存
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        // 不缓存非 GET 请求、chrome-extension 请求和第三方 API
        if (event.request.method !== 'GET' ||
            event.request.url.startsWith('chrome-extension://')) {
          return networkResponse;
        }
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // 离线时返回缓存（如果存在）
        return cachedResponse;
      });
    })
  );
});
