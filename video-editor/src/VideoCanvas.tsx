import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * VideoCanvas - A canvas-based preview for the video editor
 * This component can be extended to show interactive elements
 */
export const VideoCanvas: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height, fps, durationInFrames } = useVideoConfig();

    const currentTime = (frame / fps).toFixed(2);
    const totalTime = (durationInFrames / fps).toFixed(2);
    const progress = (frame / durationInFrames) * 100;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#1a2744",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
                color: "#ffffff",
            }}
        >
            {/* Canvas area */}
            <div
                style={{
                    width: width * 0.8,
                    height: height * 0.7,
                    backgroundColor: "#0d1421",
                    border: "4px solid #ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <p style={{ fontSize: 48, opacity: 0.5 }}>
                    Canvas Preview Area
                </p>

                {/* Frame counter */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        fontSize: 24,
                        fontFamily: "monospace",
                        opacity: 0.7,
                    }}
                >
                    Frame: {frame} / {durationInFrames}
                </div>
            </div>

            {/* Timeline bar */}
            <div
                style={{
                    width: width * 0.8,
                    marginTop: 40,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 10,
                        fontSize: 24,
                    }}
                >
                    <span>{currentTime}s</span>
                    <span>{totalTime}s</span>
                </div>
                <div
                    style={{
                        width: "100%",
                        height: 20,
                        backgroundColor: "#0d1421",
                        border: "2px solid #ffffff",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: `${progress}%`,
                            height: "100%",
                            backgroundColor: "#ffffff",
                            transition: "width 0.05s linear",
                        }}
                    />
                </div>
            </div>
        </AbsoluteFill>
    );
};
