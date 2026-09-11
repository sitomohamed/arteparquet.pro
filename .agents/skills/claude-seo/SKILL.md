---
name: claude-seo
description: >-
  Claude SEO (AgriciDaniel/claude-seo v2.2.5) installed locally in this repo.
  Full site audits, single-page analysis, technical SEO, schema, E-E-A-T,
  GEO/AEO, local SEO, backlinks, sitemaps, Core Web Vitals (INP), Google APIs,
  and PDF reports. Use when the user asks for Claude SEO, /seo commands, a deep
  SEO audit, schema markup, GEO, backlinks, or E-E-A-T analysis. Prefer this
  toolkit for those workflows; keep crawlie skills for crawlie MCP crawls and
  broken-link checks.
---

# Claude SEO (local install)

Installed from https://github.com/AgriciDaniel/claude-seo (v2.2.5) at:

`tools/claude-seo/`

Do not clone it again. Do not install packages globally. Do not write into
`~/.claude` or `~/.cursor` unless the user explicitly asks for a user-level
Claude Code plugin install.

## Runtime

All bundled Python tools go through the managed runtime (never a bare
`python script.py`):

```
python tools/claude-seo/scripts/runtime.py setup
python tools/claude-seo/scripts/runtime.py doctor --json
python tools/claude-seo/scripts/runtime.py run <script.py> [args]
```

On first use, if `doctor` says setup is required, run `setup` and report core
vs Chromium status separately. Suggest `/seo setup` rather than improvising
`pip install`.

## How to run a command

1. Read the orchestrator: `tools/claude-seo/skills/seo/SKILL.md`
2. For a specific `/seo <command>`, also read the matching sub-skill under
   `tools/claude-seo/skills/seo-<command>/SKILL.md` (see table below).
3. For parallel audit work, read the specialist prompt in
   `tools/claude-seo/agents/seo-*.md`.
4. Execute bundled scripts with `python tools/claude-seo/scripts/runtime.py run ...`
5. Follow the orchestrator's synthesis, quality gates, and report format.

Rewrite any `claude-seo run` / `claude-seo setup` / `claude-seo doctor`
instructions in those files to the `python tools/claude-seo/scripts/runtime.py`
commands above.

## Commands

| User ask | Skill to load | What it does |
|----------|---------------|--------------|
| `/seo audit <url>` | `skills/seo/SKILL.md` | Full site audit, parallel specialists |
| `/seo page <url>` | `skills/seo-page/SKILL.md` | Deep single-page analysis |
| `/seo technical <url>` | `skills/seo-technical/SKILL.md` | Technical SEO (9 categories) |
| `/seo content <url>` | `skills/seo-content/SKILL.md` | E-E-A-T and content quality |
| `/seo content-brief <topic>` | `skills/seo-content-brief/SKILL.md` | Content brief |
| `/seo schema <url>` | `skills/seo-schema/SKILL.md` | Detect, validate, generate Schema.org |
| `/seo geo <url>` | `skills/seo-geo/SKILL.md` | AI Overviews / GEO |
| `/seo sitemap <url\|generate>` | `skills/seo-sitemap/SKILL.md` | Analyze or generate XML sitemaps |
| `/seo images <url>` | `skills/seo-images/SKILL.md` | Image SEO |
| `/seo plan <type>` | `skills/seo-plan/SKILL.md` | Strategic plan (saas, local, ecommerce, publisher, agency) |
| `/seo programmatic` | `skills/seo-programmatic/SKILL.md` | Programmatic SEO |
| `/seo competitor-pages` | `skills/seo-competitor-pages/SKILL.md` | Competitor comparison pages |
| `/seo local <url>` | `skills/seo-local/SKILL.md` | Local SEO (GBP, citations, reviews) |
| `/seo maps` | `skills/seo-maps/SKILL.md` | Maps intelligence |
| `/seo hreflang <url>` | `skills/seo-hreflang/SKILL.md` | Hreflang / i18n |
| `/seo google` | `skills/seo-google/SKILL.md` | GSC, PageSpeed, CrUX, Indexing, GA4, PDF |
| `/seo backlinks <url>` | `skills/seo-backlinks/SKILL.md` | Backlink profile |
| `/seo cluster <keyword>` | `skills/seo-cluster/SKILL.md` | SERP semantic clustering |
| `/seo sxo <url>` | `skills/seo-sxo/SKILL.md` | Search experience optimization |
| `/seo drift` | `skills/seo-drift/SKILL.md` | Baseline / compare / history |
| `/seo ecommerce <url>` | `skills/seo-ecommerce/SKILL.md` | E-commerce SEO |
| `/seo flow` | `skills/seo-flow/SKILL.md` | FLOW framework prompts |
| `/seo setup` | runtime | Create or refresh the isolated venv + Chromium |
| `/seo doctor` | runtime | Check runtime without changing it |

Optional extensions live under `tools/claude-seo/extensions/` (DataForSEO,
Firecrawl, Ahrefs, Banana, Bing, Profound, SE Ranking, Unlighthouse). Core
audits work without them.

## Quality rules from upstream (do not skip)

- Core Web Vitals: LCP, INP, CLS. Never FID.
- Never recommend HowTo schema (deprecated).
- FAQPage: no Google rich-result benefit as of May 7, 2026; do not recommend it
  for SERP features.
- Every recommendation needs: first-principle observation, dependency, an
  explicit "how would we know this failed?" check, and a leading indicator.
