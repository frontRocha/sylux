import { Props } from "../../Interfaces/ComponentsInterface/LabelInterface/LabelInterface";

export function Label({ text, className, htmlFor }: Props) {
    return <label className={className} htmlFor={htmlFor}>{text}</label>
};