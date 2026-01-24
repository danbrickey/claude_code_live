import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring,
} from "remotion";
import { TitleSceneProps } from "../types";

export const TitleScene: React.FC<TitleSceneProps> = ({
    title,
    subtitle,
    backgroundColor,
    textColor,
    fontSize = 120,
}) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // Fade in animation
    const fadeIn = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
    });

    // Fade out animation
    const fadeOut = interpolate(
        frame,
        [durationInFrames - 20, durationInFrames],
        [1, 0],
        {
            extrapolateLeft: "clamp",
        }
    );

    const opacity = Math.min(fadeIn, fadeOut);

    // Title slide up animation
    const titleY = spring({
        frame,
        fps,
        config: {
            damping: 100,
            stiffness: 200,
            mass: 0.5,
        },
    });

    const titleTransform = interpolate(titleY, [0, 1], [50, 0]);

    // Subtitle delay
    const subtitleY = spring({
        frame: frame - 10,
        fps,
        config: {
            damping: 100,
            stiffness: 200,
            mass: 0.5,
        },
    });

    const subtitleTransform = interpolate(subtitleY, [0, 1], [30, 0]);
    const subtitleOpacity = interpolate(frame, [10, 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
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
                    fontSize,
                    fontWeight: "bold",
                    margin: 0,
                    transform: `translateY(${titleTransform}px)`,
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
                        fontSize: fontSize * 0.4,
                        marginTop: 30,
                        opacity: subtitleOpacity,
                        transform: `translateY(${subtitleTransform}px)`,
                        textAlign: "center",
                        padding: "0 100px",
                    }}
                >
                    {subtitle}
                </p>
            )}
        </AbsoluteFill>
    );
};
