function BaseBtn({ btnType = '', text, className = '', iconHover = '', icon = '', position = '', ...props }) {
    return (
        <button
            {...props}
            className={`inline-flex items-center justify-center gap-2 ${position === "right" ? "flex-row-reverse" : "flex-row"
                } ${btnType} group active:scale-95 transition-all duration-300 ${className}`.trim()}
        >
            {icon && (
                <span className={`inline-flex transition-all duration-500 ${iconHover}`}>
                    {icon}
                </span>
            )}
            <span>{text}</span>
        </button>
    )
}

export const PrimaryBtn = (prop) => <BaseBtn btnType="btn-primary" {...prop} />

export const SecondaryBtn = (prop) => <BaseBtn btnType='btn-secondary' {...prop} />

export const GhostBtn = (prop) => <BaseBtn btnType="btn-ghost" {...prop} />