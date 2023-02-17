import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Pen } from "phosphor-react"
import { FieldValues, useForm, FormProvider } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"

import { Input } from "../../../../../Components/Input/Input"
import { Button } from "../../../../../Components/Button/Button"

import { EditBalanceController } from "../../../../../Controllers/DashBoardControllers/EditBalance/EditBalanceController"
import { EditBalanceProps } from "../../../../../Interfaces/DashBoardInterface/EditBalance/EditBalance"


export default function EditBalance({ handleData }: EditBalanceProps) {

    const methods = useForm()

    const [show, setShow] = useState<boolean>(false)

    const setShowOn = (): void => setShow(true)

    const setShowOff = (): void => {
        setShow(false)

        methods.reset({
            valor: ''
        })
    }

    const handleBalance = async (e: FieldValues): Promise<unknown> => {
        try {
            const result = await new EditBalanceController().handleValueBalance(e.valor)
            handleData(result.toString())
            setShowOff()

        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message)
            }

            return err
        }
    }

    return (
        <div>
            <ToastContainer />
            <button onClick={setShowOn} className="block absolute top-2 mx-24 xl:mx-40 text-black">
                <Pen />
            </button>
            {!show ? <div className="hidden"></div> :
                <Transition.Root as={Fragment} show={show}>
                    <Dialog as="div" className="relative z-10" onClose={setShowOff}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[400px] h-[500px]'>
                                        <div className='w-[90%] flex justify-end'>
                                            <button onClick={() => setShow(false)} className='text-end mt-5 py-1 px-3 rounded text-sm text-gray-500 fontRal bg-white'>x</button></div>
                                        <Dialog.Title className='text-center text-primary text-2xl fontRal py-10'>Alterar valor inicial</Dialog.Title>
                                        <div className='flex flex-col items-center justify-between h-[300px]'>
                                            <FormProvider {...methods}>
                                                <form className="px-6 py-6 lg:px-8 flex flex-col items-center" onSubmit={methods.handleSubmit(handleBalance)}>
                                                    <Input name="valor" type='number' placeholder="$00,00" className="text-center text-3xl text-primary fontPop font-bold focus:outline-none w-[50%] my-10" />

                                                    <Button className="text-xl text-white hover:text-primary fontRal bg-primary hover:bg-white border border-primary rounded-xl py-2 px-20 duration-300 mt-10" text='Enviar' />
                                                </form>
                                            </FormProvider>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>}
        </div >
    )
}