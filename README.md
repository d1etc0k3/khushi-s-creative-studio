# Khushi Gupta - Animation & Game Design Portfolio

A stunning, interactive portfolio website built with React, Tailwind CSS, Framer Motion, and React Three Fiber.

## ✨ Features

- **Animated Homepage** with typewriter effect cycling through "I Design", "I Create", "I Build"
- **Floating View** - Interactive experience with a cute animated character and floating project bubbles
- **3D Model Viewer** - Interactive viewer with orbit controls, auto-rotation, and HDR lighting
- **Smooth Animations** - Page transitions, hover effects, and parallax effects throughout
- **Dark Cinematic Theme** - Purple/violet accent lighting with glass morphism effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── CuteCharacter.tsx    # Animated character with eye-tracking
│   ├── FloatingBubble.tsx   # Project bubble component
│   ├── ParticleBackground.tsx
│   ├── HeroSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ModelViewer.tsx      # React Three Fiber 3D viewer
│   └── ContentTabs.tsx      # Animated tab interface
├── data/
│   └── projects.ts          # Project data configuration
├── hooks/
│   ├── useMousePosition.ts  # Mouse tracking hook
│   └── useTypewriter.ts     # Typewriter animation hook
├── pages/
│   ├── HomePage.tsx
│   ├── FloatingViewPage.tsx
│   ├── ProjectsPage.tsx
│   ├── ProjectDetailPage.tsx
│   └── NotFound.tsx
└── App.tsx
```

## 🎨 Customization

### Replace Portrait Image
Replace the portrait image placeholder:
- Add your image to `public/images/portrait.jpg`
- Update the `src` in `HeroSection.tsx`

### Add Your Projects
Edit `src/data/projects.ts`:

```typescript
{
  id: "your-project-id",
  title: "Project Title",
  shortDescription: "Brief description",
  type: "3d" | "image",
  modelPath: "/models/your-model.glb", // for 3D projects
  imagePath: "/images/project-image.jpg",
  concept: "Detailed concept description...",
  uvDescription: "UV mapping details...",
  renders: ["/images/render-1.jpg", "/images/render-2.jpg"]
}
```

### Add 3D Models
1. Place `.glb` files in `public/models/`
2. Update `modelPath` in your project data
3. The viewer will automatically load and display them

### Change Theme Colors
Edit `src/index.css` CSS variables:

```css
--primary: 263 70% 50%;     /* Purple hue */
--accent: 263 60% 60%;      /* Lighter purple */
--glow-primary: 263 70% 50%; /* Glow color */
```

## 🛠️ Technologies

- **React 18** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Three Fiber** - 3D graphics
- **React Router** - Navigation
- **Lucide React** - Icons

## 📱 Responsive Design

Fully responsive across:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🚀 Deployment

Deploy to Vercel, Netlify, or any static hosting:

```bash
npm run build
# Deploy the `dist` folder
```

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

Built with ❤️ for Khushi Gupta's Animation & Game Design portfolio.
