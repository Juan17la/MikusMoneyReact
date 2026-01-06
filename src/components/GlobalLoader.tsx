export default function GlobalLoader() {
    return (
        <div className="fixed inset-0 bg-bg-deep/95 flex flex-col items-center justify-center z-50">
            {/* Retro scanlines overlay */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                }}
            />
            
            {/* Pixel Miku Container */}
            <div className="relative">
                {/* Glow effect */}
                <div 
                    className="absolute inset-0 blur-xl opacity-60"
                    style={{
                        background: 'radial-gradient(circle, #39c5bb 0%, transparent 70%)',
                        transform: 'scale(2)',
                    }}
                />
                
                {/* Circular spinner around Miku */}
                <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: 'scale(1.8)' }}
                >
                    <div 
                        className="w-6 h-6 border-4 border-accent/20 border-t-accent rounded-full"
                        style={{ animation: 'spin 1s linear infinite' }}
                    />
                </div>
                
                {/* Pixel Art Miku */}
                <svg 
                    width="80" 
                    height="96" 
                    viewBox="0 0 20 24" 
                    className="relative z-10 drop-shadow-lg"
                    style={{ imageRendering: 'pixelated' }}
                >
                    
                </svg>
            </div>
            
            {/* Loading text with retro effect */}
            <div className="mt-4 relative">
                <p 
                    className="text-accent text-lg tracking-widest font-bold"
                    style={{ 
                        fontFamily: 'monospace',
                        textShadow: '0 0 10px #39c5bb, 0 0 20px #39c5bb',
                    }}
                >
                    LOADING...
                </p>
            </div>
            
            {/* Musical notes floating animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <span
                        key={i}
                        className="absolute text-accent text-xl opacity-60"
                        style={{
                            left: `${15 + i * 15}%`,
                            animation: `floatNote ${2 + i * 0.3}s ease-in-out infinite`,
                            animationDelay: `${i * 0.4}s`,
                        }}
                    >
                        ♪
                    </span>
                ))}
            </div>
            
            {/* Inline keyframes */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes floatNote {
                    0%, 100% { 
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% { opacity: 0.6; }
                    90% { opacity: 0.6; }
                    100% { 
                        transform: translateY(-20px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
} 