import { useState } from "react";
import {
    FaArrowRight,
    FaBolt,
    FaCheck,
    FaCheckCircle,
    FaChartLine,
    FaEnvelope,
    FaEye,
    FaEyeSlash,
    FaGithub,
    FaLock,
    FaRegCircle,
    FaUser,
} from "react-icons/fa";
import { PrimaryBtn, SecondaryBtn } from "../configs/UseBtn";
import useForm from "../coustom-hooks/UseForm";

const avatars = [
    { initials: "SJ", gradient: "from-indigo-500 to-purple-600" },
    { initials: "MC", gradient: "from-emerald-500 to-teal-700" },
    { initials: "EV", gradient: "from-sky-500 to-blue-700" },
];

const valueHighlights = [
    {
        title: "Full Kanban & Sprint Velocity tracking",
        description:
            "Real-time cycle time benchmarks and automated work-in-progress caps.",
    },
    {
        title: "Automated code telemetry & PR links",
        description:
            "Bi-directional GitHub/GitLab integration tracking commit deltas & review lag.",
    },
    {
        title: "Role-based governance & SAML SSO",
        description:
            "Granular multi-tenant workspaces, SCIM provisioning, and audit logs.",
    },
    {
        title: "14-day free trial, no credit card required",
        description:
            "Instant production sandbox provisioned in under 45 seconds.",
    },
];

const GoogleIcon = () => (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
        />
    </svg>
);

