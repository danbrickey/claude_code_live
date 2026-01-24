import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring,
} from "remotion";

interface TitleSceneProps {
    title: string;
    subtitle?: string;
    backgroundColor?: string;
    textColor?: string;
}

export const TitleScene: React.FC<TitleSceneProps> = ({
    title,
    subtitle,
    backgroundColor = "#1a2744",
    textColor = "#ffffff",
}) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // Fade in/out
    const opacity = interpolate(
        frame,
        [0, 20, durationInFrames - 20, durationInFrames],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Title slide up
    const titleY = spring({
        frame,
        fps,
        config: { damping: 100, stiffness: 200, mass: 0.5 },
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                opacity,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h1
                style={{
                    color: textColor,
                    fontSize: 120,
                    fontWeight: "bold",
                    transform: `translateY(${interpolate(titleY, [0, 1], [50, 0])}px)`,
                    textAlign: "center",
                    padding: "0 100px",
                }}
            >
                {title}
            </h1>
            {subtitle && (
                <p
                    style={{
                        color: textColor,
                        fontSize: 48,
                        marginTop: 30,
                        opacity: interpolate(frame, [15, 35], [0, 1], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        }),
                    }}
                >
                    {subtitle}
                </p>
            )}
        </AbsoluteFill>
    );
};
