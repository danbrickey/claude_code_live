import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring,
} from "remotion";
import { BulletsSceneProps } from "../types";

export const BulletsScene: React.FC<BulletsSceneProps> = ({
    title,
    bullets,
    backgroundColor,
    textColor,
}) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // Fade in/out
    const fadeIn = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
    });
    const fadeOut = interpolate(
        frame,
        [durationInFrames - 15, durationInFrames],
        [1, 0],
        { extrapolateLeft: "clamp" }
    );
    const opacity = Math.min(fadeIn, fadeOut);

    // Title animation
    const titleSpring = spring({
        frame,
        fps,
        config: { damping: 100, stiffness: 200 },
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
                padding: 100,
            }}
        >
            <h2
                style={{
                    color: textColor,
                    fontSize: 80,
                    fontWeight: "bold",
                    marginBottom: 60,
                    transform: `translateY(${interpolate(titleSpring, [0, 1], [-30, 0])}px)`,
                    opacity: titleSpring,
                }}
            >
                {title}
            </h2>

            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    maxWidth: 1200,
                }}
            >
                {bullets.map((bullet, index) => {
                    // Stagger each bullet appearance
                    const bulletDelay = 20 + index * 20;
                    const bulletSpring = spring({
                        frame: frame - bulletDelay,
                        fps,
                        config: { damping: 100, stiffness: 200 },
                    });

                    const bulletOpacity = interpolate(
                        frame,
                        [bulletDelay, bulletDelay + 15],
                        [0, 1],
                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    );

                    return (
                        <li
                            key={index}
                            style={{
                                color: textColor,
                                fontSize: 48,
                                marginBottom: 30,
                                display: "flex",
                                alignItems: "center",
                                opacity: bulletOpacity,
                                transform: `translateX(${interpolate(bulletSpring, [0, 1], [-50, 0])}px)`,
                            }}
                        >
                            <span
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: textColor,
                                    marginRight: 30,
                                    flexShrink: 0,
                                }}
                            />
                            {bullet}
                        </li>
                    );
                })}
            </ul>
        </AbsoluteFill>
    );
};
