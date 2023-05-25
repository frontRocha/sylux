export class EditBalanceController {
    public async validateData(value: number): Promise<number> {
        try {
            const runValidate = validateData(value)

            return runValidate
        } catch(err) {
            throw err
        }
    }
}

const validateData = (value: number) => {
    if (!value) {
        throw new Error('Adicione um valor')
    }

    return value
}