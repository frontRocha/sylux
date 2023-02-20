import { FieldValues } from "react-hook-form";

import { ComponentCrudService } from "../../../Services/DashboardServices/ComponentsCrudService/ComponentsCrudService";
import { Items, ValuesData } from "../../../Interfaces/DashBoardInterface/ComponentsCrudInterface/ComponentsCrudInterface";

export class ComponentCrudController {
    public async getData(uid: string, type: string): Promise<Items[]> {
        const result: Items[] = await new ComponentCrudService().get(uid, type)

        return result
    }

    public async handleData(values: FieldValues, uid: string): Promise<void> {
        const validate: boolean | Error = await this.validateData(values)

        if(validate) {
            const result: void = await new ComponentCrudService().set(values, uid)
        
            return result
        }
    }

    public async deleteData(id: string): Promise<void> {
        const result: void = await new ComponentCrudService().delete(id)    

        return result
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