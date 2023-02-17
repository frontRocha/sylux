import { useContext, useEffect, useState } from "react"

import { Trash } from "phosphor-react";

import CreatePostIt from "./CreatePostIt/CreatePostIt";
import Loader from "../../Components/Loader/Loader";

import { AuthFirebase } from "../../Context/Auth";

import { PostItController } from "../../Controllers/PostItController/PostItController";
import { PostItItens } from "../../Interfaces/PostItInterface/PostItInterface";

import './PostIt.css'

export default function PostIt() {

    const [postIt, setPostIt] = useState<PostItItens[]>([])
    const [loader, setLoader] = useState(false)

    const { user } = useContext(AuthFirebase)

    useEffect(() => {
        setLoader(true)
        getPostIt()
    }, [])

    const getPostIt = async (): Promise<unknown> => {
        try {
            if (user?.uid) {
                const result: PostItItens[] = await new PostItController().getPostIt(user?.uid)

                setPostIt(result)
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message)
            }

            return err
        }

        setLoader(false)
    }

    const deletePostIt = async (id: string): Promise<unknown> => {
        try {
            setLoader(true)

            const result: void = await new PostItController().deletePostIt(id)
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message)
            }

            return err
        }

        await getPostIt()
    }

    const createPostIt = async (title: string): Promise<unknown> => {
        try {
            setLoader(true)

            if (user?.uid) {
                const result: void = await new PostItController().setPostIt(user?.uid, title)
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message)
            }

            return err
        }

        await getPostIt()
    }

    return (
        <div className="ml-4 md:ml-28">
            <div className="flex justify-between items-center mr-4  py-5">
                <h2 className="fontRal text-xl">Anotações</h2>
                <CreatePostIt handleData={createPostIt} />
            </div>
            {loader ? <div className="h-screen w-full flex flex-col items-center justify-center">
                <Loader />
                <span className="text-sm text-primary fontRal my-2">Carregando PostIts</span>
            </div> :
                !postIt.length ? <span className="flex flex-col items-center justify-center h-screen w-full text-2xl text-primary fontRal">Adicione uma anotação</span> :
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