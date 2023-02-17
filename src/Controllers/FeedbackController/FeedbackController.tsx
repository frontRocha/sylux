import { FieldValues } from "react-hook-form"
import { FeedbackService } from "../../Services/FeedbackService/FeedbackService"

export class FeedbackController {
    public async handleData(description: string): Promise<void> {
        const result: void = await new FeedbackService().set(description)

        return result
    }

    public validate(e: FieldValues): string | undefined {
        const result: string | undefined = runValidate(e.description)

        if(result) {
            return result
        }
    }
}

const runValidate = (description: string): string => {
    if(description.length < 4) {
        throw new Error('Digite algo válido')
    }

    return description
}