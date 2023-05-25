import { Type } from "../../Interfaces/DashBoardInterface/ComponentsCrudInterface/ComponentsCrudInterface";
import { ValuesService } from "../../Services/ValuesService/ValuesService";

export class TypeValuesController {

    private _userUid: string;

    constructor(userUid: string) {
        this._userUid = userUid
    }

    public async handleTypesValues(): Promise<Type> {
        try {
            const fetchedData: Type = await new ValuesService().getTypeValues(this._userUid)

            return fetchedData
        } catch(err) {
            throw err
        }
    }
}