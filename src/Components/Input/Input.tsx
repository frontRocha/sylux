import { useFormContext } from "react-hook-form";

import { InputProps } from "../../Interfaces/ComponentsInterface/InputInterface/InputInterface";

export function Input({ name, type, className, value, placeholder }: InputProps) {
    const { register } = useFormContext(); 

    return <input placeholder={placeholder} type={type} {...register(name)} className={className} value={value}/>;
}