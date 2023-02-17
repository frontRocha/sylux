import { Balance } from "../../Interfaces/DashBoardInterface/DashBoardInterface";
import { DashboardService } from "../../Services/DashboardServices/DashboardService";

export class DashBoardController {
    public async getDataBalance(uid: string): Promise<Balance[]> {
        const result: Balance[] = await new DashboardService().get(uid)

        return result
    }

    public async setBalance(value: number, uid: string): Promise<Balance[]> {
        await new DashboardService().set(value, uid)

        const result: Balance[] = await this.getDataBalance(uid)

        return result
    }
}