import { PostItItens } from "../../Interfaces/PostItInterface/PostItInterface"
import { IDataService } from "../../Interfaces/DataServiceRequisition/DataServiceRequisition";

export class PostItController {
    private _firestoreService: IDataService<PostItItens>;
    private _route: string;
    private _userUid: string;

    constructor(firestoreService: IDataService<PostItItens>, route: string, userUid: string) {
        this._firestoreService = firestoreService;
        this._route = route;
        this._userUid = userUid;
    }

    async getData(): Promise<PostItItens[]> {
        try {
            const fetchedData = await this._firestoreService.getData({ route: this._route, userUid: this._userUid });

            return fetchedData;
        } catch (err) {
            throw err
        }
    }

    async deleteData(id: string): Promise<void> {
        try {
            const fetchedData = await this._firestoreService.deleteData({ route: this._route, userUid: this._userUid, id })
        } catch (err) {
            throw err
        }
    }

    async createData(title: string): Promise<void> {
        try {
            const fetchedData = await this._firestoreService.createData({ route: this._route, userUid: this._userUid, title })
        } catch (err) {
            throw err
        }
    }
}