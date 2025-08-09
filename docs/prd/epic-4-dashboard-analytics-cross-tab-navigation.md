# Epic 4: Dashboard Analytics & Cross-Tab Navigation

**Epic Goal:** Create analytics overview with clickable drill-down navigation to filtered comment views, completing the dual-tab workflow architecture that enables planning officers to move seamlessly from insights to detailed investigation.

## Story 3.1: Dashboard Tab with Basic Statistics Display

As a **planning officer**,
I want **a Dashboard tab showing key neighbor response statistics**,
so that **I can quickly assess the overall situation before diving into detailed comments**.

### Acceptance Criteria
1. Dashboard tab implemented with professional layout using Shadcn UI components
2. Key statistics displayed: total comments count, sentiment breakdown (red/yellow/green counts and percentages), and geographic distribution summary
3. Statistics calculate and display in real-time based on current mock data with under 1 second load time
4. Visual indicators (charts, progress bars, or color-coded summary cards) clearly communicate sentiment proportions
5. Dashboard layout optimized for planning officer decision-making with most critical metrics prominently featured
6. Statistics update dynamically if underlying comment data changes during development/testing

## Story 3.2: Clickable Dashboard Statistics for Cross-Tab Navigation

As a **planning officer**,
I want **clickable dashboard statistics that navigate to filtered comment views**,
so that **I can drill down from overview insights directly to relevant detailed investigations**.

### Acceptance Criteria
1. Sentiment breakdown statistics (red/yellow/green) are clickable and navigate to Comments tab with appropriate sentiment filter applied
2. Geographic distribution areas clickable with navigation to Comments tab showing location-specific filtered results
3. Cross-tab navigation preserves filter state with comment list and map displaying correctly filtered content
4. Navigation transitions smooth with clear visual feedback indicating which filter has been applied
5. Dashboard statistics include visual cues (hover states, cursor changes) indicating clickable functionality
6. Filter breadcrumbs or indicators show active filter state when arriving at Comments tab from Dashboard

## Story 3.3: Dashboard Geographic Distribution Visualization

As a **planning officer**,
I want **visual representation of comment geographic distribution on the Dashboard**,
so that **I can identify hotspot areas requiring investigation before detailed map interaction**.

### Acceptance Criteria
1. Geographic distribution component displays summary of neighbor response density or clustering patterns
2. Visual representation (heat map summary, area breakdown, or cluster indicators) clearly communicates spatial patterns
3. Geographic visualization clickable with navigation to Comments tab focused on selected area with map pre-filtered
4. Distribution display updates based on current comment data with geographic coordinate analysis
5. Spatial summary provides meaningful planning officer insights without duplicating detailed Comments tab map
6. Geographic component integrates with overall Dashboard layout maintaining professional appearance

## Story 3.4: Dashboard-to-Comments Filter State Integration

As a **planning officer**,
I want **seamless filter continuity when navigating from Dashboard to Comments**,
so that **my analytical workflow maintains context without losing investigation focus**.

### Acceptance Criteria
1. Dashboard drill-down navigation correctly applies filters to both Comments tab map pins and comment list
2. Filter state integration works with existing centralized state management from Epic 2
3. Comments tab loads with appropriate visual indicators showing active filters applied from Dashboard navigation
4. Cross-tab filter state persists during session with ability to modify or clear filters within Comments tab
5. Dashboard statistics reflect any active filters if user navigates back from filtered Comments view
6. Filter integration error handling ensures graceful degradation if synchronization fails
