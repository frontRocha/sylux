import { useEffect, useState } from "react"
import { Trash } from "phosphor-react"

import { Loader } from "../Loader/Loader"

import { Items } from "../../../../Interfaces/DashBoardInterface/ComponentsCrud/ComponentsCrud"

interface Props {
    data: Items[]
    sendId: (id: string) => void
}

export default function Table({ data, sendId }: Props) {

    const [loader, setLoader] = useState<boolean>(false)
    const [vetor, setVetor] = useState<Items[]>([])

    useEffect(() => {
        setLoader(true)
        getData()
    }, [data])

    const getData = async (): Promise<void> => {
        setVetor(Object.values(data))

        setLoader(false)
    }

    const receiveId = (id: string): void => {
        setLoader(true)

        sendId(id)
    }

    return (
        <div className='teste min-h-[400px] max-h-[400px] overflow-auto bg-white rounded-2xl rounded-t-none'>
            {vetor.length ?
                !loader ?
                    <table className='w-full fontPop shadow'>
                        <thead className='border border-b-none text-center bg-gray-100'>
                            <tr>
                                <td className='text-sm text-gray-800 py-2 px-8'>Nome</td>
                                <td className='text-sm text-gray-800 py-2 px-8'>Data inicio</td>
                                <td className='text-sm text-gray-800 py-2 px-8'>Data de vencimento</td>
                                <td className='text-sm text-gray-800 py-2 px-8'>Valor (R$)</td>
                                <td className='text-sm text-gray-800 py-2 px-8'>Tipo</td>
                                <td className='text-sm text-gray-800 py-2 px-8'>Status</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {vetor.map((item: Items, index) => (
                                <tr key={index} className='border border-t-none text-center'>
                                    <td className="py-4 px-8 text-sm md:text-base text-slate-800">{item.name[0].toUpperCase() + item.name.substring(1)}</td>
                                    <td className="py-4 px-8 text-sm text-slate-800">{item.startDate.toString()}</td>
                                    <td className="py-4 px-8 text-sm text-slate-800">{item.endDate}</td>
                                    <td className='py-4 px-8 text-primary text-sm'>{item.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                    <td className={`text-sm md:text-base ${item.type === 'despesa' ? 'text-[#A0616A]' : 'text-primary py-4 px-8'}`}> {item.type[0].toUpperCase() + item.type.substring(1)} </td>

                                    {new Date() > new Date(Date.parse(item.endDate)) ?
                                        <td className="py-4 px-8 text-sm text-gray-300">Vencido</td>
                                        :
                                        <td className="py-4 px-8 text-sm text-primary">Aberto</td>
                                    }

                                    <td className='py-4 px-8' onClick={() => receiveId(item.id)}><Trash className="text-2xl bg-red-300 rounded px-1 py-1 text-white cursor-pointer" /></td>
                                </tr>

                            ))}
                        </tbody>
                    </table> : <div className="my-44 flex justify-center items-center"><Loader /></div>
                : <h4 className="text-center fontPop mt-44">Adicione um item para começar!</h4>}
        </div>
    )
}