import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene } from "./types";
import { TitleScene } from "./scenes/TitleScene";
import { BulletsScene } from "./scenes/BulletsScene";
import { CTAScene } from "./scenes/CTAScene";
import { VSCodeScene } from "./scenes/VSCodeScene";
import { AgentWorkingScene } from "./scenes/AgentWorkingScene";

interface SceneCompositionProps {
    scenes: Scene[];
}

export const SceneComposition: React.FC<SceneCompositionProps> = ({ scenes }) => {
    const renderScene = (scene: Scene) => {
        switch (scene.type) {
            case "title":
                return <TitleScene {...scene.props} />;
            case "bullets":
                return <BulletsScene {...scene.props} />;
            case "cta":
                return <CTAScene {...scene.props} />;
            case "vscode":
                return <VSCodeScene {...scene.props} />;
            case "agent":
                return <AgentWorkingScene {...scene.props} />;
            default:
                return (
                    <AbsoluteFill
                        style={{
                            backgroundColor: "#333",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: 48,
                        }}
                    >
                        Unknown scene type
                    </AbsoluteFill>
                );
        }
    };

    return (
        <AbsoluteFill>
            {scenes.map((scene) => (
                <Sequence
                    key={scene.id}
                    from={scene.startFrame}
                    durationInFrames={scene.durationInFrames}
                    name={`${scene.type}: ${scene.id}`}
                >
                    {renderScene(scene)}
                </Sequence>
            ))}
        </AbsoluteFill>
    );
};
