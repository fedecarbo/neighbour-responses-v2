# Database Schema

Since we're using local JSON files, here's the file-based data structure:

## File Organization Structure

```json
/data/
├── applications.json          // Main planning applications data
└── sample-scenarios/          // Alternative test scenarios
```

## Primary Schema: applications.json

```json
{
  "applications": [
    {
      "id": "APP/2024/0123",
      "reference": "APP/2024/0123", 
      "address": "45 Victoria Street, Manchester M1 2EQ",
      "description": "Two-storey rear extension",
      "applicantName": "John Smith",
      "submissionDate": "2024-07-15T09:00:00Z",
      "coordinates": {
        "latitude": 53.4808,
        "longitude": -2.2426,
        "precision": 10,
        "source": "postcode_lookup"
      },
      "status": "consultation",
      "createdAt": "2024-07-15T09:00:00Z",
      "updatedAt": "2024-07-20T14:30:00Z",
      "comments": [
        {
          "id": "comment_001",
          "applicationId": "APP/2024/0123",
          "neighborAddress": "47 Victoria Street, Manchester M1 2EQ",
          "coordinates": {
            "latitude": 53.4810,
            "longitude": -2.2428,
            "precision": 5,
            "source": "postcode_lookup"
          },
          "content": "I strongly object to this development as it will significantly reduce natural light to our property.",
          "sentiment": "negative",
          "submissionDate": "2024-07-18T16:45:00Z",
          "status": "pending_review",
          "officerNotes": "",
          "isEdited": false,
          "originalContent": null,
          "createdAt": "2024-07-18T16:45:00Z",
          "updatedAt": "2024-07-18T16:45:00Z"
        }
      ]
    }
  ]
}
```
