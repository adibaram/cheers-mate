/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts(
<<<<<<< HEAD
  "/precache-manifest.f3ab25acb498154b888c52c1a224dec5.js"
=======
<<<<<<< HEAD
  "/precache-manifest.0934931bbb1e9e4ba1eb1e6595e48947.js"
=======
  "/precache-manifest.c75dcafbf6965245bc91e2a22a180ec6.js"
>>>>>>> 3cd20ffd4cac86a056900e72bafb71a888b74c53
>>>>>>> 17276b238209995e9dfdd30b1fd201d89c51d637
);

workbox.core.setCacheNameDetails({prefix: "cheers-mate"});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
