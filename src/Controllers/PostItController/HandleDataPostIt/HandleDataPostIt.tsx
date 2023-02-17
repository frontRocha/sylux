import { FieldValues } from "react-hook-form"

export class HandleDataPostIt {
    public async getDataBalance(value: FieldValues): Promise<string> {
        const validate: string = validateForm(value.title)

        return validate
    }
}

const validateForm = (value: string): string => {
    if (!value.length) {
        throw new Error('Insira um titulo')
    }

    return value
}