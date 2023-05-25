import { Balance } from "../../Interfaces/DashBoardInterface/DashBoardInterface";
import { IDataService } from "../../Interfaces/DataServiceRequisition/DataServiceRequisition";

export class DashBoardController {

    private _firestoreService: IDataService<Balance>;
    private _route: string;
    private _userUid: string;

    constructor(firestoreService: IDataService<Balance>, route: string, userUid: string) {
        this._firestoreService = firestoreService;
        this._route = route;
        this._userUid = userUid
    }

    public async getDataBalance(): Promise<Balance[]> {
        try {
            const fetchedData: Balance[] = await this._firestoreService.getData({ route: this._route, userUid: this._userUid })

            return fetchedData
        } catch(err) {
            throw err
        }
        
    }

    public async setBalance(value: number): Promise<void> {
        try {
            const fetchedData = await this._firestoreService.createData({ route: this._route, userUid: this._userUid, value})
        } catch(err) {
            throw err
        }
    }
}