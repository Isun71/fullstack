```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Open SPA Notes Page (https://studies.cs.helsinki.fi/exampleapp/spa)
    Browser->>Server: GET /spa
    Server-->>Browser: HTML (spa page)
    Browser->>Server: GET /spa.js
    Server-->>Browser: JavaScript (spa.js)
    Browser->>Server: GET /notes
    Server-->>Browser: JSON (notes data)
    Browser->>Browser: Render notes on page
