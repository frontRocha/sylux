import { Balance } from "../../../Interfaces/DashBoardInterface/DashBoardInterface";
import { Type } from "../../../Interfaces/DashBoardInterface/ComponentsCrudInterface/ComponentsCrudInterface";
import { ValuesService } from "../../../Services/Values/Values"

export class ValuesController {
    public async handleValues(uid: string): Promise<Balance[]> {
        const result: Balance[] = await new ValuesService().getBalance(uid)

        return result
    }

    public async handleTypesValues(uid: string) {
        const result: Type = await new ValuesService().getTypeValues(uid);


        return result
    }

    public async editBalance(value: string, id: string): Promise<void> {
        const convert: number = parseFloat(value)

        const result: void = await new ValuesService().editBalance(convert, id)

        return result
    }
}