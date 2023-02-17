import { useState, Fragment } from 'react'

import { FieldValues, FormProvider, useForm } from "react-hook-form"
import { Dialog, Transition } from '@headlessui/react'
import { ToastContainer, toast } from "react-toastify"

import { Button } from "../../../Components/Button/Button"

import { HandleDataPostIt } from "../../../Controllers/PostItController/HandleDataPostItController/HandleDataPostItController"
import { HandleData } from "../../../Interfaces/PostItInterface/PostItInterface"

import './CreatePostIt.css'

export default function CreatePostIt({ handleData }: HandleData) {

    const methods = useForm<FieldValues>()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleSetData = async (e: FieldValues) => {
        try {
            const result: string = await new HandleDataPostIt().getDataBalance(e)

            handleData(result)

            methods.reset({
                title: ''
            })

        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message)
                console.error(err.message)
            }

            return err
        }

        setIsOpen(false)
    }

    return (
        <div>
            <ToastContainer />
            <button onClick={() => setIsOpen(true)} className="bg-primary py-2 px-4 rounded-2xl text-white text-sm fontRal">Criar anotação</button>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
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
                                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-primary text-left shadow-xl transition-all w-[400px] h-[500px]'>
                                    <div className='w-[90%] flex justify-end'>
                                        <button onClick={() => setIsOpen(false)} className='text-end mt-5 py-1 px-3 rounded text-sm text-gray-500 fontRal bg-white'>x</button></div>
                                    <Dialog.Title className='text-center text-white text-2xl fontRal pb-10'>Criando anotação</Dialog.Title>

                                    <FormProvider {...methods}>
                                        <form className='flex flex-col items-center justify-between h-[300px]' onSubmit={methods.handleSubmit(handleSetData)}>
                                            <div className='flex flex-col w-[70%]'>
                                                <textarea placeholder="Digite aqui" {...methods.register('title')} className='resize-none text min-h-[300px] max-h-[300px] bg-transparent outline-none text-3xl text-white'></textarea>
                                            </div>
                                            <div className='flex justify-end w-[70%]'>
                                                <Button className='bg-white py-2 px-8 text-sm text-primary rounded mt-1' text="Criar" />
                                            </div>
                                        </form>
                                    </FormProvider>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}