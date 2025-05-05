/// <reference lib="webworker" />

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.

declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = "unit-converter-cache-v1"
const urlsToCache = ["/", "/manifest.json", "/icons/icon-192x192.png", "/icons/icon-512x512.png"]

/**
 * Handles the install event for the service worker.
 * Caches essential assets for offline use.
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }).catch(() => {
      // Optionally, send error to monitoring service
    })
  )
})

/**
 * Handles fetch events and serves cached assets when available.
 * Falls back to network and caches new requests.
 */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          }).catch(() => {
            // Optionally, send error to monitoring service
          })
          return response
        })
      })
      .catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("/")
        }
      })
  )
})

/**
 * Handles the activate event and cleans up old caches.
 */
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    }).catch(() => {
      // Optionally, send error to monitoring service
    })
  )
})

export { }

