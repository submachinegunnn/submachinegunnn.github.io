self.__uv$config = {
    prefix: '/uv/service/',
    bare: '/bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js', // Points to your folder
    bundle: '/uv/uv.bundle.js',  // Points to your folder
    config: '/uv.config.js',     // Still in root
    sw: '/uv.sw.js',             // ALWAYS keep this in root
};
