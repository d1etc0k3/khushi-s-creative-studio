export interface LightingConfig {
  ambientIntensity: number;
  ambientColor: string;
  directionalIntensity: number;
  directionalColor: string;
  directionalPosition: [number, number, number];
  pointLight1Intensity: number;
  pointLight1Color: string;
  pointLight1Position: [number, number, number];
  pointLight2Intensity: number;
  pointLight2Color: string;
  pointLight2Position: [number, number, number];
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  type: "3d" | "image";
  modelPath?: string;
  meshModelPath?: string;
  imagePath: string;
  renders: string;
  mesh: string;
  lighting?: LightingConfig;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Diorama",
    shortDescription: "Khushi ka sabse badhia project",
    type: "3d",
    modelPath: "/models/glb_diorama.glb",
    meshModelPath: "/models/gltf_meshhh_diorama.glb",
    imagePath: "/placeholder.svg",
    renders:
      "This fantasy character was designed to explore the intersection of medieval armor aesthetics with magical elements. The goal was to create a hero character that feels both grounded and otherworldly, suitable for an action RPG setting.",
    mesh:
      "UV mapping was carefully planned to maximize texture resolution on the face and armor details. The character uses a 4K texture atlas with separate maps for the body, armor, and accessories to ensure crisp details at all viewing distances.",
    lighting: {
      ambientIntensity: 0.22,
      ambientColor: "#FFB366",
      directionalIntensity: 0.66,
      directionalColor: "#FF9944",
      directionalPosition: [8, 6, 5],
      pointLight1Intensity: 0.44,
      pointLight1Color: "#FF8822",
      pointLight1Position: [-5, 3, -5],
      pointLight2Intensity: 0.39,
      pointLight2Color: "#FFAA55",
      pointLight2Position: [0, 2, 8],
    },
  },
  {
    id: "project-2",
    title: "Sci-Fi Environment",
    shortDescription: "Futuristic space station interior with cyberpunk elements",
    type: "3d",
    modelPath: "/models/model-2.glb",
    meshModelPath: "/models/model-2.glb",
    imagePath: "/placeholder.svg",
    renders:
      "This environment piece explores the visual language of lived-in sci-fi spaces. Inspired by classic cyberpunk aesthetics, it balances high-tech surfaces with signs of wear and human habitation.",
    mesh:
      "Modular UV layouts were used to create tileable textures for walls and floors, while hero props received unique UV islands. This approach allows the scene to be extended while maintaining consistent visual quality.",
  },
  {
    id: "project-3",
    title: "Stylized Weapon",
    shortDescription: "Hand-painted stylized sword with magical enchantments",
    type: "3d",
    modelPath: "/models/model-3.glb",
    meshModelPath: "/models/model-3.glb",
    imagePath: "/placeholder.svg",
    renders:
      "This weapon design combines traditional sword-making elements with fantasy magic. The blade features ethereal runes that glow with arcane energy, telling the story of an ancient artifact.",
    mesh:
      "The UV layout prioritizes the blade and hilt details where players will spend the most time looking. Symmetry was used strategically to double texture resolution on key areas.",
  },
  {
    id: "project-4",
    title: "Concept Art Collection",
    shortDescription: "Character and environment concept illustrations",
    type: "image",
    modelPath: "/placeholder.svg",
    meshModelPath: "/placeholder.svg",
    imagePath: "/placeholder.svg",
    renders:
      "This collection showcases concept art exploration for various game projects. Each piece begins with rough sketches and progresses through multiple iterations to final illustrations.",
    mesh:
      "Traditional 2D artwork using digital painting techniques. Created primarily in Photoshop with custom brushes designed to emulate traditional media.",
  },
];
