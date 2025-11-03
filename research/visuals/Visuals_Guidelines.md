# Visuals Guidelines — Project Agoge (living document)

Purpose
-------
This file captures the current thoughts, approach and practical rules for generating imagery used by the Agoge project. It is intentionally a living document: styles, palettes and techniques may change as we trial images and get feedback. Keep this file up to date on the `dev` branch and only merge to `main` once you're happy with a tested set of visuals.

High-level goals
-----------------
- Grounded realism: imagery should feel lived-in and documentary-first where possible (photorealism), while allowing a secondary polished illustration style for options and promos.
- Subtle mythic tone: lighting and composition should hint at timeless, heroic ideas without grandeur or sensationalism.
- Consistent system: fixed aspect ratio (3:2) and shared palette across episodes, with small per-episode color shifts allowed.
- Respectful, non-exploitative representation: avoid culturally-specific sacred symbols or gestures unless cleared and credited.

Usage & Formats
----------------
- Primary use: hero/hero-banner image that accompanies an episode and appears while listening.
- Aspect ratio: 3:2 (landscape) — this is the canonical master image size.
- Derived assets: create 1:1 square crops for thumbnails and smaller horizontal crops for cards as needed.
- Output master: high-res (recommended 3000 x 2000 px PNG/JPEG) to allow safe cropping and web resizing.

Core visual system
------------------
- Palette (current):
  - Ochre (warm highlight): #C19A6B
  - Deep teal (shadow/midtones): #0F4C4C
  - Warm charcoal (accents/ink): #33302E
  - Neutral desaturated background: #E9E6E2

- Tone: muted contrast, gentle film grain, naturalistic skin tones, cinematic but not theatrical.
- Lighting: practical / natural (low sun, dusk, campfire, diffused skylight). Avoid heavy backlight silhouettes that obscure human detail.

Composition guidelines
----------------------
- Readability at banner scale: keep main subject inside the central horizontal band (safe area) so the 3:2 crop reads on wide hero sections and when overlaid with UI elements.
- Focal hierarchy: primary human subject or tactile detail (hands, tools) > secondary environment cues > faint symbolic elements (if any).
- Avoid direct depiction of specific ritual acts that could be sensitive. Prefer implied practice (hands shaping, doorway, dust, tools) over graphic rites.

Concept categories
------------------
- Narrative scene (grounded): a single figure or a small group in a plausible setting (threshold, field, workshop). Best for telling a short story and anchoring the episode.
- Tactile close-up: hands, tools, firelight — intimate, good for thumbnails and social assets.
- Symbolic-hybrid: mostly realistic scene with a faint, abstracted symbol integrated subtly (e.g., labyrinthe motif in cloud texture or engraved on an object). Always subtle and tone-neutral.

Prompt templates — practical starting points
-----------------------------------------
Note: these are starting prompts you can pass to a generator (human-in-loop). Adjust camera lens, age/gender/ethnicity descriptions as needed to avoid stereotyping; prefer non-specific descriptors unless you have clearance for cultural detail.

Canon constraints
- Aspect ratio: 3:2
- Palette hint: include the palette hexes in the prompt to bias color but not to constrain photorealism too heavily.

Ep1 — Concept A (Threshold at Dusk) — Photorealistic documentary variant
"photorealistic portrait of a man in his 30s stepping through an old stone threshold into an open field at dusk, muted ochre sky (#C19A6B), cool teal shadows (#0F4C4C), textured weathered stones, subtle breath in cold air, documentary aesthetic, natural cinematic lighting, shallow depth of field, fine film grain, 3:2." 

Ep1 — Concept A — Digital illustration variant
"digital illustration, realistic painterly style, man stepping through a threshold at dusk, warm ochre highlights (#C19A6B), deep teal shadows (#0F4C4C), textured brushwork, low-key cinematic lighting, subdued realism, 3:2." 

Ep1 — Concept B (Workshop of Becoming) — Photorealistic close-up
"documentary photorealistic close-up of men's hands shaping a wooden object by firelight, warm ochre highlights (#C19A6B), deep teal ambient shadows (#0F4C4C), visible wear on hands, shallow depth of field, candid composition, 3:2." 

Guidance for hybrid / symbolic elements
- If adding symbolic texture (labyrinth, sigil), keep it <5% opacity and integrate it into sky, dust, or an object surface so it reads subliminally.
- Do not use sacred images or culturally-specific ritual marks without documented permission and source credit.

Workflow & file naming
----------------------
Suggested pipeline:
1. Generate masters at 3000 x 2000 px (3:2). Store originals in a 'masters' subfolder.
2. Produce web-optimized derivatives: 1600 x 1066 (hero), 1200 x 800 (card), 1000 x 1000 (thumbnail crop).
3. Place images under repository on `dev` as placeholders and final assets when approved:
   `research/visuals/Ep1/masters/Ep1-ThresholdA-photoreal.jpg`
   `research/visuals/Ep1/derivatives/Ep1-ThresholdA-hero.jpg`

Version control policy
---------------------
- Keep imagery and masters in `research/visuals/` on `dev` branch. Commit with clear messages: "visuals(Ep1): add thresholdA-photoreal master v1".
- Tag major iterations in git and update this file with a changelog entry.

Ethics & sourcing
------------------
- Avoid cultural appropriation: do not depict specific sacred rites or identifiable sacred iconography without informed consent and source credit.
- Consent & model releases: when using identifiable people, maintain release forms outside the repo (document the location in a metadata file).
- Use licensed or original photography/3D assets. If using commercial image generation tools, record the engine, seed (if available), and a short note about source license.

Review & acceptance
-------------------
- Initial trial: for each episode, generate 4–6 candidate images (as you requested: 2 concepts × 2–3 styles). Place them in `research/visuals/EpX/candidates/` and add a short review note with pros/cons.
- Acceptance criteria: reads clearly at banner size, no problematic cultural content, palette consistent, and the subject is legible when composited with UI overlays.

Future changes & notes
----------------------
- This document is intentionally permissive early on. After 1–2 trial cycles we'll lock down a 'visual system' with final palette, typographic overlay rules, and a small icon/sigil set derived from approved masters.
- Changelog (add entries here each time you update policy or palette):

- 2025-11-03 — Initial draft created. Captures Ep1 trial plan (threshold/workshop), 3:2 canonical ratio, three-color muted palette, ethics rules, file naming and workflow.

Contacts / maintenance
----------------------
- Owner: update this when the project assigns a visual lead. For now: repository maintainer.

Appendix — quick checklist for a generated image
------------------------------------------------
- [ ] Master 3:2 high-res saved in `masters/`
- [ ] Thumbnail 1:1 crop created and readable
- [ ] Palette balanced to main project colors (subtle shift ok)
- [ ] No identifiable sacred ritual gestures present
- [ ] Model release or license recorded (if applicable)
- [ ] Short review note added (pros/cons, next steps)
