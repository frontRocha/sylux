export class HandleDataPostIt {
    public async validateTitle(title: string): Promise<string> {
        try {
            const runValidate: void = validateForm(title)

            return title
        } catch(err) {
            throw err
        }
    }
}

const validateForm = (title: string): void => {
    if (!title.length) {
        throw new Error('Insira um titulo')
    }
}