import { useContext, useEffect, useState } from "react";
import { AuthFirebase } from "../../Context/Auth";
import { DashBoardController } from "../../Controllers/DashBoardControllers/DashboardController";
import SetBalance from "./SetBalance/SetBalance";
import Loader from "../../Components/Loader/Loader";
import ComponentCrud from "./ComponentCrud/ComponentCrud";
import { Balance } from "../../Interfaces/DashBoardInterface/DashBoardInterface";

export default function DashBoard() {

    const { user } = useContext(AuthFirebase)

    const [balance, setBalance] = useState<Balance[]>()
    const [loader, setLoader] = useState<boolean>(true)

    useEffect(() => {
        getBalance()
    }, [])

    const getBalance = async (): Promise<unknown> => {
        setLoader(true)

        try {
            if (user?.uid) {
                const data: Balance[] = await new DashBoardController().getDataBalance(user.uid)
                setBalance(data)
            }

        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message)
            }

            return err
        }

        setLoader(false)
    }

    const setBalanceInitial = async (value: number): Promise<unknown> => {
        setLoader(true)

        try {
            if (user?.uid) {
                await new DashBoardController().setBalance(value, user.uid)

                await getBalance()
            }
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message)
            }

            return err
        }

    }

    return (
        <section className="overflow-hidden md:ml-10 bg-[#F2F2F2] flex flex-col justify-center items-center h-auto min-h-screen">
            {!loader ?
                !balance?.length ?
                    <SetBalance dataForm={setBalanceInitial} />
                    :
                    <ComponentCrud />
                :
                <Loader />
            }
        </section>
    )
}