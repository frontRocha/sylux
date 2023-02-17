import { useContext, useEffect, useState } from "react";

import EditBalance from "./EditBalance/EditBalance";
import Loader from "../../../../Components/Loader/Loader";

import { AuthFirebase } from "../../../../Context/Auth";

import { ValuesController } from "../../../../Controllers/DashBoardControllers/Values/Values";
import { Balance } from "../../../../Interfaces/DashBoardInterface/DashBoardInterface";
import { Type } from "../../../../Interfaces/DashBoardInterface/ComponentsCrudInterface/ComponentsCrudInterface";
import { List } from "../../../../Interfaces/DashBoardInterface/ValuesInterface/ValuesInterface";


export default function Values({ item }: List) {
    const { user } = useContext(AuthFirebase)

    const [loader, setLoader] = useState<boolean>(false)
    const [saldo, setSaldo] = useState<Balance[]>([])
    const [type, setType] = useState<Type>({
        lucro: 0,
        despesa: 0
    })

    useEffect(() => {
        setLoader(true)
        getValues()
    }, [item])

    const getValues = async (): Promise<unknown> => {
        try {
            if (user?.uid) {
                const result: Balance[] = await new ValuesController().handleValues(user?.uid)

                setSaldo(result)
                await setTypeValues()

                setLoader(false)
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message)
            }

            return err
        }

    }

    const setTypeValues = async (): Promise<unknown> => {
        try {
            if (user?.uid) {
                const result: Type = await new ValuesController().handleTypesValues(user.uid)
                setType({ ...type, despesa: result.despesa, lucro: result.lucro })
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message)

                return err
            }

            setLoader(false)
        }
    }

    const editCurrentBalance = async (e: string[]): Promise<unknown> => {
        setLoader(true)

        try {
            await new ValuesController().editBalance(e[0], e[1])

            await getValues()
        } catch (err: unknown) {
            if (err instanceof Error) console.error(err.message)

            return err
        }

        setLoader(false)
    }

    const balance: number[] = saldo.map(({ balance }) => balance)

    const currentBalance: number = balance[0] - type.despesa + type.lucro

    return (
        <div>
            <div className="overflow-hidden flex flex-wrap items-center justify-center text-center relative top-[-20px] gap-5">
                <div className="border border-gray-300 shadow flex flex-col justify-center items-center py-4 px-8 rounded bg-white min-w-[200px] xl:min-w-[300px]">
                    {loader ? <Loader /> :
                        saldo.map((item: Balance) => (
                            <div className="text-center" key={item.id}>
                                <EditBalance handleData={(e: string) => editCurrentBalance([e, item.id])} />
                                <h3 className="text-primary text-2xl xl:text-3xl font-sans">R$ {item.balance.toLocaleString('pt-BR')}</h3>
                                <p className="fontRal text-sm text-bold">saldo inicial</p>
                            </div>
                        ))}
                </div>

                <div className="border border-gray-300 shadow flex flex-col justify-center items-center py-4 px-8 rounded bg-white min-w-[200px] xl:min-w-[300px]">
                    {loader ?
                        <Loader /> :
                        <div className="text-center">
                            <h3 className={`text-2xl xl:text-3xl font-sans ${balance[0] > currentBalance ? 'text-[#A0616A]' : 'text-primary'}`}>R$ {currentBalance.toLocaleString('pt-BR')}</h3>
                            <p className="fontRal text-sm text-bold">saldo atual</p>
                        </div>
                    }
                </div>

                <div className="border border-gray-300 shadow flex flex-col justify-center items-center py-4 px-8 rounded bg-white min-w-[200px] xl:min-w-[300px]">
                    {loader ?
                        <Loader /> :
                        <div className="text-center">
                            <h3 className="text-[#A0616A] text-2xl xl:text-3xl font-sans">R$ {type.despesa.toLocaleString('pt-BR')}</h3>
                            <p className="fontRal text-sm text-bold">valor de despesas</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}