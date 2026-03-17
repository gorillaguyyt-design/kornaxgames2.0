import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Curl, CurlFeature } from "node-libcurl";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Proxy Endpoint
  app.get("/api/proxy", async (req, res) => {
    const targetUrl = req.query.url as string;
    const mode = req.query.mode as string; // 'libcurl' or 'epoxy'

    if (!targetUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    if (mode === 'libcurl' || !mode) {
      const curl = new Curl();
      curl.setOpt('URL', targetUrl);
      curl.setOpt('FOLLOWLOCATION', true);
      curl.setOpt('USERAGENT', "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
      curl.setOpt('REFERER', new URL(targetUrl).origin);
      curl.setOpt('SSL_VERIFYPEER', false);
      
      // SESSION ISOLATION: Do not use any cookies from the system or previous requests
      curl.setOpt('COOKIEFILE', ''); // Enable cookie engine but keep it in-memory and empty
      curl.setOpt('COOKIESESSION', true); // Start a new cookie session
      
      // Enable all features for maximum compatibility
      curl.enable(CurlFeature.NoDataParsing);

      curl.on('end', function (statusCode, data, headers) {
        // headers is an array of objects in node-libcurl
        // We need to process them
        const headerObj = headers[0] as Record<string, string>;
        
        // Strip security and privacy-leaking headers
        Object.keys(headerObj).forEach(key => {
          const lowerKey = key.toLowerCase();
          if (
            lowerKey !== 'content-security-policy' &&
            lowerKey !== 'content-security-policy-report-only' &&
            lowerKey !== 'x-frame-options' &&
            lowerKey !== 'content-encoding' &&
            lowerKey !== 'content-length' &&
            lowerKey !== 'transfer-encoding' &&
            lowerKey !== 'cross-origin-resource-policy' &&
            lowerKey !== 'cross-origin-opener-policy' &&
            lowerKey !== 'cross-origin-embedder-policy' &&
            lowerKey !== 'strict-transport-security' &&
            lowerKey !== 'set-cookie' // Prevent target from setting cookies on our domain
          ) {
            if (lowerKey === 'location') {
              try {
                const redirectUrl = new URL(headerObj[key], targetUrl).href;
                res.setHeader(key, `/api/proxy?mode=libcurl&url=${encodeURIComponent(redirectUrl)}`);
              } catch (e) {
                res.setHeader(key, headerObj[key]);
              }
            } else {
              res.setHeader(key, headerObj[key]);
            }
          }
        });

        const contentType = headerObj['content-type'] || headerObj['Content-Type'];
        
        if (contentType && (
          contentType.includes("image/") || 
          contentType.includes("video/") || 
          contentType.includes("audio/") || 
          contentType.includes("font/") ||
          contentType.includes("application/octet-stream")
        )) {
          res.send(data);
          this.close();
          return;
        }

        let body = data.toString();
        const urlObj = new URL(targetUrl);
        const baseUrl = urlObj.origin;
        const proxyPrefix = `/api/proxy?mode=libcurl&url=`;

        if (contentType && contentType.includes("text/html")) {
          const interceptScript = `
            <script>
              (function() {
                const proxyPrefix = "${proxyPrefix}";
                const baseUrl = "${baseUrl}";
                
                document.addEventListener('click', e => {
                  const link = e.target.closest('a');
                  if (link && link.href && !link.href.startsWith('javascript:')) {
                    e.preventDefault();
                    let target = link.href;
                    if (!target.startsWith('http')) {
                      target = new URL(target, baseUrl).href;
                    }
                    window.location.href = proxyPrefix + encodeURIComponent(target);
                  }
                }, true);

                document.addEventListener('submit', e => {
                  const form = e.target;
                  if (form.action) {
                    e.preventDefault();
                    let target = form.action;
                    if (!target.startsWith('http')) {
                      target = new URL(target, baseUrl).href;
                    }
                    const method = form.method.toUpperCase();
                    if (method === 'GET') {
                      const formData = new FormData(form);
                      const params = new URLSearchParams();
                      for (const [key, value] of formData.entries()) {
                        params.append(key, value.toString());
                      }
                      window.location.href = proxyPrefix + encodeURIComponent(target + '?' + params.toString());
                    }
                  }
                }, true);

                const params = new URLSearchParams(window.location.search);
                const actualUrl = params.get('url');
                if (actualUrl) {
                  window.parent.postMessage({ type: 'NEBULA_NAVIGATE', url: actualUrl }, '*');
                }

                window.addEventListener('message', e => {
                  if (e.data.type === 'NEBULA_BACK') window.history.back();
                  if (e.data.type === 'NEBULA_FORWARD') window.history.forward();
                  if (e.data.type === 'NEBULA_RELOAD') window.location.reload();
                });
              })();
            </script>
          `;
          
          body = body.replace(/(src|href)="\/([^\/])/g, `$1="${baseUrl}/$2`);
          body = body.replace(/(src|href)='\/([^\/])/g, `$1='${baseUrl}/$2`);
          body = body.replace("</head>", `${interceptScript}</head>`);
        }

        res.send(body);
        this.close();
      });

      curl.on('error', (err) => {
        console.error("Libcurl error:", err);
        res.status(500).send(`Libcurl Error: ${err.message}`);
        curl.close();
      });

      curl.perform();
      return;
    }

    try {
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "*/*",
          "Accept-Language": "en-US,en;q=0.9",
          "Referer": new URL(targetUrl).origin,
        }
      });
      
      const contentType = response.headers.get("content-type");
      
      // Copy headers from target to response, but strip security ones
      response.headers.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        if (
          lowerKey !== 'content-security-policy' &&
          lowerKey !== 'content-security-policy-report-only' &&
          lowerKey !== 'x-frame-options' &&
          lowerKey !== 'content-encoding' && // Let express handle encoding
          lowerKey !== 'content-length' &&
          lowerKey !== 'transfer-encoding' &&
          lowerKey !== 'cross-origin-resource-policy' &&
          lowerKey !== 'cross-origin-opener-policy' &&
          lowerKey !== 'cross-origin-embedder-policy' &&
          lowerKey !== 'strict-transport-security'
        ) {
          // Handle redirects
          if (lowerKey === 'location') {
            try {
              const redirectUrl = new URL(value, targetUrl).href;
              res.setHeader(key, `/api/proxy?mode=${mode || 'libcurl'}&url=${encodeURIComponent(redirectUrl)}`);
            } catch (e) {
              res.setHeader(key, value);
            }
          } else {
            res.setHeader(key, value);
          }
        }
      });

      // Ensure Content-Type is set correctly if it was stripped or missing
      if (contentType) {
        res.setHeader("Content-Type", contentType);
      }

      // Handle binary data (images, fonts, etc.)
      if (contentType && (
        contentType.includes("image/") || 
        contentType.includes("video/") || 
        contentType.includes("audio/") || 
        contentType.includes("font/") ||
        contentType.includes("application/octet-stream")
      )) {
        const buffer = await response.arrayBuffer();
        return res.send(Buffer.from(buffer));
      }

      // Handle text data (HTML, CSS, JS)
      let body = await response.text();
      
      const urlObj = new URL(targetUrl);
      const baseUrl = urlObj.origin;
      
      // 1. Rewrite absolute paths (/style.css -> https://site.com/style.css)
      // But we want them to go through the proxy too!
      const proxyPrefix = `/api/proxy?mode=${mode || 'libcurl'}&url=`;
      
      // Inject a script to intercept clicks and form submissions
      if (contentType && contentType.includes("text/html")) {
        const interceptScript = `
          <script>
            (function() {
              const proxyPrefix = "${proxyPrefix}";
              const baseUrl = "${baseUrl}";
              
              // Intercept clicks
              document.addEventListener('click', e => {
                const link = e.target.closest('a');
                if (link && link.href && !link.href.startsWith('javascript:')) {
                  e.preventDefault();
                  let target = link.href;
                  // If it's already a full URL, use it, otherwise resolve against baseUrl
                  try {
                    const fullUrl = new URL(target, baseUrl).href;
                    window.location.href = proxyPrefix + encodeURIComponent(fullUrl);
                  } catch(err) {
                    window.location.href = proxyPrefix + encodeURIComponent(target);
                  }
                }
              }, true);

              // Intercept form submissions
              document.addEventListener('submit', e => {
                const form = e.target;
                if (form.action) {
                  e.preventDefault();
                  const target = new URL(form.action, baseUrl).href;
                  const method = form.method.toUpperCase();
                  if (method === 'GET') {
                    const formData = new FormData(form);
                    const params = new URLSearchParams();
                    for (const [key, value] of formData.entries()) {
                      params.append(key, value);
                    }
                    window.location.href = proxyPrefix + encodeURIComponent(target + '?' + params.toString());
                  }
                }
              }, true);

              // Notify parent of current URL for address bar sync
              const params = new URLSearchParams(window.location.search);
              const actualUrl = params.get('url');
              if (actualUrl) {
                window.parent.postMessage({ 
                  type: 'NEBULA_NAVIGATE', 
                  url: actualUrl 
                }, '*');
              }

              // Listen for commands from parent
              window.addEventListener('message', e => {
                if (e.data.type === 'NEBULA_BACK') window.history.back();
                if (e.data.type === 'NEBULA_FORWARD') window.history.forward();
                if (e.data.type === 'NEBULA_RELOAD') window.location.reload();
              });
            })();
          </script>
        `;
        
        // Basic rewriting for assets (images, styles) - these don't need the proxy prefix usually if we just want them to load
        // but for full unblocking they should. For now let's just make them absolute.
        body = body.replace(/(src|href)="\/([^/])/g, `$1="${baseUrl}/$2`);
        body = body.replace(/(src|href)='\/([^/])/g, `$1='${baseUrl}/$2`);

        // Inject our interceptor and badge
        const injection = `
          ${interceptScript}
          <div style="position:fixed;top:0;right:0;background:rgba(0,0,0,0.8);color:#f97316;padding:4px 8px;font-size:10px;z-index:999999;font-family:sans-serif;pointer-events:none;border-bottom-left-radius:8px;border-left:1px solid #f97316;border-bottom:1px solid #f97316;">
            Kornax badge: ${mode || 'libcurl'}
          </div>
        `;
        body = body.replace("</body>", `${injection}</body>`);
      }

      res.send(body);
    } catch (error: any) {
      console.error("Proxy error:", error);
      res.status(500).send(`
        <html>
          <head>
            <style>
              body { font-family: sans-serif; background: #0a0a0a; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              .error-card { background: #1a1a1a; padding: 2rem; border-radius: 1rem; border: 1px solid #333; max-width: 400px; text-align: center; }
              h1 { color: #f97316; margin-top: 0; }
              p { color: #888; line-height: 1.5; }
              .url { color: #555; font-size: 12px; word-break: break-all; margin-top: 1rem; }
            </style>
          </head>
          <body>
            <div class="error-card">
              <h1>Proxy Error</h1>
              <p>Could not reach the requested website. This usually happens if the URL is incorrect or the site is blocking proxy connections.</p>
              <div class="url">${targetUrl}</div>
              <p style="font-size: 10px; margin-top: 20px;">Error: ${error.message}</p>
            </div>
          </body>
        </html>
      `);
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
