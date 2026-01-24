import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring,
} from "remotion";
import { CTASceneProps } from "../types";

export const CTAScene: React.FC<CTASceneProps> = ({
    title,
    ctaText,
    backgroundColor,
    textColor,
}) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // Fade in/out
    const fadeIn = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });
    const fadeOut = interpolate(
        frame,
        [durationInFrames - 20, durationInFrames],
        [1, 0],
        { extrapolateLeft: "clamp" }
    );
    const opacity = Math.min(fadeIn, fadeOut);

    // Title animation
    const titleSpring = spring({
        frame,
        fps,
        config: { damping: 100, stiffness: 200, mass: 0.5 },
    });

    // CTA button scale animation
    const ctaSpring = spring({
        frame: frame - 20,
        fps,
        config: { damping: 50, stiffness: 300, mass: 0.8 },
    });

    const ctaScale = interpolate(ctaSpring, [0, 1], [0.8, 1]);
    const ctaOpacity = interpolate(frame, [20, 40], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Pulsing effect for CTA
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
                    transform: `translateY(${interpolate(titleSpring, [0, 1], [-40, 0])}px)`,
                    opacity: titleSpring,
                    textAlign: "center",
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
                    transform: `scale(${ctaScale * pulse})`,
                    opacity: ctaOpacity,
                    boxShadow: `0 10px 40px rgba(0,0,0,0.3)`,
                }}
            >
                {ctaText}
            </div>
        </AbsoluteFill>
    );
};
