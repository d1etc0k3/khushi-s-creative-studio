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
  pdfPath: string;
  turntableVideoPath?: string;
  renderImages: string[];
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
    imagePath: withBase("images/dio.jpeg"),
    pdfPath: withBase("dio.pdf"),
    turntableVideoPath: withBase("videos/level_sequence.mp4"),
    renderImages: [
      withBase("images/dio/2.png"),
      withBase("images/dio/3.png"),
      withBase("images/dio/4.png"),   
      withBase("images/dio/5.png"),
      withBase("images/dio/6.png"),
      withBase("images/dio/7.png"),
      withBase("images/dio/8.png"),   
      withBase("images/dio/18.png"),
        
    ],
    renders:
      "This is a stylized miniature environment exploring vertical architecture within a compact space. The structure rises through layered platforms, balconies, and mechanical elements, creating a dynamic silhouette and strong visual hierarchy.",
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
  // {
  //   id: "project-2",
  //   title: "Level Design",
  //   shortDescription: "",
  //   type: "3d",
  //   imagePath: withBase("images/lvl.png"),
  //   pdfPath: withBase("level-design.pdf"),
  //   turntableVideoPath: withBase("videos/project-2-turntable.mp4"),
  //   renderImages: [withBase("images/lvl.png"), withBase("images/lol.jpg")],
  //   renders: "",
  //   mesh: "",
  // },
  {
    id: "project-3",
    title: "Ford GT",
    shortDescription: "Supercar Model",
    type: "3d",
    imagePath: withBase("images/car.PNG"),
    pdfPath: withBase("gaadi.pdf"),
    turntableVideoPath: withBase("videos/gaadi.mp4"),
    renderImages: [
      withBase("images/gaadi/2.png"),
      withBase("images/gaadi/3.png"),
      withBase("images/gaadi/4.png"),
      withBase("images/gaadi/5.png"),
      withBase("images/gaadi/6.png"),
      withBase("images/gaadi/7.png"),
    ],
    renders:
      "This project is a high-detail 3D recreation of the Ford GT, focusing on precision hard-surface modeling and surface continuity.",
    mesh:
      "Quad-dominant topology with controlled edge flow to ensure smooth curvature, clean reflections, and sharp panel definition.",
  },
];
