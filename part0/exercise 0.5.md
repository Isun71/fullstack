```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Open Notes Page
    Browser->>Server: GET /notes
    Server-->>Browser: HTML (notes page)
    Browser->>Server: GET /notes.js
    Server-->>Browser: JavaScript (notes.js)
    Browser->>Server: GET /notes
    Server-->>Browser: JSON (notes data)

    User->>Browser: Submit new note
    Browser->>Browser: Prevent default form submit
    Browser->>Browser: Create new note object
    Browser->>Browser: Add note to notes list
    Browser->>Browser: Redraw notes
    Browser->>Server: POST /new_note_spa (note as JSON)
    Server-->>Browser: 201 Created
    Browser-->>User: Display updated notes list
