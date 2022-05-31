// import { createEventHandler } from "@remix-run/cloudflare-workers";
// import * as build from "@remix-run/dev/server-build";

// addEventListener(
//   "fetch",
//   createEventHandler({ build, mode: process.env.NODE_ENV })
// );

import {
  createRequestHandler,
  handleAsset,
} from "@remix-run/cloudflare-workers";
import {
  getAssetFromKV,
  mapRequestToAsset
} from '@cloudflare/kv-asset-handler'

import * as build from "@remix-run/dev/server-build";

const handleRequest = createRequestHandler({
  build
});

const customKeyModifier = request => {
  let url = request.url
  //custom key mapping optional

  url = url.replace('build', 'public/build')

  return mapRequestToAsset(new Request(url, request))
}

const handleEvent = async (event) => {

  let response

  if (process.env.NODE_ENV === "production") {
    response = await handleAsset(event, build, {
      mapRequestToAsset: customKeyModifier
    })
  } else {
    response = await handleAsset(event, build);
  }

  // try {
  //   response = await getAssetFromKV(event, {
  //     mapRequestToAsset: customKeyModifier
  //   })
  // } catch (err) {
  //   response = await handleAsset(event, build);
  // }

  if (!response) {
    response = await handleRequest(event);
  }

  return response;
};

addEventListener("fetch", (event) => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        })
      );
    }

    event.respondWith(
      new Response("Internal Error", {
        status: 500
      })
    );
  }
});