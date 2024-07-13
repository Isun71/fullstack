```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Enter note and submit form
    Browser->>Browser: Prevent default form submit
    Browser->>Browser: Create new note object
    Browser->>Browser: Add note to notes list
    Browser->>Browser: Redraw notes
    Browser->>Server: POST /new_note_spa (note as JSON)
    Server-->>Browser: 201 Created
    Browser-->>User: Display updated notes list
