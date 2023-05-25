import { FieldValues } from "react-hook-form";

export class HandleDataForm {
    public async validateValue(value: FieldValues): Promise<number> {
        try {
            const validate: number = validateValue(value.valor)

            return validate
        } catch (err) {
            throw err
        }
    }
}

const validateValue = (value: string): number => {
    if (!value.length) {
        throw new Error('Insira um valor')
    }

    return parseFloat(value)
}