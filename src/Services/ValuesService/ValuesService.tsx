import { CollectionReference, Query, QueryDocumentSnapshot, QuerySnapshot, collection, getDocs, query,  where } from "firebase/firestore";

import { db } from "../../Mocks/FirebaseConfig";

import { Type } from "../../Interfaces/DashBoardInterface/ComponentsCrudInterface/ComponentsCrudInterface";

export class ValuesService {

    public getDataValues = async (uid: string): Promise<QuerySnapshot> => {
        const userValueRef: CollectionReference = collection(db, '/taskbills');
        const saldoRef: Query = query(userValueRef, where('userUid', '==', uid));

        return await getDocs(saldoRef);
    }

    public calculateValues = (dataValues: QuerySnapshot) => {
        const despesaValues: number[] = [];
        const lucroValues: number[] = [];

        dataValues.docs.forEach((doc: QueryDocumentSnapshot) => {
            if (doc.data().type === "despesa") {
                despesaValues.push(doc.data().value);
            } else {
                lucroValues.push(doc.data().value);
            };
        });

        return {
            despesa: despesaValues.reduce((a: number, b: number) => a + b, 0),
            lucro: lucroValues.reduce((a: number, b: number) => a + b, 0),
        };
    };

    public getTypeValues = async (uid: string): Promise<Type> => {
        const dataValues: QuerySnapshot = await this.getDataValues(uid);

        return this.calculateValues(dataValues);
    };
};