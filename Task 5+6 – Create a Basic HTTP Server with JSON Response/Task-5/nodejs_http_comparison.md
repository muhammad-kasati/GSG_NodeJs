# Node.js Core Modules: http, http2, and https

## 1. Purpose of Each Module

| Module | Purpose |
|--------|---------|
| **`http`** | Implements the **HTTP/1.1** protocol for creating web servers and making HTTP requests. It’s the most widely used for traditional web apps and APIs. |
| **`http2`** | Implements the **HTTP/2** protocol, offering multiplexing, header compression, and server push for improved performance. Supports secure (HTTPS) and insecure (HTTP) connections. |
| **`https`** | Same as `http` but runs over **TLS/SSL** for encrypted communication (HTTP/1.1 over TLS). Used for secure data transfer. |

---

## 2. Key Technical Differences: HTTP/1.1 vs HTTP/2

| Feature | HTTP/1.1 (`http` / `https`) | HTTP/2 (`http2`) |
|---------|----------------|-------------|
| **Connections** | One request per TCP connection (pipelining has limitations). | Multiplexes multiple requests/responses over a single TCP connection. |
| **Header Compression** | No built-in compression, headers sent as plain text. | Uses **HPACK** to compress headers, reducing overhead. |
| **Server Push** | Not supported. | Supports **server push** to proactively send resources to clients. |
| **Latency** | Higher latency due to connection overhead and blocking. | Lower latency thanks to multiplexing and fewer round trips. |
| **Adoption** | Universally supported, simpler for backward compatibility. | Supported in modern browsers and HTTP/2-capable clients. |

---

## 3. When to Use Each Module

| Module | Use Case |
|--------|----------|
| **`http`** | - Building basic APIs or web servers without encryption.<br>- Internal services in a trusted network where HTTPS is not required.<br>- When HTTP/2’s advanced features are unnecessary. |
| **`http2`** | - High-performance APIs or sites needing lower latency.<br>- Applications delivering many assets (JS, CSS, images) where multiplexing reduces load times.<br>- Real-time streaming or scenarios benefiting from **server push**. |
| **`https`** | - Public-facing APIs/websites requiring secure communication.<br>- Any data transfer over the public internet.<br>- When compliance or security policies require encryption. |

---

💡 **Quick Takeaway:**  
- Use **`http`** for basic, unencrypted internal services.  
- Use **`https`** for secure, public communication (HTTP/1.1 over TLS).  
- Use **`http2`** for modern, performance-focused applications where multiplexing and header compression bring real gains.
