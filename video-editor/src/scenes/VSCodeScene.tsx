import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring,
} from "remotion";

interface VSCodeSceneProps {
    showChat?: boolean;
    showExplorer?: boolean;
    zoomLevel?: number;
    zoomTarget?: "full" | "chat" | "explorer" | "prompt";
    closeupMode?: boolean; // NEW: Shows only the prompt area in full screen
    chatMessages?: Array<{ role: "user" | "assistant"; content: string }>;
    typingText?: string;
    typingStartFrame?: number;
    files?: Array<{ name: string; type: "folder" | "sql" | "yaml"; indent?: number; appearFrame?: number }>;
    attachedFiles?: Array<{ name: string; appearFrame?: number }>;
}

export const VSCodeScene: React.FC<VSCodeSceneProps> = ({
    showChat = true,
    showExplorer = true,
    zoomLevel = 1,
    zoomTarget = "full",
    closeupMode = false,
    chatMessages = [],
    typingText = "",
    typingStartFrame = 0,
    files = [],
    attachedFiles = [],
}) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // Fade in/out
    const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
    const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
    const opacity = Math.min(fadeIn, fadeOut);

    // Zoom animation (only used when not in closeupMode)
    const zoomSpring = spring({
        frame: frame - 20,
        fps,
        config: { damping: 100, stiffness: 80, mass: 1 },
    });
    const currentZoom = closeupMode ? 1 : interpolate(zoomSpring, [0, 1], [1, zoomLevel]);

    // Calculate zoom origin based on target - adjusted for better framing
    const getZoomOrigin = () => {
        switch (zoomTarget) {
            case "chat": return "25% 50%";
            case "explorer": return "85% 50%";
            case "prompt": return "22% 72%"; // Centered on the prompt text input
            default: return "50% 50%";
        }
    };

    // Typing animation - handle empty text case
    const textLength = typingText.length || 1; // Avoid [0,0] range
    const typedCharacters = typingText.length > 0 ? Math.floor(
        interpolate(
            frame - typingStartFrame,
            [0, textLength * 2],
            [0, textLength],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
    ) : 0;
    const displayedText = typingText.substring(0, typedCharacters);
    const showCursor = typingText.length > 0 && frame % 30 < 15 && typedCharacters < typingText.length;

    // CLOSEUP MODE: Full-screen prompt view - no CSS transform needed
    if (closeupMode) {
        return (
            <AbsoluteFill
                style={{
                    backgroundColor: "#1a1a2e",
                    opacity,
                    display: "flex",
                    flexDirection: "column",
                    padding: 60,
                }}
            >
                {/* Header - Amazon Q branding */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    marginBottom: 40,
                }}>
                    <div style={{
                        width: 60,
                        height: 60,
                        borderRadius: 12,
                        backgroundColor: "#ff9900",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 32,
                    }}>
                        🤖
                    </div>
                    <div>
                        <div style={{
                            color: "#ffffff",
                            fontSize: 32,
                            fontWeight: 600,
                            fontFamily: "Segoe UI, sans-serif",
                        }}>
                            Amazon Q Developer
                        </div>
                        <div style={{
                            color: "#888",
                            fontSize: 18,
                            fontFamily: "Segoe UI, sans-serif",
                        }}>
                            Visual Studio Code Extension
                        </div>
                    </div>
                </div>

                {/* Pinned Context Files - Large and centered */}
                {attachedFiles.length > 0 && (
                    <div style={{
                        marginBottom: 40,
                    }}>
                        <div style={{
                            color: "#ff9900",
                            fontSize: 20,
                            marginBottom: 20,
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            fontFamily: "Segoe UI, sans-serif",
                            fontWeight: 600,
                        }}>
                            📎 Pinned Context Files
                        </div>
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 16,
                        }}>
                            {attachedFiles.map((file, i) => {
                                const showFile = frame >= (file.appearFrame || 0);
                                const fileOpacity = interpolate(
                                    frame - (file.appearFrame || 0),
                                    [0, 15],
                                    [0, 1],
                                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                );
                                const scaleIn = spring({
                                    frame: frame - (file.appearFrame || 0),
                                    fps,
                                    config: { damping: 15, stiffness: 100, mass: 0.5 },
                                });
                                return showFile ? (
                                    <div
                                        key={i}
                                        style={{
                                            backgroundColor: "#0e639c",
                                            color: "#fff",
                                            fontSize: 22,
                                            padding: "14px 24px",
                                            borderRadius: 12,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                            opacity: fileOpacity,
                                            transform: `scale(${scaleIn})`,
                                            fontFamily: "Consolas, monospace",
                                            boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                                        }}
                                    >
                                        📌 {file.name}
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}

                {/* Prompt Input Area - Main focus */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <div style={{
                        color: "#888",
                        fontSize: 18,
                        marginBottom: 16,
                        fontFamily: "Segoe UI, sans-serif",
                    }}>
                        💬 Your prompt to Amazon Q:
                    </div>
                    
                    {/* Large Prompt Text Box */}
                    <div style={{
                        flex: 1,
                        backgroundColor: "#252536",
                        borderRadius: 20,
                        padding: 40,
                        border: "3px solid #444",
                        boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <div style={{
                            flex: 1,
                            color: "#e8e8e8",
                            fontSize: 32,
                            fontFamily: "Consolas, 'Courier New', monospace",
                            lineHeight: 1.5,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                        }}>
                            {displayedText}
                            {showCursor && (
                                <span style={{
                                    backgroundColor: "#ff9900",
                                    color: "#ff9900",
                                    marginLeft: 4,
                                    animation: "blink 1s infinite",
                                }}>▌</span>
                            )}
                        </div>
                        
                        {/* Send Button */}
                        {displayedText.length > 10 && (
                            <div style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: 30,
                            }}>
                                <div style={{
                                    backgroundColor: "#ff9900",
                                    color: "#000",
                                    padding: "16px 32px",
                                    borderRadius: 12,
                                    fontSize: 20,
                                    fontWeight: 700,
                                    fontFamily: "Segoe UI, sans-serif",
                                    boxShadow: "0 4px 16px rgba(255, 153, 0, 0.4)",
                                }}>
                                    Send to Amazon Q →
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </AbsoluteFill>
        );
    }

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#1e1e1e",
                opacity,
                transform: `scale(${currentZoom})`,
                transformOrigin: getZoomOrigin(),
            }}
        >
            {/* VS Code Title Bar */}
            <div style={{
                height: 32,
                backgroundColor: "#323233",
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                borderBottom: "1px solid #1e1e1e",
            }}>
                <div style={{ display: "flex", gap: 8, marginRight: 16 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
                </div>
                <span style={{ color: "#cccccc", fontSize: 13, fontFamily: "Segoe UI, sans-serif" }}>
                    dbt_healthcare_project - Visual Studio Code
                </span>
            </div>

            {/* Main Content Area */}
            <div style={{ display: "flex", flex: 1, height: "calc(100% - 32px)" }}>
                {/* Activity Bar */}
                <div style={{
                    width: 48,
                    backgroundColor: "#333333",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 8,
                    gap: 4,
                }}>
                    <ActivityBarIcon icon="📁" active={showExplorer} />
                    <ActivityBarIcon icon="🔍" />
                    <ActivityBarIcon icon="🔀" />
                    <ActivityBarIcon icon="🐛" />
                    <ActivityBarIcon icon="📦" />
                    <div style={{ flex: 1 }} />
                    <ActivityBarIcon icon="🤖" active={showChat} highlight />
                </div>

                {/* Amazon Q Chat Panel - wider when zoomed for close-up */}
                {showChat && (
                    <div style={{
                        width: zoomLevel > 2 ? 700 : 420,
                        backgroundColor: "#252526",
                        borderRight: "1px solid #1e1e1e",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        {/* Chat Header */}
                        <div style={{
                            padding: "12px 16px",
                            borderBottom: "1px solid #1e1e1e",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}>
                            <span style={{ fontSize: 20 }}>🤖</span>
                            <span style={{ color: "#ffffff", fontSize: 14, fontWeight: 600, fontFamily: "Segoe UI, sans-serif" }}>
                                Amazon Q
                            </span>
                            <span style={{
                                backgroundColor: "#ff9900",
                                color: "#000",
                                fontSize: 10,
                                padding: "2px 6px",
                                borderRadius: 4,
                                fontWeight: 600,
                            }}>
                                Developer
                            </span>
                        </div>

                        {/* Chat Messages */}
                        <div style={{
                            flex: 1,
                            padding: 16,
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                        }}>
                            {chatMessages.map((msg, i) => (
                                <ChatMessage
                                    key={i}
                                    role={msg.role}
                                    content={msg.content}
                                    frame={frame}
                                    appearFrame={i * 30}
                                />
                            ))}
                        </div>

                        {/* Attached Context Files - Large when zoomed */}
                        {attachedFiles.length > 0 && (
                            <div style={{
                                padding: zoomLevel > 2 ? "20px 24px" : "8px 16px",
                                borderTop: "1px solid #1e1e1e",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: zoomLevel > 2 ? 16 : 8,
                            }}>
                                <div style={{
                                    color: "#888",
                                    fontSize: zoomLevel > 2 ? 16 : 10,
                                    textTransform: "uppercase",
                                    letterSpacing: 1,
                                    width: "100%",
                                    marginBottom: zoomLevel > 2 ? 12 : 4,
                                    fontFamily: "Segoe UI, sans-serif",
                                }}>
                                    📎 Pinned Context
                                </div>
                                {attachedFiles.map((file, i) => {
                                    const showFile = frame >= (file.appearFrame || 0);
                                    const fileOpacity = interpolate(
                                        frame - (file.appearFrame || 0),
                                        [0, 10],
                                        [0, 1],
                                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                    );
                                    const scaleIn = interpolate(
                                        frame - (file.appearFrame || 0),
                                        [0, 15],
                                        [0.8, 1],
                                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                    );
                                    return showFile ? (
                                        <div
                                            key={i}
                                            style={{
                                                backgroundColor: "#0e639c",
                                                color: "#fff",
                                                fontSize: zoomLevel > 2 ? 18 : 11,
                                                padding: zoomLevel > 2 ? "10px 16px" : "4px 8px",
                                                borderRadius: zoomLevel > 2 ? 8 : 4,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: zoomLevel > 2 ? 10 : 4,
                                                opacity: fileOpacity,
                                                transform: `scale(${scaleIn})`,
                                                fontFamily: "Consolas, monospace",
                                                boxShadow: zoomLevel > 2 ? "0 4px 12px rgba(0,0,0,0.3)" : "none",
                                            }}
                                        >
                                            📌 {file.name}
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        )}

                        {/* Chat Input - LARGE when zoomed for close-up */}
                        <div style={{
                            padding: zoomLevel > 2 ? 24 : 16,
                            borderTop: "1px solid #1e1e1e",
                            flex: zoomLevel > 2 ? 1 : "none",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            {zoomLevel > 2 && (
                                <div style={{
                                    color: "#ff9900",
                                    fontSize: 14,
                                    marginBottom: 12,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    fontFamily: "Segoe UI, sans-serif",
                                }}>
                                    <span>💬</span> Type your prompt...
                                </div>
                            )}
                            <div style={{
                                backgroundColor: "#3c3c3c",
                                borderRadius: zoomLevel > 2 ? 12 : 8,
                                padding: zoomLevel > 2 ? "20px 24px" : "12px 16px",
                                minHeight: zoomLevel > 2 ? 200 : 80,
                                flex: zoomLevel > 2 ? 1 : "none",
                                border: zoomLevel > 2 ? "2px solid #555" : "none",
                                boxShadow: zoomLevel > 2 ? "0 4px 20px rgba(0,0,0,0.4)" : "none",
                            }}>
                                <span style={{
                                    color: "#e0e0e0",
                                    fontSize: zoomLevel > 2 ? 22 : 13,
                                    fontFamily: "Consolas, monospace",
                                    whiteSpace: "pre-wrap",
                                    lineHeight: 1.6,
                                    letterSpacing: zoomLevel > 2 ? 0.5 : 0,
                                }}>
                                    {displayedText}
                                    {showCursor && <span style={{ backgroundColor: "#ff9900", color: "#ff9900", marginLeft: 2 }}>▌</span>}
                                </span>
                            </div>
                            {zoomLevel > 2 && displayedText.length > 0 && (
                                <div style={{
                                    marginTop: 16,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: 12,
                                }}>
                                    <div style={{
                                        backgroundColor: "#ff9900",
                                        color: "#000",
                                        padding: "10px 20px",
                                        borderRadius: 6,
                                        fontSize: 14,
                                        fontWeight: 600,
                                        fontFamily: "Segoe UI, sans-serif",
                                    }}>
                                        Send to Amazon Q →
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Editor Area */}
                <div style={{ flex: 1, backgroundColor: "#1e1e1e", position: "relative" }}>
                    {/* Editor Tabs */}
                    <div style={{
                        height: 35,
                        backgroundColor: "#252526",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #1e1e1e",
                    }}>
                        <EditorTab name="README.md" active />
                    </div>

                    {/* Editor Content - Welcome Screen */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "calc(100% - 35px)",
                        color: "#6e6e6e",
                        fontSize: 16,
                        fontFamily: "Segoe UI, sans-serif",
                    }}>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
                            <div style={{ color: "#cccccc", fontSize: 20, marginBottom: 8 }}>
                                dbt Healthcare Project
                            </div>
                            <div style={{ fontSize: 14 }}>
                                Data Vault Architecture • Claims • Providers • Members • Groups
                            </div>
                        </div>
                    </div>
                </div>

                {/* File Explorer Panel */}
                {showExplorer && (
                    <div style={{
                        width: 300,
                        backgroundColor: "#252526",
                        borderLeft: "1px solid #1e1e1e",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <div style={{
                            padding: "8px 12px",
                            color: "#bbbbbb",
                            fontSize: 11,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            fontFamily: "Segoe UI, sans-serif",
                        }}>
                            Explorer
                        </div>
                        <div style={{
                            padding: "0 8px",
                            flex: 1,
                        }}>
                            <FileTreeItem name="dbt_healthcare_project" type="folder" expanded />
                            {files.map((file, i) => {
                                const showFile = frame >= (file.appearFrame || 0);
                                const fileOpacity = interpolate(
                                    frame - (file.appearFrame || 0),
                                    [0, 15],
                                    [0, 1],
                                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                );
                                const slideIn = interpolate(
                                    frame - (file.appearFrame || 0),
                                    [0, 15],
                                    [20, 0],
                                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                                );
                                return showFile ? (
                                    <div
                                        key={i}
                                        style={{
                                            opacity: fileOpacity,
                                            transform: `translateX(${slideIn}px)`,
                                        }}
                                    >
                                        <FileTreeItem
                                            name={file.name}
                                            type={file.type}
                                            indent={file.indent}
                                            isNew={frame - (file.appearFrame || 0) < 60}
                                        />
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div style={{
                height: 22,
                backgroundColor: "#007acc",
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                fontSize: 12,
                color: "#fff",
                fontFamily: "Segoe UI, sans-serif",
            }}>
                <span style={{ marginRight: 16 }}>🔀 main</span>
                <span style={{ marginRight: 16 }}>✓ Synced</span>
                <div style={{ flex: 1 }} />
                <span>Amazon Q: Ready</span>
            </div>
        </AbsoluteFill>
    );
};

// Helper Components
const ActivityBarIcon: React.FC<{ icon: string; active?: boolean; highlight?: boolean }> = ({ icon, active, highlight }) => (
    <div style={{
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        borderLeft: active ? "2px solid #fff" : "2px solid transparent",
        backgroundColor: highlight ? "rgba(255, 153, 0, 0.2)" : "transparent",
        cursor: "pointer",
    }}>
        {icon}
    </div>
);

const EditorTab: React.FC<{ name: string; active?: boolean }> = ({ name, active }) => (
    <div style={{
        padding: "0 16px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: active ? "#1e1e1e" : "#2d2d2d",
        color: active ? "#fff" : "#969696",
        fontSize: 13,
        fontFamily: "Segoe UI, sans-serif",
        borderRight: "1px solid #1e1e1e",
    }}>
        📄 {name}
    </div>
);

const FileTreeItem: React.FC<{
    name: string;
    type: "folder" | "sql" | "yaml";
    indent?: number;
    expanded?: boolean;
    isNew?: boolean;
}> = ({ name, type, indent = 0, expanded, isNew }) => {
    const getIcon = () => {
        if (type === "folder") return expanded ? "📂" : "📁";
        if (type === "sql") return "📊";
        if (type === "yaml") return "⚙️";
        return "📄";
    };

    return (
        <div style={{
            padding: "4px 8px",
            paddingLeft: 8 + (indent || 0) * 16,
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: isNew ? "#4ec9b0" : "#cccccc",
            fontSize: 13,
            fontFamily: "Segoe UI, sans-serif",
            backgroundColor: isNew ? "rgba(78, 201, 176, 0.1)" : "transparent",
            borderRadius: 4,
        }}>
            <span style={{ fontSize: 14 }}>{getIcon()}</span>
            <span>{name}</span>
            {isNew && (
                <span style={{
                    fontSize: 9,
                    backgroundColor: "#4ec9b0",
                    color: "#000",
                    padding: "1px 4px",
                    borderRadius: 3,
                    marginLeft: "auto",
                }}>
                    NEW
                </span>
            )}
        </div>
    );
};

const ChatMessage: React.FC<{
    role: "user" | "assistant";
    content: string;
    frame: number;
    appearFrame: number;
}> = ({ role, content, frame, appearFrame }) => {
    const opacity = interpolate(
        frame - appearFrame,
        [0, 15],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    if (frame < appearFrame) return null;

    return (
        <div style={{
            opacity,
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
        }}>
            <div style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: role === "user" ? "#0e639c" : "#ff9900",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                flexShrink: 0,
            }}>
                {role === "user" ? "👤" : "🤖"}
            </div>
            <div style={{
                flex: 1,
                color: "#d4d4d4",
                fontSize: 13,
                lineHeight: 1.5,
                fontFamily: "Segoe UI, sans-serif",
            }}>
                {content}
            </div>
        </div>
    );
};
