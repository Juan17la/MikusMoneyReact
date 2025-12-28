type RedirectionButtonProps = {
    buttonName: string;
    buttonLink: string;
    buttonColor: "primary" | "secondary";
    className?: string;
};

export function RedirectionButton({ buttonName, buttonLink, buttonColor, className: additionalClassName }: RedirectionButtonProps) {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xs font-bold transition-all duration-200 focus:outline-3 focus:outline-accent-20 focus:outline-offset-2"

    const variants: Record<string, string> = {
        primary: "bg-linear-to-b from-accent-weak/40 to-accent/60 shadow-button-accent text-contrast",
        secondary: "bg-transparent border border-dark-border hover:bg-accent-10",
        disabled: "bg-gray-100 text-gray-500 cursor-not-allowed opacity-70"
    };

    const className = `${baseStyles} ${additionalClassName ?? ''} ${variants[buttonColor] ?? variants.disabled}`;

    if (!buttonLink) {
        return <span className={className} aria-disabled>{buttonName}</span>;
    }

    return <a className={className} href={buttonLink}>{buttonName}</a>;
}