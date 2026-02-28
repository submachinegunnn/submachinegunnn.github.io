import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { createBareServer } from '@tomphttp/bare-server-node';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// 1. Pass 'app' into createServer so Express actually works!
const server = createServer(app); 
const bare = createBareServer('/bare/');

// 2. Serve internal UV scripts from node_modules
app.use('/uv/', express.static(uvPath));

// 3. Serve static files (uv.sw.js, uv.config.js, etc.) 
// We add a custom header for the Service Worker to ensure it registers correctly
app.use(express.static(__dirname, {
    setHeaders: (res, path) => {
        if (path.endsWith('uv.sw.js')) {
            res.setHeader('Service-Worker-Allowed', '/');
        }
    }
}));

// 4. Shortened Stealth Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));
app.get('/a', (req, res) => res.sendFile(path.join(__dirname, 'a.html')));
app.get('/p', (req, res) => res.sendFile(path.join(__dirname, 'p.html')));
app.get('/m', (req, res) => res.sendFile(path.join(__dirname, 'm.html')));
app.get('/s', (req, res) => res.sendFile(path.join(__dirname, 's.html')));

// 5. Handle Bare Server Traffic
server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    }
    // No 'else' needed here because 'app' is already passed to createServer
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Stealth OS Active on Port ${PORT}`);
});
