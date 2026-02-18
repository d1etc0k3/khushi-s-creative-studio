import { withBase } from "@/lib/assets";

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
    shortDescription: "Detailed 3D Diorama Scene",
    type: "3d",
    modelPath: withBase("models/glb_diorama.glb"),
    meshModelPath: withBase("models/gltf_meshhh_diorama.glb"),
    imagePath: withBase("images/dio.jpeg"),
    renders:
      "This is a stylized miniature environment exploring vertical architecture within a compact space. The structure rises through layered platforms, balconies, and mechanical elements, creating a dynamic silhouette and strong visual hierarchy.\n\nThe oversized wheel and stacked forms guide the viewer’s eye upward, while grounded base details add realism and weight to the composition. The scene focuses on asymmetry, structural storytelling, and warm cinematic lighting to create an immersive small-scale world.\n\nThis project highlights:\n- Vertical composition\n- Silhouette design\n- Prop detailing\n- Stylized architectural modeling\n- Mood-driven lighting",
    mesh:
      "Clean topology with controlled edge flow and optimized geometry density. UVs were manually unwrapped and organized to ensure efficient texture usage with minimal stretching.",
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
    title: "Level Design",
    shortDescription: "",
    type: "3d",
    imagePath: withBase("images/lvl.png"),
    renders:
      "",
    mesh:
      "",
  },
  {
    id: "project-3",
    title: "Ford GT",
    shortDescription: "Supercar Model",
    type: "3d",
    modelPath: withBase("models/car_mesh.glb"),
    meshModelPath: withBase("models/car_mesh.glb"),
    imagePath: withBase("images/car.PNG"),
    renders:
      "This project is a high-detail 3D recreation of the Ford GT, focusing on precision hard-surface modeling and surface continuity. The model emphasizes accurate proportions, controlled edge flow, and clean panel transitions to achieve a realistic automotive silhouette. Special attention was given to body curvature, aerodynamic cut lines, and reflective surface behavior to maintain smooth highlights across complex forms. The project serves as a study in automotive design, topology control, and material response under studio lighting.",
    mesh:
      "Quad-dominant topology with controlled edge flow to ensure smooth curvature, clean reflections, and sharp panel definition. Geometry was optimized to balance detail and efficiency.",
  },
];
