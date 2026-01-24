import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring,
} from "remotion";

interface AgentWorkingSceneProps {
    taskDescription?: string;
    steps?: Array<{ text: string; status: "pending" | "working" | "done" }>;
    filesCreated?: Array<{ name: string; type: "sql" | "yaml" }>;
}

export const AgentWorkingScene: React.FC<AgentWorkingSceneProps> = ({
    taskDescription = "Creating dbt packages...",
    steps = [],
    filesCreated = [],
}) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // Fade in/out
    const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
    const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
    const opacity = Math.min(fadeIn, fadeOut);

    // Spinner rotation
    const rotation = frame * 6;

    // Calculate step statuses based on frame
    const getStepStatus = (index: number): "pending" | "working" | "done" => {
        const stepDuration = Math.floor(durationInFrames / (steps.length + 1));
        const stepStartFrame = (index + 1) * stepDuration * 0.5;
        const stepEndFrame = stepStartFrame + stepDuration * 0.8;

        if (frame < stepStartFrame) return "pending";
        if (frame < stepEndFrame) return "working";
        return "done";
    };

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#1e1e1e",
                opacity,
                display: "flex",
                fontFamily: "Segoe UI, sans-serif",
            }}
        >
            {/* VS Code Frame */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 32,
                backgroundColor: "#323233",
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
            }}>
                <div style={{ display: "flex", gap: 8, marginRight: 16 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
                </div>
                <span style={{ color: "#cccccc", fontSize: 13 }}>
                    Amazon Q - Working...
                </span>
            </div>

            {/* Main Content */}
            <div style={{
                flex: 1,
                marginTop: 32,
                display: "flex",
                padding: 60,
                gap: 60,
            }}>
                {/* Left: Agent Status */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Amazon Q Header */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        marginBottom: 40,
                    }}>
                        <div style={{
                            width: 64,
                            height: 64,
                            borderRadius: 16,
                            backgroundColor: "#ff9900",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 32,
                        }}>
                            🤖
                        </div>
                        <div>
                            <div style={{ color: "#fff", fontSize: 28, fontWeight: 600 }}>
                                Amazon Q Developer
                            </div>
                            <div style={{ color: "#ff9900", fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
                                <Spinner rotation={rotation} />
                                Working on your request...
                            </div>
                        </div>
                    </div>

                    {/* Task Description */}
                    <div style={{
                        backgroundColor: "#252526",
                        borderRadius: 12,
                        padding: 24,
                        marginBottom: 32,
                        borderLeft: "4px solid #ff9900",
                    }}>
                        <div style={{ color: "#888", fontSize: 12, marginBottom: 8, textTransform: "uppercase" }}>
                            Current Task
                        </div>
                        <div style={{ color: "#fff", fontSize: 18, lineHeight: 1.5 }}>
                            {taskDescription}
                        </div>
                    </div>

                    {/* Steps */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {steps.map((step, i) => {
                            const status = getStepStatus(i);
                            return (
                                <StepItem
                                    key={i}
                                    text={step.text}
                                    status={status}
                                    rotation={rotation}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Right: Files Being Created */}
                <div style={{
                    width: 400,
                    backgroundColor: "#252526",
                    borderRadius: 16,
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <div style={{
                        color: "#888",
                        fontSize: 12,
                        marginBottom: 16,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                    }}>
                        Files Being Created
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {filesCreated.map((file, i) => {
                            const fileAppearFrame = 30 + i * 20;
                            const showFile = frame >= fileAppearFrame;
                            const fileOpacity = interpolate(
                                frame - fileAppearFrame,
                                [0, 15],
                                [0, 1],
                                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                            );
                            const slideIn = interpolate(
                                frame - fileAppearFrame,
                                [0, 15],
                                [30, 0],
                                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                            );

                            return showFile ? (
                                <div
                                    key={i}
                                    style={{
                                        opacity: fileOpacity,
                                        transform: `translateX(${slideIn}px)`,
                                        backgroundColor: "#1e1e1e",
                                        borderRadius: 8,
                                        padding: "12px 16px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                    }}
                                >
                                    <span style={{ fontSize: 20 }}>
                                        {file.type === "sql" ? "📊" : "⚙️"}
                                    </span>
                                    <span style={{
                                        color: "#4ec9b0",
                                        fontSize: 14,
                                        fontFamily: "Consolas, monospace",
                                    }}>
                                        {file.name}
                                    </span>
                                    <span style={{
                                        marginLeft: "auto",
                                        color: "#28c840",
                                        fontSize: 12,
                                    }}>
                                        ✓ Created
                                    </span>
                                </div>
                            ) : null;
                        })}
                    </div>

                    {/* Progress indicator */}
                    <div style={{ marginTop: "auto", paddingTop: 24 }}>
                        <div style={{
                            height: 4,
                            backgroundColor: "#1e1e1e",
                            borderRadius: 2,
                            overflow: "hidden",
                        }}>
                            <div style={{
                                height: "100%",
                                backgroundColor: "#ff9900",
                                width: `${(frame / durationInFrames) * 100}%`,
                                borderRadius: 2,
                            }} />
                        </div>
                        <div style={{
                            color: "#888",
                            fontSize: 12,
                            marginTop: 8,
                            textAlign: "center",
                        }}>
                            {filesCreated.filter((_, i) => frame >= 30 + i * 20).length} / {filesCreated.length} files created
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 22,
                backgroundColor: "#ff9900",
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                fontSize: 12,
                color: "#000",
            }}>
                <span style={{ fontWeight: 600 }}>⚡ Amazon Q Agent Active</span>
                <div style={{ flex: 1 }} />
                <span>Processing request...</span>
            </div>
        </AbsoluteFill>
    );
};

// Helper Components
const Spinner: React.FC<{ rotation: number; size?: number }> = ({ rotation, size = 16 }) => (
    <div style={{
        width: size,
        height: size,
        border: `2px solid transparent`,
        borderTopColor: "#ff9900",
        borderRadius: "50%",
        transform: `rotate(${rotation}deg)`,
    }} />
);

const StepItem: React.FC<{
    text: string;
    status: "pending" | "working" | "done";
    rotation: number;
}> = ({ text, status, rotation }) => {
    const getStatusIcon = () => {
        if (status === "done") return <span style={{ color: "#28c840" }}>✓</span>;
        if (status === "working") return <Spinner rotation={rotation} />;
        return <span style={{ color: "#555" }}>○</span>;
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "12px 16px",
            backgroundColor: status === "working" ? "rgba(255, 153, 0, 0.1)" : "#252526",
            borderRadius: 8,
            borderLeft: status === "working" ? "3px solid #ff9900" : "3px solid transparent",
        }}>
            <div style={{ width: 20, display: "flex", justifyContent: "center" }}>
                {getStatusIcon()}
            </div>
            <span style={{
                color: status === "pending" ? "#666" : "#fff",
                fontSize: 15,
            }}>
                {text}
            </span>
        </div>
    );
};
