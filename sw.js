const CACHE_NAME = 'dorm-manager-react-v1';

// 安装时缓存核心入口和静态资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './icon-192x192.png',
        './icon-512x512.png',
        './favicon.ico',
        './apple-touch-icon.png'
      ]))
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

// 拦截请求：优先缓存，动态缓存 JS/CSS/图片资源
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 跳过非 GET 请求和 chrome-extension
  if (event.request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        // 缓存同源静态资源（JS/CSS/图片）
        if (url.origin === self.location.origin && 
            (url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || 
             url.pathname.endsWith('.png') || url.pathname.endsWith('.ico') ||
             url.pathname.endsWith('.jpg') || url.pathname.endsWith('.jpeg'))) {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      }).catch(() => {
        // 离线时返回缓存
        return cachedResponse;
      });
    })
  );
});
