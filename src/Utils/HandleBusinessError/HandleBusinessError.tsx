import { toast } from "react-toastify";

export function handleBusinessError(error: Error) {
    toast.error(error.message);
};

export const verifyValidateUser = (userUid: string | undefined) => {
    if(!userUid) {
        throw Error('Usuário não autenticado')
    };

    return userUid;
};

export const showSuccessMessage = (message: string) => {
    toast.success(message);
};