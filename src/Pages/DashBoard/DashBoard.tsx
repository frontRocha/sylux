import { useContext, useEffect, useState } from "react";
import { AuthFirebase } from "../../Context/Auth";
import { DashBoardController } from "../../Controllers/DashBoardControllers/DashboardController";
import SetBalance from "./SetBalance/SetBalance";
import Loader from "../../Components/Loader/Loader";
import ComponentCrud from "./ComponentCrud/ComponentCrud";
import { Balance } from "../../Interfaces/DashBoardInterface/DashBoardInterface";
import { handleBusinessError, verifyValidateUser } from "../../Utils/HandleBusinessError/HandleBusinessError";
import { DataServiceRequisition } from "../../Services/DataServiceRegistration/DataServiceRequisition";
import { createControllerInstance } from "../../Utils/CreateComponentCrudController/CreateComponentCrudController";

export default function DashBoard() {

    const { user } = useContext(AuthFirebase)

    const [balance, setBalance] = useState<Balance[]>()
    const [loader, setLoader] = useState<boolean>(true)

    useEffect(() => {
        getBalance()
    }, [])

    const firestoreService = new DataServiceRequisition();

    const getBalance = async (): Promise<unknown> => {
        showLoader()

        try {
            const uid = verifyValidateUser(user?.uid)
            const instanceMethod = createControllerInstance(DashBoardController, firestoreService, 'openingbalance', uid)
            await fetchData(instanceMethod)
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleBusinessError(err)
            }

            return err
        } finally {
            hideLoader()
        }
    }

    const fetchData = async (instanceMethod: DashBoardController) => {
        try {
            const method = await instanceMethod.getDataBalance()
            setBalance(method)
        } catch (err) {
            throw err
        }
    }

    const setBalanceInitial = async (value: number): Promise<unknown> => {
        setLoader(true)

        try {
            const uid = verifyValidateUser(user?.uid)
            const instanceMethod = createControllerInstance(DashBoardController, firestoreService, 'openingbalance', uid)

            await setDataOnDatabase(instanceMethod, value)
            await getBalance()
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleBusinessError(err)
            }

            return err
        }
    }

    const setDataOnDatabase = async (instanceMethod: DashBoardController, value: number) => {
        try {
            await instanceMethod.setBalance(value)
            await fetchData(instanceMethod)
        } catch (err) {
            throw err
        }
    }

    const showLoader = () => {
        setLoader(true)
    }

    const hideLoader = () => {
        setLoader(false)
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