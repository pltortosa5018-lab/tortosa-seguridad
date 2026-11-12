self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("push", e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) {}
  e.waitUntil(self.registration.showNotification(d.title || "PolAssist", {
    body: d.body || "", icon: "icon-192.png", tag: d.tag || "polassist", renotify: true,
    requireInteraction: true, vibrate: [300, 120, 300, 120, 300] }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(l => {
    for (const c of l) if ("focus" in c) { c.postMessage({ tab: "ns" }); return c.focus(); }
    return clients.openWindow(self.registration.scope + "?tab=ns");
  }));
});
