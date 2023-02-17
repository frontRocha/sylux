import { CollectionReference, Query, QuerySnapshot, addDoc, collection, getDocs, query, where, QueryDocumentSnapshot } from "firebase/firestore"

import { db } from "../../Mocks/FirebaseConfig"

import { Balance } from "../../Interfaces/DashBoardInterface/DashBoardInterface"

export class DashboardService {
    public get = async (uid: string): Promise<Balance[]> => {
        const userCollectionRef: CollectionReference = collection(db, '/openingbalance')
        const ref: Query = query(userCollectionRef, where('uid', '==', uid))

        const data: QuerySnapshot = await getDocs(ref)
        const result = data.docs.map((doc: QueryDocumentSnapshot) => ({ ...doc.data(), id: doc.id }))

        return result as Balance[]
    }

    public set = async (value: number, uid: string): Promise<void> => {
        const userCollectionRef: CollectionReference = collection(db, '/openingbalance')

        await addDoc(userCollectionRef, {
            balance: value,
            uid: uid
        })
    }
}