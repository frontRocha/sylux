import { useContext, useEffect, useState } from "react";

import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify'

import { AuthFirebase } from "../../../Context/Auth";

import Values from "./Values/Values";
import Table from "./Table/Table";
import { Loader } from "./Loader/Loader";
import { Input } from "../../../Components/Input/Input";
import { Button } from "../../../Components/Button/Button";
import { Label } from "../../../Components/Label/Label";

import { Items } from "../../../Interfaces/DashBoardInterface/ComponentsCrudInterface/ComponentsCrudInterface";
import { ComponentCrudController } from "../../../Controllers/DashBoardControllers/ComponentsCrudController/ComponentsCrudController";

import 'react-toastify/dist/ReactToastify.css';
import { DataServiceRequisition } from "../../../Services/DataServiceRegistration/DataServiceRequisition";
import { handleBusinessError, showSuccessMessage, verifyValidateUser } from "../../../Utils/HandleBusinessError/HandleBusinessError";
import { createControllerInstance } from "../../../Utils/CreateComponentCrudController/CreateComponentCrudController";

export default function ComponentCrud() {

    const { user } = useContext(AuthFirebase)

    const methods = useForm<FieldValues>()

    const [todos, setTodos] = useState<Items[]>([])
    const [type, setType] = useState<string>('despesa')
    const [loader, setLoader] = useState<boolean>(false)

    useEffect(() => {
        getTodos()
    }, [])

    const firestoreService = new DataServiceRequisition();

    const getTodos = async (): Promise<unknown> => {
        try {
            const uid = verifyValidateUser(user?.uid)
            const instanceMethod = createControllerInstance(ComponentCrudController, firestoreService, 'taskbills', uid)
            fetchData(instanceMethod)
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleBusinessError(err)
            }

            return err
        } finally {
            hideLoader()
        }
    }

    const handleData = async (values: FieldValues): Promise<unknown> => {
        try {
            showLoader()
            const uid = verifyValidateUser(user?.uid)
            const instanceMethod = createControllerInstance(ComponentCrudController, firestoreService, 'taskbills', uid)
            await validateDataForm(instanceMethod, values);
            await resetDataForm();
            await sendDataToDatabase(instanceMethod, values);
            await getTodos();
        } catch (err) {
            if (err instanceof Error) {
                handleBusinessError(err)
            }

            return err;
        } finally {
            hideLoader();
        }
    };

    const deleteItem = async (id: string): Promise<unknown> => {
        try {
            const uid = verifyValidateUser(user?.uid)
            const instanceMethod = createControllerInstance(ComponentCrudController, firestoreService, 'taskbills', uid)
            await deleteDataToDatabase(instanceMethod, id)
            showSuccessMessage('Deletado com sucesso')
            await getTodos()
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleBusinessError(err)
            }

            return err
        }
    }

    const fetchData = async (instanceMethod: ComponentCrudController) => {
        try {
            const method = await instanceMethod.getData()

            setTodos(method)
        } catch (err) {
            throw err
        }
    }

    const sendDataToDatabase = async (instanceMethod: ComponentCrudController, values: FieldValues) => {
        try {
            await instanceMethod.createData(values);
        } catch (err) {
            throw err
        }
    };

    const deleteDataToDatabase = async (instanceMethod: ComponentCrudController, id: string) => {
        try {
            await instanceMethod.deleteData(id)
        } catch (err) {
            throw err
        }
    }

    const validateDataForm = async (instanceMethod: ComponentCrudController, values: FieldValues) => {
        try {
            await instanceMethod.validateData(values)
        } catch (err) {
            throw err
        }
    }

    const resetDataForm = async (): Promise<void> => {
        resetFormValues();
        setFocusOnNameField();
        showSuccessMessage("Adicionado com sucesso");
    };

    const resetFormValues = (): void => {
        methods.reset({
            name: '',
            value: '',
            startDate: '',
            endDate: '',
            type: ''
        });
    };

    const setFocusOnNameField = (): void => {
        methods.setFocus('name');
    };

    const showLoader = () => {
        setLoader(true)
    }

    const hideLoader = () => {
        setLoader(false)
    }

    return (
        <div className="md:pl-10 flex flex-col justify-center items-center h-auto min-h-screen my-10 overflow-hidden w-full">

            <div className="w-[90%] mx-auto">
                <div className="h-[110px] w-full bg-primary flex items-center justify-center rounded-b-none rounded-xl shadow">
                    <h2 className="text-white text-2xl sm:text-3xl fontPop font-normal">Sistema financeiro</h2>
                </div>

                <Values item={todos} />

                <div>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(handleData)} className="bg-white w-full flex-col md:flex-row py-6 px-8 flex flex-wrap justify-center gap-5 items-start lg:items-center fontPop shadow">
                            <div className="flex flex-col">
                                <Label className="text-xs lg:text-sm text-gray-400" htmlFor="name" text="Nome" />
                                <Input className="text-sm fontPop focus:outline-none bg-gray-100 border border-gray-300 rounded px-4 py-1 w-[125px] xl:w-[150px] text-[#8E8E8E]" type="text" name='name' />
                            </div>
                            <div className="flex flex-col justify-center text-gray-400">
                                <Label className="text-xs lg:text-sm" htmlFor="value" text="Valor" />
                                <Input className="text-sm fontPop focus:outline-none bg-gray-100 border border-gray-300 rounded pl-2 py-1 w-[70px] xl:w-[100px]" type="number" name='value' />
                            </div>
                            <div className='flex flex-col justify-center text-gray-400'>
                                <Label className="text-xs lg:text-sm" htmlFor="startDate" text="Data de inicio" />
                                <Input className='focus:outline-none text-xs lg:text-sm' type="date" name='startDate' />
                            </div>
                            <div className='flex flex-col justify-center text-gray-400'>
                                <Label className="text-xs lg:text-sm" htmlFor="endDate" text="Data de vencimento" />
                                <Input className='focus:outline-none text-xs lg:text-sm' type="date" name="endDate" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <Label className="text-xs lg:text-sm text-gray-400" htmlFor="type" text="Tipo" />

                                <div className="flex gap-4">
                                    <div className="flex gap-2">
                                        <Input className="" type="radio" value='despesa' name="type" />
                                        <Label className="text-[#A0616A] text-xs lg:text-sm" htmlFor="despesa" text="Despesa" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Input className="" type="radio" value='lucro' name="type" />
                                        <Label className="text-primary text-xs lg:text-sm" htmlFor="lucro" text="Lucro" />
                                    </div>
                                </div>
                            </div>
                            <Button className="bg-primary text-white py-2 px-2 xl:px-10 rounded-lg text-xs lg:text-sm" disabled={loader ? true : false} text={loader ? <Loader /> : 'Adicionar'} />
                        </form>
                    </FormProvider>

                </div>

                <div className="clear-both inline-block w-full px-10 mt-10 relative text-sm font-ral">
                    <p className='text-sm font-ral'>Filtrar por:</p>

                    <input onClick={() => setType('despesa')} type="radio" className="stv-radio-tab absolute left-[-99999em] top-[-99999em]" name="radioTabTest" value="1" id="tab1" defaultChecked />
                    <Label className='pointer float-left rounded rounded-b-none border border-primary border-b-none bg-white hover:bg-gray-100 duration-300 mr-[-1px] py-[.5em] px-[1em] relative' htmlFor="tab1" text="Despesa" />

                    <input onClick={() => setType('lucro')} type="radio" className="stv-radio-tab absolute left-[-99999em] top-[-99999em]" name="radioTabTest" value="2" id="tab2" />
                    <Label className='pointer float-left rounded rounded-b-none border border-primary border-b-none bg-white hover:bg-gray-100 duration-300 mr-[-1px] py-[.5em] px-[1em] relative' htmlFor="tab2" text="Lucro" />
                </div>

                <Table data={todos.filter((item) => item.type === type)} sendId={deleteItem} />
            </div>
        </div>
    )
}