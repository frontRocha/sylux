export class EditBalanceController {
    public async handleValueBalance(value: number): Promise<number> {
        return this.validateBalance(value)
    }

    public validateBalance(value: number): number {
        if (!value) {
            throw new Error('Adicione um valor')
        }

        return value
    }
}