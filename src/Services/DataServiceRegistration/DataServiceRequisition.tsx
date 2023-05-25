import { DynamicDataServices, IDataService } from "../../Interfaces/DataServiceRequisition/DataServiceRequisition";
import { collection, query, where, getDocs, doc, deleteDoc, addDoc, DocumentData, CollectionReference, Query, QuerySnapshot, DocumentReference, setDoc, updateDoc } from "firebase/firestore"

import { db } from "../../Mocks/FirebaseConfig"

export class DataServiceRequisition<T> implements IDataService<T> {

    async getData(params: DynamicDataServices) {
        const postItCollectionRef: CollectionReference = collection(db, params.route)
        const ref: Query = query(postItCollectionRef, where('userUid', '==', params.userUid))

        const data: QuerySnapshot = await getDocs(ref)

        return data.docs.map((doc: DocumentData) => ({ ...doc.data(), id: doc.id }))
    }

    async deleteData(params: DynamicDataServices): Promise<void> {
        await deleteDoc(doc(db, params.route, params.id));
    }

    async createData(params: DynamicDataServices): Promise<void> {
        const newDocRef = doc(collection(db, params.route));

        const { route, ...modifiedParameters } = params;

        await setDoc(newDocRef, modifiedParameters);
    }

    public editData = async (params: DynamicDataServices): Promise<void> => {
        const editUserSaldo: DocumentReference = doc(db, params.route, params.id);
        const { route, id, ...modifiedParameters } = params;
        
        return await updateDoc(editUserSaldo, modifiedParameters);
    }
}