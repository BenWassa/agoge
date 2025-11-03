# Journey System Architecture — Project Agoge

## Overview

The Journey System transforms the podcast from passive consumption into an **interactive rite of passage**. Users progress through four symbolic stages (Thresholds → Ordeal → Transformation → Return), tracking their completion and reflecting on each stage's meaning.

---

## System Components

### 1. Core Files

| File | Purpose |
|------|---------|
| `docs/journey.html` | Main journey interface with 4-stage interactive map |
| `docs/index.html` | Updated with journey link in timeline navigation |
| `docs/styles.css` | Base design system (colors, typography, animations) |

### 2. Future Expansion Files (Roadmap)

| Planned File | Purpose |
|--------------|---------|
| `docs/journey-episodes/ep1.html` | Episode 1 detail page with audio player + reflection |
| `docs/journey-episodes/ep2.html` | Episode 2 detail page |
| `docs/journey-episodes/ep3.html` | Episode 3 detail page |
| `docs/journey-episodes/ep4.html` | Episode 4 detail page |
| `docs/journey-episodes/completion.html` | Final completion certificate/summary page |

---

## Data Architecture

### localStorage Schema

The system uses two localStorage keys for client-side persistence:

#### 1. Progress Tracking (`agogeJourneyProgress`)

```json
{
  "thresholds": true,
  "ordeal": false,
  "transformation": true,
  "return": false
}
```

**Keys:**
- `thresholds` — Episode 1 (Separation & Identity)
- `ordeal` — Episode 2 (Testing & Resilience)
- `transformation` — Episode 3 (Death & Rebirth)
- `return` — Episode 4 (Integration & Duty)

**Values:** `true` (completed) or `false` (not completed)

#### 2. Reflections (`agogeReflections`)

```json
{
  "thresholds": {
    "text": "I'm leaving behind my fear of failure...",
    "timestamp": "2025-11-03T14:23:45.123Z"
  },
  "ordeal": {
    "text": "The hardest trial I faced was...",
    "timestamp": "2025-11-03T15:45:12.456Z"
  }
}
```

**Structure per stage:**
- `text` — User's reflection (string, unlimited length)
- `timestamp` — ISO 8601 datetime when saved

---

## User Flow

### Entry Point

1. User lands on `index.html`
2. Sees "Your Journey" node (⚔️) in timeline — first node, highlighted with gold glow
3. Clicks → navigates to `journey.html`

### Journey Interface

1. **Initial State:**
   - 4 circular symbol nodes displayed in 2×2 grid
   - All nodes show as incomplete (dark background, muted borders)
   - Progress bar shows "0 of 4 stages completed"
   - Central symbol (⚔️) is dimmed

2. **Interaction:**
   - User clicks a symbol node (e.g., 🚪 Thresholds)
   - Node toggles to "completed" state (gold background, glowing shadow)
   - Progress bar updates (e.g., "1 of 4 stages completed")
   - Reflection section appears/scrolls into view with stage-specific prompt

3. **Reflection:**
   - User types thoughts in textarea
   - Clicks "Save Reflection" button
   - Data persists to localStorage
   - Button shows "✓ Saved" confirmation for 2 seconds

4. **Completion:**
   - When all 4 nodes marked complete:
   - Progress bar fills to 100%
   - Central ⚔️ symbol "awakens" (glows, pulses)
   - Completion message fades in: "Journey Complete"

5. **Return:**
   - "Return to Project Agoge" link navigates back to `index.html`
   - Progress persists across visits (localStorage)

---

## Visual System Integration

### Color Palette (from `styles.css`)

```css
--gold: #c9a96e;           /* Primary accent, completed states */
--bone-white: #f7f5f3;     /* Primary text */
--deep-black: #080808;     /* Background base */
--charcoal: #1f1f1f;       /* Card backgrounds */
--dark-grey: #333333;      /* Secondary elements */
```

### Typography

