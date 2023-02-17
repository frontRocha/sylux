import { collection, query, where, getDocs, doc, deleteDoc, addDoc, DocumentData, CollectionReference, Query, QuerySnapshot, DocumentReference } from "firebase/firestore"

import { db } from "../../Mocks/FirebaseConfig"

import { PostItItens } from "../../Interfaces/PostIt/PostIt"

export class PostItService {
    public get = async (uid: string): Promise<PostItItens[]> => {
        const postItCollectionRef: CollectionReference = collection(db, '/postits')
        const ref: Query = query(postItCollectionRef, where('uid', '==', uid))

        const data: QuerySnapshot = await getDocs(ref)

        return data.docs.map((doc: DocumentData) => ({ ...doc.data(), id: doc.id }))
    }

    public delete = async (id: string): Promise<void> => {
        const postIdDoc: DocumentReference = doc(db, "/postits", id)

        await deleteDoc(postIdDoc)
    }

    public set = async (uid: string, title: string): Promise<void> => {
        const postItCollectionRef: CollectionReference = collection(db, '/postits')

        await addDoc(postItCollectionRef, {
            title: title,
            uid: uid
        })
    }
}