const Login = () => {

    const { values, handleChange } = useForm({
        fullName: "",
        email: "",
        password: "",
        terms: false,
        telemetryUpdates: true,
    })

    const [showPassword, setShowPassword] = useState(false);
    const [state, setState] = useState('login')

    // Password validation & strength calculation
    const password = values.password;
    const hasLength = password.length >= 8;
    const hasCase = /[A-Z]/.test(password) && /[a-z]/.test(password);
    const hasSymbolOrNum =
        /[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password);

    let score = 0;
    if (password.length > 0) score = 1;
    if (hasLength) score++;
    if (hasCase && hasLength) score++;
    if (hasSymbolOrNum && hasCase && hasLength) score = 4;

    const strengthMeta = {
        0: {
            label: "Strength: Minimum",
            textClass: "text-text-muted",
            barClass: "bg-outline-variant/40",
        },
        1: {
            label: "Strength: Weak",
            textClass: "text-error",
            barClass: "bg-error",
        },
        2: {
            label: "Strength: Fair",
            textClass: "text-brand-orange",
            barClass: "bg-brand-orange",
        },
        3: {
            label: "Strength: Good",
            textClass: "text-brand-cyan",
            barClass: "bg-brand-cyan",
        },
        4: {
            label: "Strength: Enterprise Grade",
            textClass: "text-brand-emerald font-bold",
            barClass: "bg-brand-emerald",
        },
    }[score];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration submission here
    };

    return (
        <div className="relative min-h-screen lg:h-screen lg:overflow-hidden surface-level-0 text-text-main flex flex-col selection:bg-brand-orange selection:text-white">
            <main className="relative z-10 flex-1 flex w-full h-full">
                <div className="relative w-full h-full bg-panel overflow-hidden">
                    {/* Ambient Top Specular Light Rim */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent pointer-events-none z-20" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen lg:h-full">
                        {/* Left Column: High-Velocity Showcase & Telemetry Panel (5 cols) */}
                        <div className="lg:col-span-5 bg-card/70 dark:bg-surface-container relative p-6 sm:p-8 lg:px-10 lg:py-8 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-outline-variant/50">
                            {/* Background Atmospheric Glows */}
                            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-brand-orange/15 blur-[90px] pointer-events-none" />
                            <div className="absolute bottom-10 right-0 w-64 h-64 rounded-full bg-brand-cyan/10 blur-[80px] pointer-events-none" />

                            {/* Top Telemetry Header & Value Statement */}
                            <div className="relative z-10 flex flex-col gap-4">
                                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-panel/80 border border-outline-variant/60 shadow-level-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
                                    <span className="text-label-caps text-brand-orange tracking-widest">
                                        KINETIC HORIZON OS v4.2
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h1 className="text-headline-lg text-text-main tracking-tight">
                                        Empower your engineering &amp; product teams to ship with
                                        zero drift.
                                    </h1>
                                    <p className="text-body-md text-text-muted">
                                        Unify sprint orchestration, Git telemetry, and continuous
                                        delivery pipeline intelligence in one unified tactical
                                        surface.
                                    </p>
                                </div>

                                {/* Value Highlights Strip */}
                                <div className="flex flex-col gap-3 pt-1">
                                    {valueHighlights.map((item) => (
                                        <div
                                            key={item.title}
                                            className="flex items-start gap-3 group"
                                        >
                                            <div className="w-5 h-5 rounded-md bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center shrink-0 mt-0.5 text-brand-orange">
                                                <FaCheck className="text-[10px]" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-title-md text-text-main">
                                                    {item.title}
                                                </span>
                                                <span className="text-body-sm text-text-muted">
                                                    {item.description}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Visual Richness: Mini Telemetry Card + Social Proof */}
                            <div className="relative z-10 flex flex-col gap-5 pt-6">
                                {/* Dynamic Mini Telemetry Widget */}
                                <div className="glass-kinetic rounded-xl p-4 relative overflow-hidden">
                                    <div className="flex items-center justify-between pb-1">
                                        <div className="flex items-center gap-2">
                                            <FaChartLine className="text-brand-cyan text-sm" />
                                            <span className="text-label-md font-semibold text-text-main">
                                                Live Team Velocity Index
                                            </span>
                                        </div>
                                        <span className="badge-completed text-label-caps px-2 py-0.5 rounded">
                                            +28.4% WoW
                                        </span>
                                    </div>

                                    {/* Mini SVG Sparkline Chart */}
                                    <div className="w-full h-10 mt-1 flex items-end">
                                        <svg
                                            className="w-full h-full overflow-visible"
                                            fill="none"
                                            preserveAspectRatio="none"
                                            viewBox="0 0 300 40"
                                        >
                                            <path
                                                d="M0,35 Q30,30 60,25 T120,28 T180,12 T240,16 T300,4"
                                                fill="none"
                                                stroke="#ff6a00"
                                                strokeLinecap="round"
                                                strokeWidth="2.5"
                                            />
                                            <path
                                                d="M0,35 Q30,30 60,25 T120,28 T180,12 T240,16 T300,4 L300,40 L0,40 Z"
                                                fill="url(#velocityGlow)"
                                                opacity="0.2"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="velocityGlow"
                                                    x1="0"
                                                    x2="0"
                                                    y1="0"
                                                    y2="1"
                                                >
                                                    <stop offset="0%" stopColor="#ff6a00" />
                                                    <stop offset="100%" stopColor="transparent" />
                                                </linearGradient>
                                            </defs>
                                            <circle
                                                className="animate-pulse"
                                                cx="300"
                                                cy="4"
                                                fill="#ff6a00"
                                                r="3.5"
                                            />
                                        </svg>
                                    </div>

                                    <div className="flex items-center justify-between text-text-muted text-body-sm pt-2 border-t border-outline-variant/40 mt-2">
                                        <span>
                                            Cycle Time:{" "}
                                            <strong className="text-text-main font-semibold">
                                                1.4 days
                                            </strong>
                                        </span>
                                        <span>
                                            PR Merge Rate:{" "}
                                            <strong className="text-text-main font-semibold">
                                                94.8%
                                            </strong>
                                        </span>
                                    </div>
                                </div>

                                {/* Social Proof Bar */}
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {avatars.map((avatar) => (
                                            <div
                                                key={avatar.initials}
                                                className={`inline-flex h-8 w-8 rounded-full ring-2 ring-panel bg-gradient-to-br ${avatar.gradient} text-white font-bold text-[11px] items-center justify-center border border-white/20`}
                                            >
                                                {avatar.initials}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1 text-amber-400 text-xs leading-none">
                                            <span>★</span>
                                            <span>★</span>
                                            <span>★</span>
                                            <span>★</span>
                                            <span>★</span>
                                        </div>
                                        <span className="text-label-md text-text-muted mt-0.5">
                                            Joined by 10,000+ teams shipping faster
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Registration Form Panel (7 cols) */}
                        <div className="lg:col-span-7 bg-panel p-6 sm:p-8 lg:px-12 lg:py-8 flex flex-col justify-center overflow-y-auto">
                            <div className="w-full flex flex-col gap-4">
                                {/* Form Title & Subtitle */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-label-caps text-brand-orange tracking-wider">
                                            Fast-Track Onboarding
                                        </span>
                                        <span className="badge-completed text-label-md flex items-center gap-1.5 px-2.5 py-0.5 rounded-full">
                                            <FaBolt className="text-[11px]" /> No credit card
                                        </span>
                                    </div>
                                    <h2 className="text-headline-lg text-text-main tracking-tight">
                                        {state === 'login' ? (
                                            <p>Sign In to WorkPilot</p>
                                        ) : (
                                            <p>Create your WorkPilot account</p>
                                        )}
                                    </h2>
                                    <p className="text-body-md text-text-muted">
                                        {state === 'login' ? (
                                            <span>Enter your corporate credentials to resume control plane telemetry.</span>
                                        ) : (
                                            <span>Deploy your first cluster workspace in seconds.</span>
                                        )}
                                    </p>
                                </div>

                                {/* Single Sign-On Providers */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <SecondaryBtn
                                        type="button"
                                        text="Sign up with Google"
                                        className="w-full py-2.5 text-label-lg"
                                        icon={<GoogleIcon />}
                                        iconHover="scale-110"
                                        position="left"
                                    />
                                    <SecondaryBtn
                                        type="button"
                                        text="Sign up with GitHub"
                                        className="w-full py-2.5 text-label-lg"
                                        icon={<FaGithub className="w-4 h-4" />}
                                        iconHover="scale-110"
                                        position="left"
                                    />
                                </div>

                                {/* Crisp Divider */}
                                <div className="relative flex items-center py-0.5">
                                    <div className="flex-grow h-[1px] bg-outline-variant/60" />
                                    <span className="flex-shrink mx-3 text-label-md text-text-muted uppercase tracking-wider">
                                        {state === 'login' ? (
                                            <p>or continue with work email</p>
                                        ) : (
                                            <p>or register with work email</p>
                                        )}
                                    </span>
                                    <div className="flex-grow h-[1px] bg-outline-variant/60" />
                                </div>

                                {/* Registration Form Inputs */}
                                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                                    {/* Full Name */}
                                    {state === 'signUp' &&
                                        <div className="flex flex-col gap-1.5">
                                            <label
                                                htmlFor="full-name"
                                                className="text-label-md text-text-main font-medium flex items-center justify-between"
                                            >
                                                <span>
                                                    Full Name <span className="text-brand-orange">*</span>
                                                </span>
                                            </label>
                                            <div className="relative">
                                                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm pointer-events-none" />
                                                <input
                                                    id="full-name"
                                                    name="fullName"
                                                    type="text"
                                                    required
                                                    value={values.fullName}
                                                    onChange={handleChange}
                                                    placeholder="Sarah Jenkins"
                                                    className="input-kinetic pl-10"
                                                />
                                            </div>
                                        </div>
                                    }

                                    {/* Work Email Field */}
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="work-email"
                                            className="text-label-md text-text-main font-medium flex items-center justify-between"
                                        >
                                            <span>
                                                Work Email <span className="text-brand-orange">*</span>
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm pointer-events-none" />
                                            <input
                                                id="work-email"
                                                name="email"
                                                type="email"
                                                required
                                                value={values.email}
                                                onChange={handleChange}
                                                placeholder="name@company.com"
                                                className="input-kinetic pl-10"
                                            />
                                        </div>
                                    </div>

                                    {/* Password Input with Toggle & Strength Visualizer */}
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-between">
                                            <label
                                                htmlFor="password"
                                                className="flex gap-0.5 text-label-md text-text-main font-medium"
                                            >
                                                {state === 'login' ? (
                                                    <p>Enter Password</p>
                                                ) : (
                                                    <p>Create Password</p>
                                                )}
                                                <span className="text-brand-orange">*</span>
                                            </label>
                                            {state === 'signUp' &&
                                                <span
                                                    className={`text-label-caps uppercase ${strengthMeta.textClass}`}
                                                >
                                                    {strengthMeta.label}
                                                </span>
                                            }
                                        </div>

                                        <div className="relative">
                                            <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm pointer-events-none" />
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                required
                                                value={values.password}
                                                onChange={handleChange}
                                                placeholder="••••••••••••"
                                                className="input-kinetic pl-10 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label="Toggle password visibility"
                                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors cursor-pointer"
                                            >
                                                {showPassword ? (
                                                    <FaEyeSlash className="text-base" />
                                                ) : (
                                                    <FaEye className="text-base" />
                                                )}
                                            </button>
                                        </div>

                                        {/* 4-Segment Password Strength Meter */}
                                        {state === 'signUp' &&
                                            <div className="grid grid-cols-4 gap-1.5 pt-1">
                                                {[0, 1, 2, 3].map((index) => (
                                                    <div
                                                        key={index}
                                                        className={`h-1 rounded-full transition-colors duration-300 ${index < score
                                                            ? strengthMeta.barClass
                                                            : "bg-outline-variant/40"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        }

                                        {/* Dynamic Micro Requirements Checklist */}
                                        {state === 'signUp' &&
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-body-sm">
                                                <div
                                                    className={`flex items-center gap-1.5 ${hasLength ? "text-brand-emerald" : "text-text-muted"
                                                        }`}
                                                >
                                                    {hasLength ? (
                                                        <FaCheckCircle className="text-xs shrink-0 text-brand-emerald" />
                                                    ) : (
                                                        <FaRegCircle className="text-xs shrink-0 opacity-60" />
                                                    )}
                                                    <span>8+ characters</span>
                                                </div>

                                                <div
                                                    className={`flex items-center gap-1.5 ${hasCase ? "text-brand-emerald" : "text-text-muted"
                                                        }`}
                                                >
                                                    {hasCase ? (
                                                        <FaCheckCircle className="text-xs shrink-0 text-brand-emerald" />
                                                    ) : (
                                                        <FaRegCircle className="text-xs shrink-0 opacity-60" />
                                                    )}
                                                    <span>Uppercase letter</span>
                                                </div>

                                                <div
                                                    className={`flex items-center gap-1.5 ${hasSymbolOrNum
                                                        ? "text-brand-emerald"
                                                        : "text-text-muted"
                                                        }`}
                                                >
                                                    {hasSymbolOrNum ? (
                                                        <FaCheckCircle className="text-xs shrink-0 text-brand-emerald" />
                                                    ) : (
                                                        <FaRegCircle className="text-xs shrink-0 opacity-60" />
                                                    )}
                                                    <span>Number / Symbol</span>
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    {/* Agreement Checkboxes */}
                                    {state === 'signUp' &&
                                        <div className="flex flex-col gap-2 pt-0.5">
                                            <label className="flex items-start gap-2.5 cursor-pointer select-none group">
                                                <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                                                    <input
                                                        type="checkbox"
                                                        name="terms"
                                                        required
                                                        checked={values.terms}
                                                        onChange={handleChange}
                                                        className="peer checkbox-kinetic"
                                                    />
                                                    <FaCheck className="absolute text-[10px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                                </div>
                                                <span className="text-body-sm text-text-muted group-hover:text-text-main transition-colors">
                                                    I agree to WorkPilot&apos;s{" "}
                                                    <a
                                                        href="#terms"
                                                        className="text-brand-orange hover:underline font-medium"
                                                    >
                                                        Terms of Service
                                                    </a>{" "}
                                                    and{" "}
                                                    <a
                                                        href="#privacy"
                                                        className="text-brand-orange hover:underline font-medium"
                                                    >
                                                        Privacy Policy
                                                    </a>
                                                    .
                                                </span>
                                            </label>
                                        </div>
                                    }

                                    {/* Primary Submit Action CTA Button */}
                                    <div className="pt-1">
                                        <PrimaryBtn
                                            type="submit"
                                            text={state === 'login' ? "Login to Workspace Account" : "Create Workspace Account"}
                                            className="w-full h-11 text-base"
                                            icon={<FaArrowRight />}
                                            iconHover="translate-x-5 group-hover:translate-x-20"
                                            position="right"
                                        />
                                    </div>
                                </form>

                                {/* Switcher to Login */}
                                <div className="flex justify-center text-center">
                                    <span className="text-body-md text-text-muted">
                                        {state === 'login' ? (
                                            <p>You Don't have an account!</p>
                                        ) : (
                                            <p>Already have a WorkPilot account?</p>
                                        )}
                                    </span>
                                    <button className="cursor-pointer text-label-lg text-brand-orange hover:underline ml-1.5 
                                        font-semibold transition-colors"
                                    >
                                        {state === 'login' ? (
                                            <p onClick={() => setState('signUp')}>Sign Up</p>
                                        ) : (
                                            <p onClick={() => setState('login')}>Log in</p>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;