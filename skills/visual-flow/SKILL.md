---
name: visual-flow
description: Generates production-ready image-generation prompts and optional HTML/SVG visuals to illustrate project workflows, pipelines, architecture, skill relationships, and team processes as infographics. Use whenever the user wants to visualize a workflow, create an infographic, generate a diagram prompt, illustrate a pipeline, map out architecture, create a visual for a presentation, or says things like "make a visual of," "create an infographic," "diagram this flow," "visualize the pipeline," "I need a visual for," "create a poster/slide showing," or wants to turn any process into a shareable graphic. Also trigger when the user asks to "explain how these connect," "show the flow," or "map this out" in a visual context. Default style is nano banana (flat design, bold colors, dark background).
---

# Visual Flow

Generate detailed image-generation prompts — and optionally interactive HTML visuals — that turn project structure, workflows, and architecture into clear, beautiful infographics.

## Why this skill exists

Engineers and PMs frequently need visuals for presentations, documentation, onboarding, and stakeholder communication. Manually describing layout, colors, typography, and flow to an image generator produces mediocre results. This skill reads the actual project structure, understands the relationships, and generates prompts with the specificity that image generators need to produce something worth sharing.

## Step 1: Discover the project

Before asking the user anything, scan the project to understand what there is to visualize.

Read these if they exist (skip silently if missing):
- `CLAUDE.md` — project overview, architecture, key concepts
- `README.md` — public-facing description, feature lists, usage flow
- `skills/*/SKILL.md` — frontmatter only (name + description) to map available skills
- `agents/*.md` — frontmatter only to map available agents
- `references/` — note what shared knowledge exists
- `.claude-plugin/plugin.json` — plugin manifest if this is a plugin
- Directory structure (top 2 levels) — to understand the shape of the project

Build a mental model of:
- **Components** — What are the major pieces? (skills, agents, services, modules, APIs)
- **Flow** — How do they connect? What's the sequence? What triggers what?
- **Hierarchy** — What's a prerequisite vs. a main stage vs. optional?
- **Inputs/Outputs** — What does each component consume and produce?

## Step 2: Brief interview

Keep this tight — 2-3 questions max based on what you discovered. Don't ask about things you can infer from the project scan.

**What to visualize** — Offer specific options based on what you found:
- "I found 4 skills that form a pipeline, 1 agent, and a references layer. Want to visualize the full pipeline, zoom into one skill, or show the architecture?"
- If the user already said what they want (e.g., "visualize the pipeline"), skip this.

**Style** — Offer presets with a default:
- "Style? Default is **nano banana** (bold colors, dark background, flat design). Also available: minimal, corporate, playful, blueprint. Or describe your own."
- See [references/style-presets.md](references/style-presets.md) for full preset definitions. Read it when you need the color palettes and typography details.

**Aspect ratio** — Default to 16:9 unless they specify:
- 16:9 — presentations, wide infographics
- 1:1 — social media, square formats
- 9:16 — mobile, story formats, vertical posters

**Target tool** (optional) — If the user mentions a specific tool, tailor syntax:
- Midjourney: append `--ar 16:9 --v 6.1 --style raw` flags
- DALL-E: pure natural language, emphasize "digital illustration" framing
- Ideogram: lean into text rendering instructions since it handles text well
- If not specified, output a universal detailed prompt that works anywhere.

## Step 3: Generate the prompt

Build a complete, production-ready image generation prompt. Every prompt must include ALL of these elements — image generators produce dramatically better results when given this level of specificity:

### Layout structure
- Overall composition (left-to-right flow, top-down cascade, radial hub, grid)
- How many major blocks and their relative positions
- Connecting elements (arrows, lines, dotted paths) and their meaning
- Header/footer/title bar placement

### Color palette
- Background color (hex)
- 1 color per major component (hex) — chosen to create visual hierarchy and grouping
- Accent color for arrows/connections
- Text colors (primary and secondary)
- Use the style preset's palette as the base, adjusted for the number of components

### Typography
- Font family or style reference (e.g., "Inter or Poppins style sans-serif")
- Size hierarchy: title > section headers > body > captions
- Weight variations: bold for titles, medium for labels, regular for details

### Per-component specification
For each block/stage in the visual:
- Label text (exact wording)
- Icon suggestion (simple, geometric, describable)
- Subtitle or tagline
- 2-4 bullet keywords or key details
- Any badges, tags, or status indicators
- Border style (solid, dashed for optional elements)

### Flow and connections
- Arrow types: solid (required flow), dashed (optional), curved (feedback loops)
- Direction indicators
- Numbered sequence markers if relevant
- Grouping boxes for related elements

### Footer/metadata
- Summary tagline for the full visual
- Attribution or branding text if relevant

## Step 4: Present and iterate

Show the full prompt in a clean code block the user can copy directly into their image generator. After the prompt, add a brief note:

- Which tools it's optimized for (or "universal")
- Suggest Ideogram for text-heavy infographics, Midjourney for aesthetic quality
- Offer modifications: "Want to adjust colors, add/remove stages, or change the layout?"

## Step 5: Offer HTML/SVG version

After presenting the image-gen prompt, offer:

"I can also build this as an interactive HTML file you can screenshot, export to PDF, or iterate on directly. Want me to generate it?"

If the user says yes, build a self-contained HTML file:
- Inline CSS (no external dependencies except Google Fonts CDN)
- SVG elements for icons and arrows
- CSS Grid or Flexbox for layout
- Match the same style preset (colors, typography, spacing)
- Add subtle CSS transitions for polish (hover states on stages)
- Save to a descriptive filename in the project root (e.g., `visual-sdlc-pipeline.html`)
- Ensure it looks good at the target aspect ratio when the browser is sized accordingly

## Visual types this skill handles

Different project structures call for different visual approaches. Match the type to what makes sense:

| What to visualize | Layout | Best for |
|---|---|---|
| Linear pipeline | Left-to-right flow with arrows | Skills/stages that run in sequence |
| Architecture layers | Stacked horizontal bands | Showing separation of concerns |
| Hub and spoke | Central node with radiating connections | One core component with many integrations |
| Swimlanes | Horizontal lanes per role/team | Showing who does what in a workflow |
| Decision tree | Top-down branching | Workflows with conditional paths |
| Comparison grid | Side-by-side columns | Comparing features, tools, or approaches |
