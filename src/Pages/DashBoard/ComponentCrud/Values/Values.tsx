import { useContext, useEffect, useState } from "react";

import EditBalance from "./EditBalance/EditBalance";
import Loader from "../../../../Components/Loader/Loader";

import { AuthFirebase } from "../../../../Context/Auth";

import { ValuesController } from "../../../../Controllers/DashBoardControllers/ValuesController/ValuesController";
import { Balance } from "../../../../Interfaces/DashBoardInterface/DashBoardInterface";
import { Type } from "../../../../Interfaces/DashBoardInterface/ComponentsCrudInterface/ComponentsCrudInterface";
import { List } from "../../../../Interfaces/DashBoardInterface/ValuesInterface/ValuesInterface";
import { handleBusinessError, verifyValidateUser } from "../../../../Utils/HandleBusinessError/HandleBusinessError";
import { DataServiceRequisition } from "../../../../Services/DataServiceRegistration/DataServiceRequisition";
import { TypeValuesController } from "../../../../Controllers/TypeValuesController/TypeValuesController";
import { createControllerInstance } from "../../../../Utils/CreateComponentCrudController/CreateComponentCrudController";


export default function Values({ item }: List) {
    const { user } = useContext(AuthFirebase);

    const [loader, setLoader] = useState<boolean>(false);
    const [saldo, setSaldo] = useState<Balance[]>([]);
    const [type, setType] = useState<Type>({
        lucro: 0,
        despesa: 0
    });

    useEffect(() => {
        showLoader();
        getValues();
    }, [item]);

    const firestoreService = new DataServiceRequisition();

    const getValues = async (): Promise<unknown> => {
        try {
            const uid = verifyValidateUser(user?.uid);
            const instanceMethod = createControllerInstance(ValuesController, firestoreService, 'openingbalance', uid);
            await fetchDataOpeningBalance(instanceMethod);
            await setTypeValues();

            hideLoader();
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleBusinessError(err);
            };

            return err;
        };
    };

    const setTypeValues = async (): Promise<unknown> => {
        try {
            const uid = verifyValidateUser(user?.uid);
            await fetchDataTaskBills(uid);

        } catch (err: unknown) {
            if (err instanceof Error) {
                handleBusinessError(err);
            };

            return err;
        };

        hideLoader();
    };

    const editCurrentBalance = async (value: string, id: string): Promise<unknown> => {
        try {
            showLoader();
            const uid = verifyValidateUser(user?.uid);
            const instanceMethod = createControllerInstance(ValuesController, firestoreService, 'openingbalance', uid);
            await editDataOnDatabase(instanceMethod, value, id);

            await getValues();
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleBusinessError(err);
            };

            return err;
        } finally {
            hideLoader();
        };
    };

    const fetchDataOpeningBalance = async (instanceMethod: ValuesController) => {
        try {
            const result: Balance[] = await instanceMethod.getDataOpeningBalance();

            setSaldo(result);
        } catch (err) {
            throw err;
        };
    };

    const fetchDataTaskBills = async (uid: string) => {
        try {
            const result = await new TypeValuesController(uid).handleTypesValues();

            setType({ ...type, despesa: result.despesa, lucro: result.lucro });
        } catch (err) {
            throw err;
        };
    };

    const editDataOnDatabase = async (instanceMethod: ValuesController, value: string, id: string) => {
        try {
            await instanceMethod.editBalance(value, id);
        } catch (err) {
            throw err;
        };
    };

    const showLoader = () => {
        setLoader(true);
    };

    const hideLoader = () => {
        setLoader(false);
    };

    const balance: number[] = saldo.map(({ value }) => value);

    const currentBalance: number = balance[0] - type.despesa + type.lucro;

    return (
        <div>
            <div className="overflow-hidden flex flex-wrap items-center justify-center text-center relative top-[-20px] gap-5">
                <div className="border border-gray-300 shadow flex flex-col justify-center items-center py-4 px-8 rounded bg-white min-w-[200px] xl:min-w-[300px]">
                    {loader ? <Loader /> :
                        saldo.map((item: Balance) => (
                            <div className="text-center" key={item.id}>
                                <EditBalance handleData={(e: string) => editCurrentBalance(e, item.id)} />
                                <h3 className="text-primary text-2xl xl:text-3xl font-sans">R$ {item.value.toLocaleString('pt-BR')}</h3>
                                <p className="fontPop text-sm font-light">saldo inicial</p>
                            </div>
                        ))}
                </div>

                <div className="border border-gray-300 shadow flex flex-col justify-center items-center py-4 px-8 rounded bg-white min-w-[200px] xl:min-w-[300px]">
                    {loader ?
                        <Loader /> :
                        <div className="text-center">
                            <h3 className={`text-2xl xl:text-3xl font-sans ${balance[0] > currentBalance ? 'text-[#A0616A]' : 'text-primary'}`}>R$ {currentBalance.toLocaleString('pt-BR')}</h3>
                            <p className="fontPop text-sm font-light">saldo atual</p>
                        </div>
                    }
                </div>

                <div className="border border-gray-300 shadow flex flex-col justify-center items-center py-4 px-8 rounded bg-white min-w-[200px] xl:min-w-[300px]">
                    {loader ?
                        <Loader /> :
                        <div className="text-center">
                            <h3 className="text-[#A0616A] text-2xl xl:text-3xl font-sans">R$ {type.despesa.toLocaleString('pt-BR')}</h3>
                            <p className="fontPop text-sm font-light">valor de despesas</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}