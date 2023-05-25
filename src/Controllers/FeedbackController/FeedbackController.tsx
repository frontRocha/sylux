import { FieldValues } from "react-hook-form"
import { IDataService } from "../../Interfaces/DataServiceRequisition/DataServiceRequisition";

export class FeedbackController {

    private _firestoreService: IDataService<void>;
    private _route: string;
    private _userUid: string;

    constructor(firestoreService: IDataService<void>, route: string, userUid: string) {
        this._firestoreService = firestoreService;
        this._route = route;
        this._userUid = userUid
    }

    public async setData(description: string): Promise<void> {
        try {
            await this._firestoreService.createData({ route: this._route, userUid: this._userUid, description })
        } catch (err) {
            throw err
        }
    }

    public validate(e: FieldValues): string {
        try {
            const result: string = runValidate(e.description)

            return result
        } catch (err) {
            throw err
        }
    }
}

const runValidate = (description: string): string => {
    if (description.length < 4) {
        throw new Error('Digite algo válido')
    }

    return description
}