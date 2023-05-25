const createInstance = <U, V>(Class: new (service: U, route: string, uid: string) => V, service: U, route: string, uid: string): V => {
    const instance = new Class(service, route, uid);
    return instance;
};

export const createControllerInstance = <U, V>(Class: new (service: U, route: string, uid: string) => V, service: U, route: string, uid: string): V => {
    return createInstance(Class, service, route, uid);
};