import { useContext, useEffect, useState } from "react"

import { Trash } from "phosphor-react";

import CreatePostIt from "./CreatePostIt/CreatePostIt";
import Loader from "../../Components/Loader/Loader";

import { AuthFirebase } from "../../Context/Auth";

import { PostItController } from "../../Controllers/PostItController/PostItControllerController";
import { PostItItens } from "../../Interfaces/PostItInterface/PostItInterface";

import './PostIt.css'
import { DataServiceRequisition } from "../../Services/DataServiceRegistration/DataServiceRequisition";
import { handleBusinessError, verifyValidateUser } from "../../Utils/HandleBusinessError/HandleBusinessError";
import { createControllerInstance } from "../../Utils/CreateComponentCrudController/CreateComponentCrudController";

export default function PostIt() {

    const [postIt, setPostIt] = useState<PostItItens[]>([]);
    const [loader, setLoader] = useState<boolean>(false);

    const { user } = useContext(AuthFirebase);

    useEffect(() => {
        showLoader();
        getPostIt();
    }, []);

    const firestoreService = new DataServiceRequisition();

    const getPostIt = async (): Promise<void> => {
        try {
            const uid = verifyValidateUser(user?.uid);
            const instanceMethod = createControllerInstance(PostItController, firestoreService, 'postit', uid);
            await fetchData(instanceMethod);
        } catch (err) {
            if (err instanceof Error) {
                handleBusinessError(err);
            };
        } finally {
            hideLoader();
        };
    };

    const deletePostIt = async (id: string): Promise<unknown> => {
        try {
            showLoader();
            const uid = verifyValidateUser(user?.uid);
            const instanceMethod = createControllerInstance(PostItController, firestoreService, 'postit', uid);
            await deleteDataToDatabase(instanceMethod, id);

            await getPostIt();
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleBusinessError(err);
            };

            return err;
        };
    };

    const handleData = async (title: string): Promise<unknown> => {
        try {
            showLoader();
            const uid = verifyValidateUser(user?.uid);
            const instanceMethod = createControllerInstance(PostItController, firestoreService, 'postit', uid);
            await sendDataToDatabase(instanceMethod, title);

            await getPostIt();
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleBusinessError(err);
            };

            return err;
        };
    };

    const deleteDataToDatabase = async (instanceMethod: PostItController, id: string) => {
        try {
            const method = await instanceMethod.deleteData(id);
        } catch (err) {
            throw err;
        };
    };

    const sendDataToDatabase = async (instanceMethod: PostItController, title: string) => {
        try {
            const method = await instanceMethod.createData(title);
        } catch (err) {
            throw err;
        };
    };

    const fetchData = async (instanceMethod: PostItController): Promise<void> => {
        try {
            const method = await instanceMethod.getData();

            setPostIt(method);
        } catch (err: unknown) {
            throw err;
        };
    };

    const showLoader = () => {
        setLoader(true);
    };

    const hideLoader = () => {
        setLoader(false);
    };

    return (
        <div className="ml-4 md:ml-28">
            <div className="flex justify-between items-center mr-4  py-5">
                <h2 className="fontPop text-xl">Anotações</h2>
                <CreatePostIt sendData={handleData} />
            </div>
            {loader ? <div className="h-screen w-full flex flex-col items-center justify-center">
                <Loader />
                <span className="text-sm text-primary fontPop my-2">Carregando PostIts</span>
            </div> :
                !postIt.length ? <span className="flex flex-col items-center justify-center h-screen w-full text-2xl text-primary fontPop">Adicione uma anotação</span> :
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center place-content-start h-screen gap-4 my-2">
                        {postIt.map((item) => (
                            <div key={item.id} className="h-[200px] w-[200px] relative flex items-center flex-col post-it overflow-y-auto overflow-x-hidden bg-primary p-2 text-white">
                                <span className="relative left-[75px] text-sm text-black bg-white py-2 px-2 rounded cursor-pointer" onClick={() => deletePostIt(item.id)}>{<Trash />}</span>
                                <h1 className="h1 text-xl pt-2 overflow-y-auto">{item.title[0].toUpperCase() + item.title.substring(1)}</h1>
                            </div>
                        ))}
                    </div>}

        </div>
    )
}