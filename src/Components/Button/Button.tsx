import { ButtonProps } from "../../Interfaces/ComponentsInterface/ButtonInterface/ButtonInterface";

export const Button = ({ text, className, disabled }: ButtonProps) => {
    return <button className={className} disabled={disabled}>{text}</button>
};