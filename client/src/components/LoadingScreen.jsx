const LoadingScreen = ({ message = "Loading..." }) => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center surface-level-0 overflow-hidden">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-orange/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-brand-cyan/10 rounded-full blur-[80px] pointer-events-none translate-x-10 translate-y-10" />

            {/* Kinetic Orbital Rings */}
            <div className="relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40">
                {/* Outer Dashed Ring */}
                <div className="absolute w-full h-full rounded-full border-[1.5px] border-dashed border-outline-variant/60 animate-[spin_12s_linear_infinite]" />

                {/* Middle Speed Ring */}
                <div className="absolute w-[80%] h-[80%] rounded-full border-2 border-transparent border-t-brand-orange border-r-brand-orange/30 animate-[spin_3s_cubic-bezier(0.4,0,0.2,1)_infinite]" />

                {/* Inner Solid Ring */}
                <div className="absolute w-[60%] h-[60%] rounded-full border border-brand-cyan/40 animate-[spin_8s_linear_infinite_reverse]" />

                {/* Center Pulsing Logo */}
                <img
                    src="/workPilot_logo.svg"
                    alt="WorkPilot"
                    className="w-10 h-10 sm:w-12 sm:h-12 relative z-10 animate-pulse drop-shadow-xl"
                />
            </div>

            {/* Loading Typography */}
            <div className="mt-8 flex flex-col items-center gap-2">
                <h2 className="text-headline-sm font-display font-extrabold text-text-main tracking-tight">
                    WorkPilot
                </h2>

                <div className="flex items-center gap-2.5 bg-panel/50 px-3 py-1.5 rounded-full border border-outline-variant/30 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange" />
                    </span>
                    <p className="text-label-caps text-text-muted font-mono tracking-widest">
                        {message}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default LoadingScreen;