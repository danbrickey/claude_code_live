import React from "react";
import { Composition, registerRoot } from "remotion";
import { SceneComposition } from "./SceneComposition";
import { Scene } from "./types";

// Default video settings
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_FPS = 30;

// Explainer Video: Amazon Q for dbt Development
const explainerScenes: Scene[] = [
    // Scene 1: Title Card (3 seconds)
    {
        id: "intro",
        type: "title",
        startFrame: 0,
        durationInFrames: 90,
        props: {
            title: "Building dbt Packages with AI",
            subtitle: "Amazon Q Developer in VS Code",
            backgroundColor: "#232f3e",
            textColor: "#ff9900",
            fontSize: 100,
        },
    },
    // Scene 2: VS Code Overview (4 seconds)
    {
        id: "vscode-overview",
        type: "vscode",
        startFrame: 90,
        durationInFrames: 120,
        props: {
            showChat: true,
            showExplorer: true,
            zoomLevel: 1,
            zoomTarget: "full",
            chatMessages: [],
            typingText: "",
            files: [
                { name: "models", type: "folder", indent: 1 },
                { name: "raw_vault", type: "folder", indent: 2 },
                { name: "business_vault", type: "folder", indent: 2 },
            ],
            attachedFiles: [],
        },
    },
    // Scene 3: Zoom to Amazon Q Chat (5 seconds)
    {
        id: "zoom-to-chat",
        type: "vscode",
        startFrame: 210,
        durationInFrames: 150,
        props: {
            showChat: true,
            showExplorer: false,
            zoomLevel: 1.3,
            zoomTarget: "chat",
            chatMessages: [
                {
                    role: "assistant",
                    content: "Hello! I'm Amazon Q Developer. I can help you generate code, explain existing code, or work on complex tasks across your codebase. How can I help?",
                },
            ],
            typingText: "",
            files: [],
            attachedFiles: [],
        },
    },
    // Scene 4: Attach Context Files (4 seconds) - FULL SCREEN CLOSE UP
    {
        id: "attach-context",
        type: "vscode",
        startFrame: 360,
        durationInFrames: 120,
        props: {
            closeupMode: true, // Full screen prompt view
            typingText: "",
            files: [],
            attachedFiles: [
                { name: "architecture_spec.md", appearFrame: 30 },
                { name: "data_vault_patterns.md", appearFrame: 60 },
                { name: "dbt_coding_standards.md", appearFrame: 90 },
            ],
        },
    },
    // Scene 5: Typing the Prompt (8 seconds) - FULL SCREEN CLOSE UP
    {
        id: "type-prompt",
        type: "vscode",
        startFrame: 480,
        durationInFrames: 240,
        props: {
            closeupMode: true, // Full screen prompt view
            typingText: "Using the attached architecture spec and context documents, create a complete set of dbt packages for our Data Vault implementation. Include raw vault hubs and links for claims, providers, members, and groups entities. Follow our coding standards and naming conventions.",
            typingStartFrame: 30,
            files: [],
            attachedFiles: [
                { name: "architecture_spec.md", appearFrame: 0 },
                { name: "data_vault_patterns.md", appearFrame: 0 },
                { name: "dbt_coding_standards.md", appearFrame: 0 },
            ],
        },
    },
    // Scene 6: Agent Working (6 seconds)
    {
        id: "agent-working",
        type: "agent",
        startFrame: 720,
        durationInFrames: 180,
        props: {
            taskDescription: "Creating Data Vault dbt packages for healthcare payer domain: claims, providers, members, and groups entities with hub and link tables.",
            steps: [
                { text: "Analyzing architecture specification...", status: "pending" },
                { text: "Reading Data Vault patterns from context...", status: "pending" },
                { text: "Generating hub models for core entities...", status: "pending" },
                { text: "Creating link models for relationships...", status: "pending" },
                { text: "Building staging models with coding standards...", status: "pending" },
                { text: "Generating schema.yml documentation...", status: "pending" },
            ],
            filesCreated: [
                { name: "hub_claim.sql", type: "sql" },
                { name: "hub_provider.sql", type: "sql" },
                { name: "hub_member.sql", type: "sql" },
                { name: "hub_group.sql", type: "sql" },
                { name: "link_claim_provider.sql", type: "sql" },
                { name: "link_member_group.sql", type: "sql" },
                { name: "stg_claims.sql", type: "sql" },
                { name: "schema.yml", type: "yaml" },
            ],
        },
    },
    // Scene 7: Files Created in Explorer (5 seconds)
    {
        id: "files-created",
        type: "vscode",
        startFrame: 900,
        durationInFrames: 150,
        props: {
            showChat: true,
            showExplorer: true,
            zoomLevel: 1.2,
            zoomTarget: "explorer",
            chatMessages: [
                {
                    role: "assistant",
                    content: "✅ I've created 8 dbt models following your Data Vault architecture and coding standards. The hub, link, and staging models are ready for your claims, providers, members, and groups entities.",
                },
            ],
            typingText: "",
            files: [
                { name: "models", type: "folder", indent: 1, appearFrame: 0 },
                { name: "raw_vault", type: "folder", indent: 2, appearFrame: 10 },
                { name: "hub_claim.sql", type: "sql", indent: 3, appearFrame: 20 },
                { name: "hub_provider.sql", type: "sql", indent: 3, appearFrame: 35 },
                { name: "hub_member.sql", type: "sql", indent: 3, appearFrame: 50 },
                { name: "hub_group.sql", type: "sql", indent: 3, appearFrame: 65 },
                { name: "link_claim_provider.sql", type: "sql", indent: 3, appearFrame: 80 },
                { name: "link_member_group.sql", type: "sql", indent: 3, appearFrame: 95 },
                { name: "staging", type: "folder", indent: 2, appearFrame: 110 },
                { name: "stg_claims.sql", type: "sql", indent: 3, appearFrame: 120 },
                { name: "schema.yml", type: "yaml", indent: 2, appearFrame: 135 },
            ],
            attachedFiles: [],
        },
    },
    // Scene 8: Key Benefits (4 seconds)
    {
        id: "benefits",
        type: "bullets",
        startFrame: 1050,
        durationInFrames: 120,
        props: {
            title: "Why Amazon Q for dbt?",
            bullets: [
                "📌 Attach specs & context for consistent output",
                "🏗️ Follows your Data Vault architecture",
                "📝 Respects your coding standards",
                "⚡ Generate complete packages in seconds",
            ],
            backgroundColor: "#232f3e",
            textColor: "#ffffff",
        },
    },
    // Scene 9: CTA (3 seconds)
    {
        id: "cta",
        type: "cta",
        startFrame: 1170,
        durationInFrames: 90,
        props: {
            title: "Start Building with Amazon Q",
            ctaText: "Install the VS Code Extension Today →",
            backgroundColor: "#ff9900",
            textColor: "#232f3e",
        },
    },
];

// Calculate total duration
const getTotalDuration = (scenes: Scene[]): number => {
    if (scenes.length === 0) return 150;
    const lastScene = scenes[scenes.length - 1];
    return lastScene.startFrame + lastScene.durationInFrames;
};

const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="AmazonQExplainer"
                component={SceneComposition}
                durationInFrames={getTotalDuration(explainerScenes)}
                fps={VIDEO_FPS}
                width={VIDEO_WIDTH}
                height={VIDEO_HEIGHT}
                defaultProps={{
                    scenes: explainerScenes,
                }}
            />
        </>
    );
};

registerRoot(RemotionRoot);
