import { FieldValues } from "react-hook-form";

import { Items, ValuesData } from "../../../Interfaces/DashBoardInterface/ComponentsCrudInterface/ComponentsCrudInterface";
import { IDataService } from "../../../Interfaces/DataServiceRequisition/DataServiceRequisition";

export class ComponentCrudController {
    private _firestoreService: IDataService<Items>;
    private _route: string;
    private _userUid: string;

    constructor(firestoreService: IDataService<Items>, route: string, userUid: string) {
        this._firestoreService = firestoreService;
        this._route = route;
        this._userUid = userUid;
    }

    async getData(): Promise<Items[]> {
        try {
            const fetchedData = await this._firestoreService.getData({ route: this._route, userUid: this._userUid });

            return fetchedData;
        } catch(err) {
            throw err
        }
    }

    async deleteData(id: string): Promise<void> {
        try {
            const fetchedData = await this._firestoreService.deleteData({ route: this._route, userUid: this._userUid, id })
        } catch(err) {
            throw err
        }
        
    }

    async createData(values: FieldValues): Promise<void> {
        try {
            const value = parseFloat(values.value)
            const fetchedData = await this._firestoreService.createData({ route: this._route, userUid: this._userUid, endDate: values.endDate, name: values.name, startDate: values.startDate, type: values.type, value: value })
        } catch(err) {
            throw err
        }
    }

    public validateData = async (values: ValuesData | FieldValues): Promise<boolean | Error> => {
        if (!values.name) {
            throw new Error("Nome é obrigatório");
        }
    
        if (!values.value) {
            throw new Error("Valor é obrigatório");
        }
    
        if (!values.startDate) {
            throw new Error("Data de início é obrigatória");
        }
    
        if (!values.endDate) {
            throw new Error("Data final é obrigatória");
        }
    
        if (!values.type) {
            throw new Error("Tipo é obrigatório");
        }
    
        return true;
    };
}