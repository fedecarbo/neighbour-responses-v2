# API Specification

Based on the REST API style selected in the Tech Stack and the **local-only file-based prototype** approach, here's the API specification:

## REST API Specification (Local Development)

```yaml
openapi: 3.0.0
info:
  title: UK Planning Officer Neighbor Response API
  version: 1.0.0
  description: RESTful API for spatial-first planning officer workflows with local file-based storage
servers:
  - url: http://localhost:3000/api
    description: Local development server (Next.js dev server)

paths:
  /applications:
    get:
      summary: Get all planning applications from local JSON files
      tags: [Applications]
      responses:
        '200':
          description: List of planning applications from /data/applications.json
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PlanningApplicationSummary'

  /applications/{applicationId}:
    get:
      summary: Get specific planning application with comments from local files
      tags: [Applications]
      parameters:
        - name: applicationId
          in: path
          required: true
          schema:
            type: string
          example: "APP/2024/0123"
      responses:
        '200':
          description: Complete planning application data from local JSON
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PlanningApplication'

  /applications/{applicationId}/comments:
    get:
      summary: Get filtered comments from local JSON with spatial filtering
      tags: [Comments]
      parameters:
        - name: applicationId
          in: path
          required: true
          schema:
            type: string
        - name: sentiment
          in: query
          schema:
            type: array
            items:
              type: string
              enum: [positive, neutral, negative]
        - name: bounds
          in: query
          schema:
            type: string
          description: Geographic bounds (lat1,lng1,lat2,lng2)
      responses:
        '200':
          description: Comments filtered from local JSON data

  /applications/{applicationId}/comments/{commentId}:
    put:
      summary: Update comment in local JSON files
      tags: [Comments]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                content:
                  type: string
                status:
                  type: string
                  enum: [pending_review, approved_for_publication, confidential, redacted]
                officerNotes:
                  type: string

  /applications/{applicationId}/analytics:
    get:
      summary: Get dashboard analytics calculated from local JSON data
      tags: [Analytics]
      responses:
        '200':
          description: Analytics calculated from local data files

components:
  schemas:
    GeographicCoordinate:
      type: object
      required: [latitude, longitude]
      properties:
        latitude:
          type: number
          minimum: 49.8
          maximum: 60.9
        longitude:
          type: number
          minimum: -8.2
          maximum: 1.8
        precision:
          type: number
        source:
          type: string

    PlanningApplication:
      type: object
      required: [id, reference, address, description, status, coordinates]
      properties:
        id:
          type: string
        reference:
          type: string
        address:
          type: string
        description:
          type: string
        applicantName:
          type: string
        coordinates:
          $ref: '#/components/schemas/GeographicCoordinate'
        status:
          type: string
          enum: [submitted, under_review, consultation, decision_pending, approved, refused]
        comments:
          type: array
          items:
            $ref: '#/components/schemas/NeighborComment'

    NeighborComment:
      type: object
      properties:
        id:
          type: string
        applicationId:
          type: string
        neighborAddress:
          type: string
        coordinates:
          $ref: '#/components/schemas/GeographicCoordinate'
        content:
          type: string
        sentiment:
          type: string
          enum: [positive, neutral, negative]
        status:
          type: string
          enum: [pending_review, approved_for_publication, confidential, redacted]
        officerNotes:
          type: string
        isEdited:
          type: boolean
```
