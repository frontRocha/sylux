import { CollectionReference, DocumentReference, Query, QuerySnapshot, addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { FieldValues } from "react-hook-form"

import { db } from "../../../Mocks/FirebaseConfig"

import { Convert, Items, ValuesData } from "../../../Interfaces/DashBoardInterface/ComponentsCrudInterface/ComponentsCrudInterface" 

export class ComponentCrudService {
    public get = async (uid: string, type: string): Promise<Items[]> => {
        const userCollectionRef: CollectionReference = collection(db, '/taskbills')
        const ref: Query = query(userCollectionRef, where('uid', '==', uid), where('type', '==', type))

        const data: QuerySnapshot = await getDocs(ref)
        const result = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        return result as Items[]
    }

    public set = async (values: FieldValues | ValuesData, uid: string): Promise<void> => {
        const result: Convert = this.toConvert(values)
        const userCollectionRef: CollectionReference = collection(db, '/taskbills')

        await addDoc(userCollectionRef, {
            name: values.name,
            value: result.convertValue,
            startDate: result.startDate,
            endDate: result.endDate,
            type: values.type,
            uid: uid
        })
    }

    public delete = async (id: string): Promise<void> => {
        const itemDoc: DocumentReference = doc(db, "taskbills", id)
        
        await deleteDoc(itemDoc)
    }

    public toConvert = (values: ValuesData | FieldValues): Convert => {
        const startDate: string = values.startDate.toLocaleString()
        const endDate: string = values.endDate.toLocaleString()
        const convertValue: number = parseFloat(values.value)

        return {
            startDate,
            endDate,
            convertValue
        }
    }
}