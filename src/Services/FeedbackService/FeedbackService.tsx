import { CollectionReference, addDoc, collection } from "firebase/firestore"

import { db } from "../../Mocks/FirebaseConfig"

export class FeedbackService {
    public set = async (description: string): Promise<void> => {
        const postItCollectionRef: CollectionReference = collection(db, '/feedback')

        await addDoc(postItCollectionRef, {
            description: description,
        })
    }
}