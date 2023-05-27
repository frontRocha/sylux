import { useState, useContext } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from '../../Components/Layout/NavBar/NavBar';

import checkedSucess from '../../Assets/sucess.gif';

import { FeedbackController } from '../../Controllers/FeedbackController/FeedbackController';
import { handleBusinessError, verifyValidateUser } from '../../Utils/HandleBusinessError/HandleBusinessError';
import { DataServiceRequisition } from '../../Services/DataServiceRegistration/DataServiceRequisition';
import { createControllerInstance } from '../../Utils/CreateComponentCrudController/CreateComponentCrudController';
import { AuthFirebase } from '../../Context/Auth';

export default function Feedback() {

    const navigate = useNavigate();
    const methods = useForm<FieldValues>();
    const [loader, setLoader] = useState<boolean>(false);
    const { user } = useContext(AuthFirebase);

    const firestoreService = new DataServiceRequisition();

    const createFeedback = async (e: FieldValues): Promise<unknown> => {
        try {
            showLoader();
            const uid = verifyValidateUser(user?.uid);
            const instanceMethod = createControllerInstance(FeedbackController, firestoreService, 'feedback', uid);
            const validate = validateData(instanceMethod, e);
            await setDataOnDatabase(instanceMethod, validate);

            navigate('/');
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleBusinessError(err);
            }

            return err;
        };
    };

    const setDataOnDatabase = async (instanceMethod: FeedbackController, description: string) => {
        try {
            const result: void = await instanceMethod.setData(description);
        } catch (err) {
            throw err;
        };
    };

    const validateData = (instanceMethod: FeedbackController, e: FieldValues): string => {
        try {
            const validate: string = instanceMethod.validate(e);

            return validate;
        } catch (err) {
            throw err;
        };
    };

    const showLoader = () => {
        setLoader(true);
    };

    return (
        <main>
            <NavBar />
            <section className="flex flex-col justify-center items-center min-h-screen h-[700px]">

                <ToastContainer />
                {loader ?
                    <div className='flex items-center justify-center h-screen'>
                        <img src={checkedSucess} alt="checked" className='w-[30px] bg-black rounded-full py-1 px-1 gap-5' />
                        <p className='fontPop text-xl'>!!Obrigado pelo feedback!!</p>
                    </div>
                    :
                    <div className="fontPop text-center flex flex-col gap-5 mx-10">
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