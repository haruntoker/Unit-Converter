// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

const CACHE = "unit-converter-offline-v1"

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log("[PWA] Cached offline page")
      return cache.addAll(["/", "/offline", "/favicon.ico"])
    }),
  )
})

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If request was successful, add result to cache
        event.waitUntil(updateCache(event.request, response.clone()))
        return response
      })
      .catch((error) => {
        // If network request failed, try to get it from cache
        return fromCache(event.request)
      }),
  )
})

function fromCache(request) {
  // Check to see if you have it in the cache
  return caches.open(CACHE).then((cache) =>
    cache.match(request).then((matching) => {
      if (!matching || matching.status === 404) {
        // If the request is for a page, show the offline page
        if (request.destination === "document") {
          return cache.match("/")
        }

        return Promise.reject("no-match")
      }

      return matching
    }),
  )
}

function updateCache(request, response) {
  if (!response.ok) return

  return caches.open(CACHE).then((cache) => cache.put(request, response))
}
