import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import NavBar from '../../Components/Layout/NavBar/NavBar'

import checkedSucess from '../../Assets/sucess.gif'

import { FeedbackController } from '../../Controllers/FeedbackController/FeedbackController'
export default function Feedback() {

    const navigate = useNavigate()
    const methods = useForm<FieldValues>()
    const [loader, setLoader] = useState<boolean>(false)

    const createFeedback = async (e: FieldValues): Promise<unknown> => {

        try {
            const validate: string | undefined = new FeedbackController().validate(e)

            if (validate) {
                setLoader(true)

                const result: void = await new FeedbackController().handleData(validate)

                navigate('/')
            }

        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message)
            }

            return err
        }
    }

    return (
        <main>
            <NavBar />
            <section className="flex flex-col justify-center items-center min-h-screen h-[700px]">

                <ToastContainer />
                {loader ?
                    <div className='flex items-center justify-center h-screen'>
                        <img src={checkedSucess} alt="checked" className='w-[30px] bg-black rounded-full py-1 px-1 gap-5' />
                        <p className='fontRal text-xl'>!!Obrigado pelo feedback!!</p>
                    </div>
                    :
                    <div className="fontRal text-center flex flex-col gap-5 mx-10">
                        <h3 className="text-2xl">Me envie um Feedback</h3>
                        <p className="text-sm">Conte-me a sua experiência ou até mesmo se achou um bug, de forma totalmente anônima</p>
                        <textarea className="px-2 py-2 min-h-[200px] max-h-[200px] border border-black rounded" {...methods.register('description')} />
                        <button className="bg-primary rounded-2xl py-2" onClick={methods.handleSubmit(createFeedback)}>Enviar</button>
                    </div>
                }
            </section>
        </main>
    )
}