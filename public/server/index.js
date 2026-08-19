/** Cloudflare Worker entry point for the static portfolio build. */
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
