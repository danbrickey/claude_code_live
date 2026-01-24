import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring,
} from "remotion";

interface CTASceneProps {
    title: string;
    ctaText: string;
    backgroundColor?: string;
    textColor?: string;
}

export const CTAScene: React.FC<CTASceneProps> = ({
    title,
    ctaText,
    backgroundColor = "#1a2744",
    textColor = "#ffffff",
}) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const opacity = interpolate(
        frame,
        [0, 20, durationInFrames - 20, durationInFrames],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const ctaScale = spring({
        frame: frame - 20,
        fps,
        config: { damping: 50, stiffness: 300, mass: 0.8 },
    });

    // Pulsing effect
    const pulse = Math.sin(frame * 0.15) * 0.03 + 1;

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
            <h2
                style={{
                    color: textColor,
                    fontSize: 100,
                    fontWeight: "bold",
                    marginBottom: 60,
                }}
            >
                {title}
            </h2>

            <div
                style={{
                    backgroundColor: textColor,
                    color: backgroundColor,
                    fontSize: 48,
                    fontWeight: "bold",
                    padding: "30px 80px",
                    borderRadius: 12,
                    transform: `scale(${interpolate(ctaScale, [0, 1], [0.8, 1]) * pulse})`,
                    opacity: interpolate(frame, [20, 40], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }),
                }}
            >
                {ctaText}
            </div>
        </AbsoluteFill>
    );
};
