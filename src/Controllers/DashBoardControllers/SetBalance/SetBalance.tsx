import { FieldValues } from "react-hook-form";

export class HandleDataForm {
    public async getDataBalance(value: FieldValues): Promise<number> {
        const validate: number = validateForm(value.valor)

        return validate
    }
}

const validateForm = (value: string): number => {
    if (!value.length) {
        throw new Error('Insira um valor')
    }

    return parseFloat(value)
}