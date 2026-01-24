import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring,
} from "remotion";

interface BulletsSceneProps {
    title: string;
    bullets: string[];
    backgroundColor?: string;
    textColor?: string;
}

export const BulletsScene: React.FC<BulletsSceneProps> = ({
    title,
    bullets,
    backgroundColor = "#ffffff",
    textColor = "#1a2744",
}) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const opacity = interpolate(
        frame,
        [0, 15, durationInFrames - 15, durationInFrames],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

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
                }}
            >
                {title}
            </h2>

            <ul style={{ listStyle: "none", padding: 0, maxWidth: 1200 }}>
                {bullets.map((bullet, index) => {
                    const delay = 20 + index * 20;
                    const bulletOpacity = interpolate(
                        frame,
                        [delay, delay + 15],
                        [0, 1],
                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    );
                    const bulletX = spring({
                        frame: frame - delay,
                        fps,
                        config: { damping: 100, stiffness: 200 },
                    });

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
                                transform: `translateX(${interpolate(bulletX, [0, 1], [-50, 0])}px)`,
                            }}
                        >
                            <span
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: textColor,
                                    marginRight: 30,
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
