import { Composition } from "remotion";
import { SceneComposition } from "./SceneComposition";
import { VideoCanvas } from "./VideoCanvas";
import { Scene } from "./types";

// Default video settings
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_FPS = 30;

// Default scenes for the editor
const defaultScenes: Scene[] = [
    {
        id: "hello",
        type: "title",
        startFrame: 0,
        durationInFrames: 90,
        props: {
            title: "Hello World",
            subtitle: "Welcome to Remotion!",
            backgroundColor: "#1a2744",
            textColor: "#ffffff",
        },
    },
];

// Calculate total duration from scenes
const getTotalDuration = (scenes: Scene[]): number => {
    if (scenes.length === 0) return 150;
    const lastScene = scenes[scenes.length - 1];
    return lastScene.startFrame + lastScene.durationInFrames;
};

export const RemotionRoot: React.FC = () => {
    return (
        <>
            {/* Main editable video composition */}
            <Composition
                id="EditableVideo"
                component={SceneComposition}
                durationInFrames={getTotalDuration(defaultScenes)}
                fps={VIDEO_FPS}
                width={VIDEO_WIDTH}
                height={VIDEO_HEIGHT}
                defaultProps={{
                    scenes: defaultScenes,
                }}
            />

            {/* Canvas preview for editor UI */}
            <Composition
                id="CanvasPreview"
                component={VideoCanvas}
                durationInFrames={300}
                fps={VIDEO_FPS}
                width={VIDEO_WIDTH}
                height={VIDEO_HEIGHT}
            />
        </>
    );
};
