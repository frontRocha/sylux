import { useContext } from "react"

import { useForm, FormProvider } from "react-hook-form"
import { FieldValues } from "react-hook-form/dist/types"
import { ToastContainer, toast } from "react-toastify"

import { AuthFirebase } from "../../../Context/Auth"

import { Button } from "../../../Components/Button/Button"
import { Input } from "../../../Components/Input/Input"

import { HandleDataForm } from "../../../Controllers/DashBoardControllers/SetBalanceController/SetBalanceController"
import { DataFormProps } from "../../../Interfaces/DashBoardInterface/SetBalanceInterface/SetBalanceInterface"

export default function SetBalance({ dataForm }: DataFormProps) {

    const methods = useForm();
    const { user } = useContext(AuthFirebase)

    let userName: string | null | undefined = user?.displayName
    if (userName) {
        let tmp: string[] = userName.split(" ");
        userName = tmp[0];
    }

    const handleDataForm = async (e: FieldValues): Promise<unknown> => {
        try {
            const result: number = await new HandleDataForm().getDataBalance(e)

            dataForm(result)
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message)
            }

            return err
        }
    }

    return (
        <div className="h-[700px] min-h-screen flex flex-col justify-center items-center">
            <ToastContainer />
            <div className="bg-white min-w-[450px] w-[80%] h-[500px] px-2 py-4 rounded shadow-xl">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleDataForm)} className="h-full flex flex-col items-center justify-between">
                        <div className="">
                            <span className="text-gray-400 text-sm fontRal pl-2">Olá {userName}</span>
                            <h2 className="text-primary text-center text-3xl fontRal font-semibold">SEJA BEM VINDO!</h2>
                        </div>
                        <div>
                            <p className="text-gray-500 fontPop text-center px-20">Para conseguirmos lhe dar acesso ao nosso serviço, precisamos que você insira um valor de inicio. <span className="text-gray-400 text-sm">(Esse valor não será utilizado para fins lucrativo, apenas para calculos do sistema!!)</span></p>
                        </div>
                        <div className="text-center flex flex-col">
                            <label className="text-2xl fontPop py-4">Insira o valor</label>
                            <div>

                                <Input placeholder="R$ 00,00" {...methods.register('valor')} type='number' className="text-center text-3xl text-primary fontPop font-bold focus:outline-none w-[50%]" />

                            </div>
                        </div>
                        <Button className="text-xl text-white hover:text-primary fontRal bg-primary hover:bg-white border border-primary rounded-xl py-2 px-20 duration-300" text='Registrar' />
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}