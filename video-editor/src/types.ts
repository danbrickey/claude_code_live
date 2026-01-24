// Scene types for the video editor

export type SceneType = "title" | "bullets" | "cta" | "image" | "custom" | "vscode" | "agent";

export interface BaseScene {
    id: string;
    type: SceneType;
    startFrame: number;
    durationInFrames: number;
}

export interface TitleSceneProps {
    title: string;
    subtitle?: string;
    backgroundColor: string;
    textColor: string;
    fontSize?: number;
}

export interface TitleScene extends BaseScene {
    type: "title";
    props: TitleSceneProps;
}

export interface BulletsSceneProps {
    title: string;
    bullets: string[];
    backgroundColor: string;
    textColor: string;
}

export interface BulletsScene extends BaseScene {
    type: "bullets";
    props: BulletsSceneProps;
}

export interface CTASceneProps {
    title: string;
    ctaText: string;
    backgroundColor: string;
    textColor: string;
}

export interface CTAScene extends BaseScene {
    type: "cta";
    props: CTASceneProps;
}

export interface ImageSceneProps {
    imageUrl: string;
    caption?: string;
    backgroundColor: string;
}

export interface ImageScene extends BaseScene {
    type: "image";
    props: ImageSceneProps;
}

export interface CustomSceneProps {
    content: string;
    backgroundColor: string;
    textColor: string;
}

export interface CustomScene extends BaseScene {
    type: "custom";
    props: CustomSceneProps;
}

export interface VSCodeSceneProps {
    showChat?: boolean;
    showExplorer?: boolean;
    zoomLevel?: number;
    zoomTarget?: "full" | "chat" | "explorer" | "prompt";
    closeupMode?: boolean; // Full-screen prompt view without VS Code chrome
    chatMessages?: Array<{ role: "user" | "assistant"; content: string }>;
    typingText?: string;
    typingStartFrame?: number;
    files?: Array<{ name: string; type: "folder" | "sql" | "yaml"; indent?: number; appearFrame?: number }>;
    attachedFiles?: Array<{ name: string; appearFrame?: number }>;
}

export interface VSCodeScene extends BaseScene {
    type: "vscode";
    props: VSCodeSceneProps;
}

export interface AgentWorkingSceneProps {
    taskDescription?: string;
    steps?: Array<{ text: string; status: "pending" | "working" | "done" }>;
    filesCreated?: Array<{ name: string; type: "sql" | "yaml" }>;
}

export interface AgentScene extends BaseScene {
    type: "agent";
    props: AgentWorkingSceneProps;
}

export type Scene = TitleScene | BulletsScene | CTAScene | ImageScene | CustomScene | VSCodeScene | AgentScene;

export interface VideoProject {
    id: string;
    name: string;
    scenes: Scene[];
    width: number;
    height: number;
    fps: number;
}
