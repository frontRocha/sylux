import { CollectionReference, DocumentData, DocumentReference, Query, QueryDocumentSnapshot, QuerySnapshot, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"

import { db } from "../../Mocks/FirebaseConfig"

import { Balance } from "../../Interfaces/DashBoardInterface/DashBoardInterface"
import { Type } from "../../Interfaces/DashBoardInterface/ComponentsCrud/ComponentsCrud"

export class ValuesService {
  public getBalance = async (uid: string): Promise<Balance[]> => {
    const userValueRef: CollectionReference = collection(db, '/openingbalance')
    const saldoRef: Query = query(userValueRef, where('uid', '==', uid))

    const dataMoney: QuerySnapshot = await getDocs(saldoRef)

    return dataMoney.docs.map((doc: DocumentData) => ({ ...doc.data(), id: doc.id }))
  }

  public getDataValues = async (uid: string): Promise<QuerySnapshot> => {
    const userValueRef: CollectionReference = collection(db, '/taskbills')
    const saldoRef: Query = query(userValueRef, where('uid', '==', uid))

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
      }
    });

    return {
      despesa: despesaValues.reduce((a: number, b: number) => a + b, 0),
      lucro: lucroValues.reduce((a: number, b: number) => a + b, 0),
    };
  }

  public getTypeValues = async (uid: string): Promise<Type> => {
    const dataValues: QuerySnapshot = await this.getDataValues(uid);

    return this.calculateValues(dataValues);
  }

  public editBalance = async (value: number, id: string): Promise<void> => {
    const editUserSaldo: DocumentReference = doc(db, '/openingbalance', id)
    const newBalance: object = { balance: value }

    return await updateDoc(editUserSaldo, newBalance)
  }
}