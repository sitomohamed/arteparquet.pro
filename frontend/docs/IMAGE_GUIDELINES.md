# Image Guidelines

## Arteparquet Visual Asset Standards

### Overview

Images are critical to conveying the premium quality and craftsmanship of Arteparquet. Every image must reinforce the brand positioning and inspire trust.

---

## Image Categories

### 1. Portfolio/Project Images

**Purpose:** Showcase completed work

**Requirements:**
- High resolution (minimum 2400px on longest edge)
- Professional photography
- Natural lighting preferred
- Show the full room/space context
- Include detail shots

**Composition:**
- Wide establishing shots
- Medium room context shots
- Close-up detail shots
- Before/after pairs when applicable

### 2. Process/Craftsmanship Images

**Purpose:** Show the artisan at work

**Requirements:**
- Authentic working moments
- Focus on hands and tools
- Show attention to detail
- Warm, natural lighting

**Subjects:**
- Hands laying parquet
- Measuring and cutting
- Sanding and finishing
- Tool details

### 3. Material Close-ups

**Purpose:** Highlight wood quality

**Requirements:**
- Macro/close-up shots
- Show wood grain detail
- Natural color accuracy
- Clean, dust-free surfaces

**Subjects:**
- Wood grain patterns
- Different wood species
- Finish textures
- Edge details

### 4. Team/Portrait Images

**Purpose:** Humanize the brand

**Requirements:**
- Professional but warm
- On-site or workshop setting
- Confident, approachable expressions
- Consistent style across team

---

## Technical Specifications

### File Formats

| Use Case | Format | Notes |
|----------|--------|-------|
| Photography | JPEG | Quality 80-90% |
| Graphics/logos | SVG | For scalability |
| Transparency | PNG | When needed |
| Source files | RAW/PSD | For editing |

### Resolution Requirements

| Use | Minimum Size | Aspect Ratio |
|-----|--------------|--------------|
| Hero images | 2400x1350px | 16:9 |
| Portfolio grid | 1200x900px | 4:3 |
| Service cards | 800x600px | 4:3 |
| Thumbnails | 400x300px | 4:3 |
| Blog featured | 1600x900px | 16:9 |

### File Naming

```
[category]-[subject]-[number].[ext]

Examples:
portfolio-villa-como-01.jpg
portfolio-villa-como-02.jpg
service-restoration-hero.jpg
team-arabi-portrait.jpg
material-oak-detail.jpg
```

---

## Color Treatment

### Photography Style

**Warm natural tones:**
- Slight warm color grade
- Natural wood colors preserved
- Avoid oversaturation
- Consistent across all images

**Post-Processing Guidelines:**
- Subtle warming (+5-10 on temperature)
- Light contrast enhancement
- Natural saturation
- Clean whites, rich shadows

### Color Reference

Images should feel:
- Warm but not orange
- Rich but not heavy
- Natural but polished
- Premium but approachable

---

## Optimization for Web

### Compression

```
Original → Compressed
2400x1350 @ 2MB → 2400x1350 @ 200-400KB
```

### Next.js Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/portfolio/villa-como.jpg"
  alt="Parquet in rovere, Villa sul Lago di Como"
  width={1200}
  height={900}
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Responsive Images

```tsx
<Image
  src="/hero.jpg"
  alt="Hero image"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
  priority
/>
```

---

## Alt Text Guidelines

### Best Practices

| ❌ Bad | ✅ Good |
|--------|---------|
| "image1" | "Parquet massello in rovere, soggiorno moderno" |
| "floor" | "Prima e dopo restauro parquet, camera da letto" |
| "photo" | "Arabi Mohamed al lavoro su parquet a spina di pesce" |

### Formula

```
[Material/Type] + [Location/Context] + [Relevant detail]

Examples:
"Parquet prefinito in noce, hotel di lusso Milano"
"Dettaglio venatura legno di rovere naturale"
"Posa parquet a spina ungherese, villa sul lago"
```

---

## Image Sources

### Required Images for Launch

**Portfolio (minimum 5 projects):**
- 4-6 images per project
- Mix of categories (villa, hotel, residential)
- Before/after for restorations

**Services:**
- 1 hero image per service
- 2-3 detail/gallery images

**About:**
- 1-2 team/founder portraits
- 2-3 workshop/process images

**Homepage:**
- 1 hero image/video
- Enough for featured projects

### Photography Brief

**For hired photographer:**

1. **Style Reference**
   - Clean, editorial interior photography
   - Reference: Dezeen, Architectural Digest
   - Natural light preferred
   - Minimal staging

2. **Shot List per Project**
   - 2x wide establishing shots
   - 3x medium room views
   - 3x detail/close-up shots
   - 2x lifestyle context

3. **Technical**
   - RAW format delivery
   - Color-corrected variants
   - Horizontal orientation primary
   - Minimum 24MP

---

## Asset Organization

### Folder Structure

```
/public/images/
├── portfolio/
│   ├── villa-como/
│   │   ├── hero.jpg
│   │   ├── detail-01.jpg
│   │   └── before-after.jpg
│   └── hotel-milan/
├── services/
│   ├── installation-hero.jpg
│   └── restoration-hero.jpg
├── team/
│   └── arabi-portrait.jpg
├── brand/
│   ├── logo.svg
│   └── og-image.jpg
└── blog/
    └── [post-slug]/
```

---

## Quality Checklist

### Before Upload

- [ ] Resolution meets requirements
- [ ] Color treatment applied
- [ ] File optimized (< 500KB for web)
- [ ] Named correctly
- [ ] Alt text prepared
- [ ] Placed in correct folder

### Review Criteria

- [ ] Represents brand quality
- [ ] Technically excellent
- [ ] Emotionally engaging
- [ ] Consistent with other images
- [ ] Rights cleared for use
