import { Balance } from "../../../Interfaces/DashBoardInterface/DashBoardInterface";
import { Type } from "../../../Interfaces/DashBoardInterface/ComponentsCrudInterface/ComponentsCrudInterface";
import { DataServiceRequisition } from "../../../Services/DataServiceRegistration/DataServiceRequisition";
import { IDataService } from "../../../Interfaces/DataServiceRequisition/DataServiceRequisition";

export class ValuesController {

    private _firestoreService: IDataService<Balance>;
    private _route: string;
    private _userUid: string;

    constructor(firestoreService: IDataService<Balance>, route: string, userUid: string) {
        this._firestoreService = firestoreService;
        this._route = route;
        this._userUid = userUid
    }

    public async getDataOpeningBalance(): Promise<Balance[]> {
        try {
            const fetchedData: Balance[] = await this._firestoreService.getData({ route: this._route, userUid: this._userUid })

            return fetchedData
        } catch(err) {
            throw err
        }
    }

    public async editBalance(balance: string, id: string): Promise<void> {
        try {
            const value: number = parseFloat(balance)
            const fetchedData = await this._firestoreService.editData({ route: this._route, userUid: this._userUid, value, id })

            return fetchedData
        } catch(err) {
            throw err
        }
    }
}