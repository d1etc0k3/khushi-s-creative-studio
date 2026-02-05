export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  type: "3d" | "image";
  modelPath?: string;
  imagePath: string;
  concept: string;
  uvDescription: string;
  renders: string[];
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Fantasy Character",
    shortDescription: "A stylized fantasy character with intricate armor design",
    type: "3d",
    modelPath: "/models/model-1.glb",
    imagePath: "/placeholder.svg",
    concept:
      "This fantasy character was designed to explore the intersection of medieval armor aesthetics with magical elements. The goal was to create a hero character that feels both grounded and otherworldly, suitable for an action RPG setting.",
    uvDescription:
      "UV mapping was carefully planned to maximize texture resolution on the face and armor details. The character uses a 4K texture atlas with separate maps for the body, armor, and accessories to ensure crisp details at all viewing distances.",
    renders: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: "project-2",
    title: "Sci-Fi Environment",
    shortDescription: "Futuristic space station interior with cyberpunk elements",
    type: "3d",
    modelPath: "/models/model-2.glb",
    imagePath: "/placeholder.svg",
    concept:
      "This environment piece explores the visual language of lived-in sci-fi spaces. Inspired by classic cyberpunk aesthetics, it balances high-tech surfaces with signs of wear and human habitation.",
    uvDescription:
      "Modular UV layouts were used to create tileable textures for walls and floors, while hero props received unique UV islands. This approach allows the scene to be extended while maintaining consistent visual quality.",
    renders: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: "project-3",
    title: "Stylized Weapon",
    shortDescription: "Hand-painted stylized sword with magical enchantments",
    type: "3d",
    modelPath: "/models/model-3.glb",
    imagePath: "/placeholder.svg",
    concept:
      "This weapon design combines traditional sword-making elements with fantasy magic. The blade features ethereal runes that glow with arcane energy, telling the story of an ancient artifact.",
    uvDescription:
      "The UV layout prioritizes the blade and hilt details where players will spend the most time looking. Symmetry was used strategically to double texture resolution on key areas.",
    renders: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: "project-4",
    title: "Concept Art Collection",
    shortDescription: "Character and environment concept illustrations",
    type: "image",
    imagePath: "/placeholder.svg",
    concept:
      "This collection showcases concept art exploration for various game projects. Each piece begins with rough sketches and progresses through multiple iterations to final illustrations.",
    uvDescription:
      "Traditional 2D artwork using digital painting techniques. Created primarily in Photoshop with custom brushes designed to emulate traditional media.",
    renders: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
];