- **Display:** `Playfair Display` (serif, 400/700 weights) — titles, hero text
- **Body:** `Inter` (sans-serif, 300/400/500/600 weights) — UI, paragraphs

### Animations

- **Fade-in:** All major elements use `.fade-in` class with Intersection Observer
- **Hover states:** Nodes lift 8px on hover with shadow expansion
- **Completion pulse:** Completed nodes glow subtly (2s infinite animation)
- **Progress bar:** Smooth 1s cubic-bezier fill animation

---

## Stage-Specific Content

### Episode 1 — Thresholds (🚪)
- **Theme:** Separation & Identity
- **Prompt:** "What thresholds are you facing in your own life? What identity are you leaving behind, and what are you becoming?"

### Episode 2 — Ordeal (🌀)
- **Theme:** Testing & Resilience
- **Prompt:** "What trials have tested you and made you stronger? How have you grown through adversity?"

### Episode 3 — Transformation (♻️)
- **Theme:** Death & Rebirth
- **Prompt:** "What parts of yourself have you let go of? What have you transformed into?"

### Episode 4 — Return (🛡️)
- **Theme:** Integration & Duty
- **Prompt:** "Who do you wish to become? What responsibilities are you ready to embrace?"

---

## Technical Implementation Details

### JavaScript Core Functions

```javascript
// Load progress from localStorage
function loadProgress() {
  const saved = localStorage.getItem('agogeJourneyProgress');
  return saved ? JSON.parse(saved) : {};
}

// Save progress to localStorage
function saveProgress(progress) {
  localStorage.setItem('agogeJourneyProgress', JSON.stringify(progress));
}

// Load reflections from localStorage
function loadReflections() {
  const saved = localStorage.getItem('agogeReflections');
  return saved ? JSON.parse(saved) : {};
}

// Save reflection with timestamp
function saveReflection(stage, text) {
  const reflections = loadReflections();
  reflections[stage] = {
    text: text,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('agogeReflections', JSON.stringify(reflections));
}

// Update UI based on current progress
function updateUI() {
  const progress = loadProgress();
  const completedCount = Object.values(progress).filter(v => v).length;
  
  // Update completed nodes visual state
  // Update progress bar percentage
  // Show completion message if all 4 done
}
```

### Event Handlers

- **Node click:** Toggle completion state, update localStorage, scroll to reflection
- **Save button:** Validate input, save to localStorage, show confirmation
- **Intersection Observer:** Trigger fade-in animations as elements scroll into view

---

## Responsive Design

### Desktop (> 768px)
- 2×2 grid layout for symbol nodes
- Central ⚔️ symbol visible and positioned absolutely
- Full-width reflection section (max 700px)

### Mobile (≤ 768px)
- Single column layout (1×4 grid)
- Central symbol hidden (not enough space)
- Reflection section full-width with adjusted padding
- Touch-optimized button sizes (min 44×44px)

---

## Future Expansion Roadmap

### Phase 1: Episode Detail Pages (Next)
- Create individual pages per episode with:
  - Reused audio player from `index.html`
  - Episode-specific visual/symbolic artwork
  - Stage-specific reflection prompts
  - "Mark as complete" button
  - Back link to journey map

### Phase 2: Enhanced Reflection System
- **Export functionality:** Download reflections as PDF or markdown
- **Reflection history:** View all past reflections in one place
- **Prompts library:** Additional optional reflection questions per stage

### Phase 3: Audio Integration
- **Inline audio player:** Play episode directly from journey map
- **Sync progress:** Auto-mark complete when episode finishes playing
- **Transcript integration:** Show synchronized transcript or "insight cards"

### Phase 4: AI Mentor (Optional)
- **Character:** "Elias" — wise mentor figure
- **Function:** Responds to reflections with brief, thoughtful prompts
- **Implementation:** Simple GPT API call (privacy-first, optional feature)

