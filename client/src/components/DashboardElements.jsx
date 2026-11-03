//  ==========================================
//    3D HERO ILLUSTRATION (LAPTOP, MUG, CARDS)
//    Matches image_e90b86.png
//    ========================================== 
export const Hero3DIllustration = () => (
    <div className="relative w-full h-56 sm:h-64 flex items-center justify-center select-none">
        <svg
            viewBox="0 0 420 270"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full max-w-[420px] overflow-visible drop-shadow-xl"
        >
            <defs>
                {/* 3D Card Drop Shadow */}
                <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#1E1B4B" floodOpacity="0.14" />
                </filter>

                {/* 3D Laptop Shadow */}
                <filter id="laptopShadow" x="-20%" y="-20%" width="150%" height="150%">
                    <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.28" />
                </filter>

                {/* Laptop Lid 3D Gradient */}
                <linearGradient id="laptopLidGrad" x1="160" y1="100" x2="350" y2="235" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6E6BA8" />
                    <stop offset="55%" stopColor="#48457A" />
                    <stop offset="100%" stopColor="#2D2A54" />
                </linearGradient>

                {/* Laptop Base Deck Gradient */}
                <linearGradient id="laptopBaseGrad" x1="115" y1="215" x2="335" y2="235" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#E2E8F0" />
                    <stop offset="50%" stopColor="#CBD5E1" />
                    <stop offset="100%" stopColor="#64748B" />
                </linearGradient>

                {/* Mug 3D Cylindrical Gradient */}
                <linearGradient id="mugBodyGrad" x1="65" y1="190" x2="128" y2="245" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#5B54B8" />
                    <stop offset="30%" stopColor="#3B3584" />
                    <stop offset="85%" stopColor="#1E1B4B" />
                    <stop offset="100%" stopColor="#110E2E" />
                </linearGradient>

                {/* Bar Chart Gradients */}
                <linearGradient id="bar1Grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                <linearGradient id="bar2Grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#3730A3" />
                </linearGradient>
                <linearGradient id="bar3Grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#4C1D95" />
                </linearGradient>
            </defs>

            {/* Ground Ambient Shadow Ellipse */}
            <ellipse cx="220" cy="245" rx="165" ry="14" fill="#1E1B4B" fillOpacity="0.12" />

            {/* Decorative Splash / Sparkle Lines (Left of Checklist) */}
            <g opacity="0.55" fill="#7C3AED">
                <path d="M56 76C48 70 42 66 39 69C36 72 44 77 56 76Z" />
                <path d="M62 65C58 55 54 50 50 52C47 54 53 61 62 65Z" />
                {/* Splash Near Mug */}
                <path d="M138 178C130 166 125 162 121 165C118 168 126 175 138 178Z" />
                <path d="M126 184C115 180 109 179 108 183C107 187 116 188 126 184Z" />
                {/* Splash Right of Laptop */}
                <path d="M362 98C372 86 377 82 380 85C383 88 374 95 362 98Z" />
                <path d="M368 107C380 103 386 102 387 106C388 110 378 111 368 107Z" />
            </g>

            {/* 1. FLOATING CHECKLIST CARD (3D Tilted Left) */}
            <g className="floating-card-a" filter="url(#cardShadow)">
                <g transform="translate(88, 38) rotate(-11)">
                    {/* 3D Card Edge Thickness */}
                    <rect x="-3" y="4" width="128" height="114" rx="20" fill="#CBD5E1" />
                    {/* Card Main Surface */}
                    <rect x="0" y="0" width="128" height="114" rx="20" fill="#FFFFFF" />

                    {/* Row 1 */}
                    <circle cx="28" cy="29" r="10" fill="#22C55E" />
                    <path
                        d="M23 29.5L26.8 33L35.5 23.5"
                        stroke="#FFFFFF"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <rect x="47" y="25" width="58" height="7" rx="3.5" fill="#CBD5E1" />

                    {/* Row 2 */}
                    <circle cx="28" cy="57" r="10" fill="#22C55E" />
                    <path
                        d="M23 57.5L26.8 61L35.5 51.5"
                        stroke="#FFFFFF"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <rect x="47" y="53" width="58" height="7" rx="3.5" fill="#CBD5E1" />

                    {/* Row 3 */}
                    <circle cx="28" cy="85" r="10" fill="#22C55E" />
                    <path
                        d="M23 85.5L26.8 89L35.5 79.5"
                        stroke="#FFFFFF"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <rect x="47" y="81" width="58" height="7" rx="3.5" fill="#CBD5E1" />
                </g>
            </g>

            {/* 2. FLOATING BAR CHART CARD (3D Tilted Top-Right) */}
            <g className="floating-card-c" filter="url(#cardShadow)">
                <g transform="translate(262, 8) rotate(13)">
                    {/* 3D Card Thickness */}
                    <rect x="2" y="4" width="84" height="78" rx="18" fill="#CBD5E1" />
                    {/* Card Main Surface */}
                    <rect x="0" y="0" width="84" height="78" rx="18" fill="#FFFFFF" />

                    {/* 3 Ascending 3D Bars */}
                    <rect x="18" y="38" width="11" height="22" rx="4" fill="url(#bar1Grad)" />
                    <rect x="36" y="27" width="11" height="33" rx="4" fill="url(#bar2Grad)" />
                    <rect x="54" y="15" width="11" height="45" rx="4" fill="url(#bar3Grad)" />
                </g>
            </g>

            {/* 3. 3D PERSPECTIVE LAPTOP */}
            <g filter="url(#laptopShadow)">
                {/* Laptop Keyboard Base Deck (Left-extending 3/4 view) */}
                <path
                    d="M114 217L196 205L336 218L202 236L114 217Z"
                    fill="url(#laptopBaseGrad)"
                />
                {/* Dark Keyboard Inset Surface */}
                <path
                    d="M148 216L202 209L295 218L198 228L148 216Z"
                    fill="#1E1B4B"
                />
                {/* Laptop Base Front-Left Thickness Edge */}
                <path
                    d="M114 217L202 236L202 243L114 223V217Z"
                    fill="#475569"
                />
                {/* Laptop Base Right-Side Dark Chassis Rim */}
                <path
                    d="M202 236L336 218L334 226L202 243V236Z"
                    fill="#1E1B4B"
                />
                {/* Side Port Indicators */}
                <circle cx="176" cy="235" r="1.5" fill="#0F172A" />
                <rect x="183" y="234" width="6" height="2.5" rx="1" fill="#0F172A" />

                {/* Laptop Screen Lid 3D Bezel Highlight (Back Layer) */}
                <path
                    d="M222 103C224 96 230 91 238 91L362 96C370 96 375 102 373 110L342 220C340 225 335 228 329 228L196 226C190 226 186 220 188 214L222 103Z"
                    fill="#A5B4FC"
                />
                {/* Laptop Screen Lid Main 3D Surface */}
                <path
                    d="M225 105C227 98 233 93 241 93L364 98C371 98 376 104 374 112L343 221C341 226 336 229 330 229L199 227C193 227 189 221 191 215L225 105Z"
                    fill="url(#laptopLidGrad)"
                />

                {/* Paper-Plane Logo Centered on Laptop Lid */}
                <g transform="translate(263, 142) scale(0.95)">
                    <path
                        d="M38 2L2 19L15 24L38 2Z"
                        fill="#C7D2FE"
                    />
                    <path
                        d="M38 2L15 24V35L23 27L38 2Z"
                        fill="#6366F1"
                    />
                    <path
                        d="M38 2L23 27L33 32L38 2Z"
                        fill="#A5B4FC"
                    />
                </g>
            </g>

            {/* 4. 3D COFFEE MUG WITH WORKPILOT LOGO */}
            <g filter="url(#laptopShadow)">
                {/* Mug C-Handle */}
                <path
                    d="M72 198C56 198 54 228 72 228"
                    stroke="#312E81"
                    strokeWidth="7"
                    strokeLinecap="round"
                    fill="none"
                />
                <path
                    d="M72 200C59 200 58 225 72 225"
                    stroke="#6366F1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.6"
                />

                {/* Mug Cylindrical Body */}
                <path
                    d="M68 188H126V232C126 240 114 245 97 245C80 245 68 240 68 232V188Z"
                    fill="url(#mugBodyGrad)"
                />
                {/* Mug Specular Vertical Highlight */}
                <rect
                    x="74"
                    y="192"
                    width="6"
                    height="46"
                    rx="3"
                    fill="#FFFFFF"
                    fillOpacity="0.16"
                />
                {/* Mug Top Rim Ellipse */}
                <ellipse cx="97" cy="188" rx="29" ry="5.5" fill="#4338CA" />
                <ellipse cx="97" cy="188" rx="25" ry="3.8" fill="#1E1B4B" />

                {/* Paper-Plane Logo on Mug */}
                <g transform="translate(83, 203) scale(0.68)">
                    <path d="M36 2L2 18L14 23L36 2Z" fill="#C7D2FE" />
                    <path d="M36 2L14 23V33L22 25L36 2Z" fill="#6366F1" />
                    <path d="M36 2L22 25L31 30L36 2Z" fill="#A5B4FC" />
                </g>
            </g>
        </svg>
    </div>
);

