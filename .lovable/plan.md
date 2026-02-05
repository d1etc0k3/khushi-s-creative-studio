

# Khushi Gupta's Animation & Game Design Portfolio

A stunning, interactive portfolio website showcasing Khushi's 3D art and game design work with a creative floating view experience.

---

## 🎨 Visual Theme

**Color Palette:**
- Dark neutral background (#0D0D0F)
- Purple/violet accent lighting (#8B5CF6 → #A78BFA)
- Soft ambient glows and gradients
- Cinematic, artistic studio aesthetic

---

## 📱 Pages & Features

### 1. Homepage (/)
**Two-Column Hero Layout:**
- **Left:** Portrait image placeholder (easily replaceable)
- **Right:** Animated headline with typewriter effect cycling through:
  - "I Design" → "I Create" → "I Build"
- Professional introduction paragraph

**Projects Section:**
- Two prominent buttons:
  - 🌟 **Floating View** — The creative immersive experience
  - 📋 **Standard View** — Traditional grid layout

---

### 2. Floating View (/floating) — ⭐ Hero Feature
**Full-Screen Interactive Experience:**
- Dark ambient background with soft floating particles
- Subtle depth/parallax effects

**Center Character:**
- Original cute cartoon character (simple, whimsical design)
- **Eyes follow mouse/touch cursor** with smooth animation
- Gentle blinking animation
- Idle breathing/floating motion

**4 Floating Project Bubbles:**
- Glass/neon circular style with purple glow
- Balanced radial layout around character
- Floating animation with parallax movement
- **Hover:** Intensified glow, title appears, subtle scale
- **Click:** Navigates to project detail page

---

### 3. Standard View (/projects)
**Clean 2x2 Grid:**
- Project cards with image, title, caption
- Hover animations and transitions
- Click to open project detail

---

### 4. Project Detail Pages (/projects/:id)
**Dynamic Template with Two Columns:**

**Left Column:**
- For 3D projects (1, 2, 3): Interactive **React Three Fiber viewer**
  - Loads .glb models
  - Auto slow rotation, orbit controls
  - HDR lighting & soft shadows
  - Loading spinner
- For Project 4: High-quality image display

**Right Column:**
- **Tabbed interface** with animated transitions:
  - Concept
  - UV Pack-Unwrap
  - Renders

---

## ✨ Animations & Effects

- Framer Motion page transitions
- Typewriter text effect
- Floating/parallax particle backgrounds
- Eye-tracking character animation
- Smooth hover states throughout
- Tab switching animations

---

## 🔧 Technical Foundation

- **React + Vite** (Lovable standard)
- **React Router** for routing
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Three Fiber** (@react-three/fiber@^8.18) for 3D
- **@react-three/drei** for 3D helpers

---

## 📁 Placeholder Assets

All placeholders are designed for easy replacement:
- `/public/images/portrait.jpg` — Khushi's photo
- `/public/images/project-1.jpg` through `project-4.jpg`
- `/public/models/model-1.glb` through `model-3.glb`

Clear instructions in README for swapping assets.

---

## 📋 What You'll Get

1. Fully functional portfolio website
2. Interactive floating view with character
3. 3D model viewer (ready for .glb files)
4. Responsive mobile + desktop design
5. Smooth animations throughout
6. Easy asset replacement system
7. Documentation for adding new projects