### Phase 5: Dynamic Theming
- **Per-stage palettes:** Subtle color shifts
  - Ep1: ochre/teal (warm dusk)
  - Ep2: deep red/blue (ordeal)
  - Ep3: black/gold (transformation)
  - Ep4: silver/white (integration)
- **Ambient soundscape:** Background audio evolves per stage

### Phase 6: Social & Sharing
- **Completion certificate:** Generate downloadable image/PDF
- **Social cards:** Shareable images for each completed stage
- **Anonymous stats:** "X people have completed the journey"

---

## Privacy & Data Policy

### Current Implementation
- **All data stored locally:** No server-side storage or transmission
- **No tracking:** No analytics, cookies, or third-party scripts
- **User control:** Clear localStorage to reset journey at any time

### Future Considerations (if account system added)
- Optional cloud sync (Firebase/Supabase) for multi-device access
- Explicit opt-in for any data collection
- Reflections remain private by default
- GDPR/CCPA compliant export and deletion features

---

## Performance Notes

### Optimization Strategies
- **Lazy loading:** Fade-in animations use Intersection Observer (no scroll listeners)
- **Minimal JavaScript:** Vanilla JS only, no framework overhead (~5KB minified)
- **CSS-first animations:** Transitions and transforms use GPU acceleration
- **localStorage limits:** Text content capped at browser limits (~5-10MB total)

### Browser Compatibility
- **Supported:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Required features:** localStorage, ES6 JavaScript, CSS Grid, Intersection Observer
- **Graceful degradation:** Falls back to static layout if JS disabled

---

## Maintenance & Updates

### Version Control
- All journey files maintained on `dev` branch
- Merge to `main` only after thorough testing
- Tag major releases (e.g., `v1.0-journey-launch`)

### Testing Checklist
- [ ] Journey map displays correctly on desktop and mobile
- [ ] All 4 nodes toggle completion state
- [ ] Progress bar updates accurately
- [ ] Reflections save and persist across page reloads
- [ ] Completion message appears when all 4 complete
- [ ] Back link returns to main site correctly
- [ ] localStorage clears properly for reset testing
- [ ] No console errors in browser DevTools
- [ ] Fade-in animations trigger smoothly
- [ ] Responsive layout tested on multiple devices

### Known Limitations
- **localStorage only:** Data lost if user clears browser data
- **Single device:** No cross-device sync (future feature)
- **No undo:** Marking complete is instant (could add confirmation modal)
- **Text-only reflections:** No rich text, images, or formatting (intentional simplicity)

---

## File Structure Summary

```
docs/
├── index.html              # Main site (updated with journey link)
├── journey.html            # Journey map interface (NEW)
├── styles.css              # Shared design system
├── script.js               # Main site interactions
├── customaudio.css         # Audio player styles
├── customaudio.js          # Audio player logic
└── journey-episodes/       # (FUTURE)
    ├── ep1.html
    ├── ep2.html
    ├── ep3.html
    ├── ep4.html
    └── completion.html
```

---

## Quick Reference: localStorage Commands

### View current progress (browser console)
```javascript
JSON.parse(localStorage.getItem('agogeJourneyProgress'))
```

### View all reflections
```javascript
JSON.parse(localStorage.getItem('agogeReflections'))
```

### Reset journey (clear all progress)
```javascript
localStorage.removeItem('agogeJourneyProgress');
localStorage.removeItem('agogeReflections');
location.reload();
```

### Manually complete all stages (testing)
```javascript
localStorage.setItem('agogeJourneyProgress', JSON.stringify({
  thresholds: true,
  ordeal: true,
  transformation: true,
  return: true
}));
location.reload();
```

---

## Contact & Questions

For technical questions or feature requests related to the journey system, document them in:
- `documentation/Journey_System.md` (this file)
- GitHub Issues (when repo is public)
- Dev branch commit messages for context

---

**Last Updated:** 2025-11-03  
**Version:** 1.0 (Initial MVP)  
**Status:** Active Development on `dev` branch
