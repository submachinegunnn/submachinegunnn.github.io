/* Ultraviolet Configuration for Stealth OS
   This file must be in the root directory.
*/

self.__uv$config = {
    /**
     * The prefix for the proxy service. 
     * If you see "Cannot GET /uv/service/...", it means the SW 
     * is not intercepting this path.
     */
    prefix: '/uv/service/',

    /**
     * The path to the Bare server. 
     * In our index.js, we set this to '/bare/'.
     */
    bare: '/bare/',

    /**
     * The codec used for URL encoding. 
     * XOR is the standard for Ultraviolet to bypass basic URL filters.
     */
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,

    /**
     * Paths to the internal Ultraviolet scripts.
     * Since index.js serves @titaniumnetwork-dev/ultraviolet at /uv/,
     * these paths point there.
     */
    handler: '/uv/uv.handler.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv.config.js',
    sw: '/uv.sw.js',
};
