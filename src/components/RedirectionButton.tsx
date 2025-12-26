type RedirectionButtonProps = {
    buttonName: string;
    buttonLink: string;
    buttonColor: "primary" | "secondary";
    className?: string;
};

export function RedirectionButton({ buttonName, buttonLink, buttonColor, className = "" }: RedirectionButtonProps) {
    const base = `block w-full text-center font-semibold py-3 rounded-lg ${className}`.trim();

    if (buttonColor === "primary") {
        return <a className={`${base} skeu-button accent`} href={buttonLink}>{buttonName}</a>;
    } else if (buttonColor === "secondary") {
        return <a className={`${base} skeu-button`} href={buttonLink}>{buttonName}</a>;
    } else {
        return <a className={`${base} skeu-button`} href="" aria-disabled>{buttonName}</a>;
    }
}