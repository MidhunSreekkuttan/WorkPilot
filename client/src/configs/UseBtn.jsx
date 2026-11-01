export const PrimaryBtn = ({ text, className, iconHover, icon, position, ...prop }) => {
    return (
        <button
            {...prop}
            className={`btn-primary group active:scale-95 transition-all duration-300 ${className}`}
        >
            {position === 'left' &&
                <div className="flex items-center gap-2">
                    <span className={`group-hover:${iconHover} transition-all duration-300`}>{icon}</span>
                    {text}
                </div>
            }

            {position === 'right' &&
                <div className="flex items-center gap-2">
                    {text}
                    <span className={`group-hover:${iconHover} transition-all duration-300`}>{icon}</span>
                </div>
            }

        </button>
    )
}

export const SecondaryBtn = ({ text, className, iconHover, icon, position, ...prop }) => {
    return (
        <button
            {...prop}
            className={`btn-secondary active:scale-95 transition-all duration-300 ${className}`}
        >
            {position === 'left' &&
                <div className="flex items-center gap-2 group">
                    <span className={`group-hover:${iconHover} transition-all duration-300`}>{icon}</span>
                    {text}
                </div>
            }

            {position === 'right' &&
                <div className="flex items-center gap-2 group">
                    {text}
                    <span className={`group-hover:${iconHover} transition-all duration-300`}>{icon}</span>
                </div>
            }

        </button>
    )
}