//  ==========================================
//    3D ROCKET & VOLUMETRIC CLOUDS ILLUSTRATION
//    Matches image_e908c1.png
//    ========================================== 
export const RocketPromo3DIllustration = () => (
    <svg
        viewBox="0 0 220 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 bottom-0 w-48 sm:w-56 h-full pointer-events-none select-none overflow-visible"
    >
        <defs>
            {/* 3D Cloud Sphere Radial Gradient */}
            <radialGradient id="cloudSphereGrad" cx="35%" cy="28%" r="70%">
                <stop offset="0%" stopColor="#F5F3FF" />
                <stop offset="45%" stopColor="#C4B5FD" />
                <stop offset="85%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#4C1D95" />
            </radialGradient>

            <radialGradient id="cloudBackGrad" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#DDD6FE" />
                <stop offset="55%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B0764" />
            </radialGradient>

            {/* 3D Rocket Body Gradient */}
            <linearGradient id="rocketBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="55%" stopColor="#DDD6FE" />
                <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>

            {/* Rocket Fin & Nose Cone Gradient */}
            <linearGradient id="rocketFinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#3730A3" />
            </linearGradient>

            {/* Rocket Flame Glow */}
            <linearGradient id="rocketFlameGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="45%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
            </linearGradient>

            <filter id="rocketGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#090A1A" floodOpacity="0.45" />
            </filter>
        </defs>

        {/* Sparkle 4-Point Stars */}
        <g fill="#FBBF24">
            <path
                className="animate-pulse"
                d="M118 32L120 37L125 39L120 41L118 46L116 41L111 39L116 37L118 32Z"
            />
            <path
                d="M196 86L197.5 90L201.5 91.5L197.5 93L196 97L194.5 93L190.5 91.5L194.5 90L196 86Z"
                opacity="0.85"
            />
            <path
                className="animate-pulse"
                d="M148 118L149.5 122L153.5 123.5L149.5 125L148 129L146.5 125L142.5 123.5L146.5 122L148 118Z"
                opacity="0.75"
            />
            <circle cx="188" cy="70" r="1.5" fill="#FDE68A" opacity="0.6" />
        </g>

        {/* Outer <g> handles vertical float; Inner <g> sets position & 36deg tilt */}
        <g className="floating-card-c" filter="url(#rocketGlow)">
            <g transform="translate(158, 62) rotate(36)">
                {/* Nozzle-Anchored Thruster Flames (Origin at 0, 32) */}
                <g transform="translate(0, 32)">
                    {/* Ambient Orange Exhaust Glow */}
                    <circle
                        cx="0"
                        cy="10"
                        r="12"
                        fill="#F97316"
                        opacity="0.35"
                        className="rocket-flame-outer"
                    />
                    {/* Outer Flickering Plume */}
                    <path
                        className="rocket-flame-outer"
                        d="M-11 0C-11 0 -14 22 0 36C14 22 11 0 11 0H-11Z"
                        fill="url(#rocketFlameGrad)"
                    />
                    {/* Inner High-Speed Core Flame */}
                    <path
                        className="rocket-flame-inner"
                        d="M-6 0C-6 0 -8 14 0 24C8 14 6 0 6 0H-6Z"
                        fill="#FEF08A"
                    />
                </g>

                {/* Left & Right 3D Fins */}
                <path
                    d="M-16 10C-28 16 -30 30 -26 38C-19 33 -14 28 -12 26L-16 10Z"
                    fill="url(#rocketFinGrad)"
                />
                <path
                    d="M16 10C28 16 30 30 26 38C19 33 14 28 12 26L16 10Z"
                    fill="url(#rocketFinGrad)"
                />

                {/* Main Fuselage Body */}
                <path
                    d="M0 -42C16 -24 20 4 14 30H-14C-20 4 -16 -24 0 -42Z"
                    fill="url(#rocketBodyGrad)"
                />

                {/* Nose Cone Cap */}
                <path
                    d="M0 -42C8 -33 13 -22 15 -14C5 -17 -5 -17 -15 -14C-13 -22 -8 -33 0 -42Z"
                    fill="url(#rocketFinGrad)"
                />

                {/* Porthole Window Ring & Glass */}
                <circle cx="0" cy="-2" r="9.5" fill="#4F46E5" />
                <circle cx="0" cy="-2" r="6" fill="#E0E7FF" />
                <circle cx="-2" cy="-4" r="2" fill="#FFFFFF" />

                {/* Center Dorsal Fin */}
                <rect x="-3" y="14" width="6" height="20" rx="3" fill="#6366F1" />
            </g>
        </g>

        {/* 3D VOLUMETRIC PUFFY CLOUDS (Bottom-Right Corner) */}
        <g filter="url(#rocketGlow)">
            {/* Back Cloud Layer */}
            <circle cx="195" cy="148" r="34" fill="url(#cloudBackGrad)" />
            <circle cx="152" cy="168" r="28" fill="url(#cloudBackGrad)" />
            <circle cx="114" cy="192" r="24" fill="url(#cloudBackGrad)" />

            {/* Front 3D Cloud Spheres */}
            <circle cx="212" cy="168" r="36" fill="url(#cloudSphereGrad)" />
            <circle cx="172" cy="176" r="32" fill="url(#cloudSphereGrad)" />
            <circle cx="136" cy="190" r="26" fill="url(#cloudSphereGrad)" />
            <circle cx="196" cy="196" r="28" fill="url(#cloudSphereGrad)" />
        </g>
    </svg>
);