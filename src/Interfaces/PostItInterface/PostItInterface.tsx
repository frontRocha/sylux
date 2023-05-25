export interface PostItItens {
    id: string
    title: string
}

export type Props = {
    sendData: (e: string) => void
}