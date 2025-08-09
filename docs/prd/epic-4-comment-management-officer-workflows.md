# Epic 4: Comment Management & Officer Workflows

**Epic Goal:** Enable individual comment editing, publication decisions, and workflow completion features for planning officer task completion, delivering the final functionality needed for officers to process neighbor responses from investigation through to publication decisions.

## Story 4.1: Individual Comment Detail View

As a **planning officer**,
I want **detailed view of individual neighbor comments with full content and metadata**,
so that **I can thoroughly review neighbor responses before making publication decisions**.

### Acceptance Criteria
1. Comment detail modal or expanded view accessible from comment list items showing full comment text, neighbor address, submission date, and sentiment classification
2. Comment detail view displays any relevant metadata (application reference, neighbor contact information if available) following GDPR compliance patterns
3. Detail view maintains spatial context with corresponding map pin highlighted while viewing comment details
4. Navigation between multiple comments possible without losing current filter context or map state
5. Comment detail view responsive design suitable for planning officer desktop workflows with clear typography and adequate spacing
6. Close/exit functionality returns to comment list maintaining previous selection and filter states

## Story 4.2: Basic Comment Editing Functionality

As a **planning officer**,
I want **ability to edit comment content for redaction and publication preparation**,
so that **I can prepare neighbor responses for planning committee review while maintaining privacy compliance**.

### Acceptance Criteria
1. Comment editing interface within detail view allowing text modification with standard editing controls (cut, copy, paste, undo)
2. Edit mode clearly distinguished from view mode with appropriate save/cancel functionality
3. Comment editing preserves original content with version tracking or audit trail for planning compliance requirements
4. Text editing supports basic redaction capabilities (highlighting sensitive information for removal or replacement)
5. Edited comment state visually indicated in comment list to show which comments have been modified by officers
6. Save functionality with validation ensuring edited content maintains proper formatting and character limits

## Story 4.3: Comment Publication Status Management

As a **planning officer**,
I want **ability to mark comments for publication or confidential handling**,
so that **I can control which neighbor responses appear in public planning documents**.

### Acceptance Criteria
1. Publication status toggle (publish/confidential/pending review) accessible from comment detail view and comment list items
2. Visual indicators in comment list showing publication status with clear iconography or color coding
3. Publication decisions persist with comment data and integrate with centralized state management
4. Bulk publication status capabilities for efficient processing of multiple comments with same decision
5. Publication status filtering option added to existing filter system enabling officers to view comments by publication decision
6. Status change confirmation dialogs for important publication decisions with undo capability for recent changes

## Story 4.4: Officer Workflow Completion Features

As a **planning officer**,
I want **workflow completion indicators and session summary capabilities**,
so that **I can track my progress through neighbor response processing and maintain audit trails**.

### Acceptance Criteria
1. Progress tracking showing number of comments reviewed, edited, and assigned publication status out of total comment count
2. Session summary view displaying officer actions taken during current review session (comments edited, publication decisions made, filters applied)
3. Workflow completion checklist or progress indicator helping officers ensure thorough review of all neighbor responses
4. Export or print functionality for session summary supporting planning committee preparation and audit requirements
5. Incomplete workflow warning system alerting officers to unreviewed comments or pending publication decisions before session completion
6. Session state persistence enabling officers to resume interrupted neighbor response processing workflows
