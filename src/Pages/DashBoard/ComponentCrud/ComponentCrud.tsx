import { useContext, useEffect, useState } from "react";

import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify'

import { AuthFirebase } from "../../../Context/Auth";

import Values from "./Values/Values";
import Table from "./Table/Table";
import { Loader } from "./Loader/Loader";
import { Input } from "../../../Components/Input/Input";
import { Button } from "../../../Components/Button/Button";

import { Items } from "../../../Interfaces/DashBoardInterface/ComponentsCrud/ComponentsCrud";
import { ComponentCrudController } from "../../../Controllers/DashBoardControllers/ComponentsCrud/ComponentsCrud";

import 'react-toastify/dist/ReactToastify.css';

export default function ComponentCrud() {

    const { user } = useContext(AuthFirebase)

    const methods = useForm<FieldValues>()

    const [todos, setTodos] = useState<Items[]>([])
    const [type, setType] = useState<string>('despesa')
    const [loader, setLoader] = useState<boolean>(false)

    useEffect(() => {
        getTodos()
    }, [type])

    const getTodos = async (): Promise<unknown> => {
        try {
            if (user?.uid) {
                const result: Items[] = await new ComponentCrudController().getData(user.uid, type)

                setTodos(result)
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message)
            }

            return err
        }
    }

    const handleData = async (values: FieldValues): Promise<unknown> => {
        setLoader(true)

        try {
            if (user?.uid) {
                await new ComponentCrudController().handleData(values, user.uid)

                resetValuesAndFocus()

                await getTodos()
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message)
            }

            setLoader(false)
            return err
        }
    }

    const resetValuesAndFocus = (): void => {
        toast.success("Adicionado com sucesso")

        methods.setFocus('name')

        methods.reset({
            name: '',
            value: '',
            startDate: '',
            endDate: '',
            type: ''
        })
    }

    const deleteItem = async (id: string): Promise<unknown> => {
        try {
            await new ComponentCrudController().deleteData(id)

            toast.success('Deletado com sucesso')

            await getTodos()
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message)
            }

            return err
        }
    }

    return (
        <div className="md:pl-10 flex flex-col justify-center items-center h-auto min-h-screen my-10 overflow-hidden w-full">
            <ToastContainer />

            <div className="w-[90%] mx-auto">
                <div className="h-[110px] w-full bg-primary flex items-center justify-center rounded-b-none rounded-xl shadow">
                    <h2 className="text-white text-2xl sm:text-3xl fontRal font-semibold">Sistema financeiro</h2>
                </div>

                <Values item={todos} />

                <div>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(handleData)} className="bg-white w-full flex-col md:flex-row py-6 px-8 flex flex-wrap justify-center gap-5 items-start lg:items-center fontPop shadow">
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-gray-400">Nome</label>
                                <Input className="fontPop focus:outline-none bg-gray-100 text-black border border-gray-300 rounded px-4 py-1 w-[125px] xl:w-[150px]" type="text" name='name' />
                            </div>
                            <div className="flex flex-col justify-center text-gray-400">
                                <label className="text-xs lg:text-sm">Valor</label>
                                <Input className="fontPop focus:outline-none bg-gray-100 text-black border border-gray-300 rounded pl-2 py-1 w-[70px] xl:w-[100px]" type="number" name='value' />
                            </div>
                            <div className='flex flex-col justify-center text-gray-400'>
                                <label className="text-xs lg:text-sm">data inicio</label>
                                <Input className='focus:outline-none text-xs lg:text-base' type="date" name='startDate' />
                            </div>
                            <div className='flex flex-col justify-center text-gray-400'>
                                <label className="text-xs lg:text-sm">data vencimento</label>
                                <Input className='focus:outline-none text-xs lg:text-base' type="date" name="endDate" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <label className="text-xs lg:text-sm text-gray-400">Tipo</label>

                                <div className="flex gap-4">
                                    <div className="flex gap-2">
                                        <Input className="" type="radio" value='despesa' name="type" />

                                        <label className="text-[#A0616A] text-xs lg:text-sm" htmlFor="despesa">Despesa</label>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input className="" type="radio" value='lucro' name="type" />
                                        <label className="text-primary text-xs lg:text-sm" htmlFor="lucro">Lucro</label>
                                    </div>
                                </div>
                            </div>
                            <Button className="bg-primary text-white py-2 px-5 xl:px-10 rounded-xl text-xs lg:text-base" disabled={loader ? true : false} text={loader ? <Loader /> : 'Adicionar'} />
                        </form>
                    </FormProvider>

                </div>

                <div className="clear-both inline-block w-full px-10 mt-10 relative text-sm font-ral">
                    <p className='text-sm font-ral'>Filtrar por:</p>

                    <input onClick={() => setType('despesa')} type="radio" className="stv-radio-tab absolute left-[-99999em] top-[-99999em]" name="radioTabTest" value="1" id="tab1" defaultChecked />
                    <label className='pointer float-left rounded rounded-b-none border border-primary border-b-none bg-white hover:bg-gray-100 duration-300 mr-[-1px] py-[.5em] px-[1em] relative' htmlFor="tab1">Depesa</label>

                    <input onClick={() => setType('lucro')} type="radio" className="stv-radio-tab absolute left-[-99999em] top-[-99999em]" name="radioTabTest" value="2" id="tab2" />
                    <label className='pointer float-left rounded rounded-b-none border border-primary border-b-none bg-white hover:bg-gray-100 duration-300 mr-[-1px] py-[.5em] px-[1em] relative' htmlFor="tab2">Lucro</label>
                </div>

                <Table data={todos} sendId={deleteItem} />
            </div>
        </div>
    )
}