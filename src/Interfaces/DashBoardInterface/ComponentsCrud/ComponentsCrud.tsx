export interface Items {
    name: string
    startDate: string
    endDate: string
    value: number
    type: string
    id: string
}

export interface ValuesData {
    name: string
    value: string
    startDate: string
    endDate: string
    type: string
}

export type Convert = {
    startDate: string
    endDate: string
    convertValue: number
}

export interface Type {
    despesa: number
    lucro: number
}
