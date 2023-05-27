export interface DynamicDataServices {
    [key: string]: any;
};

export interface IDataService<T> {
    getData(params: DynamicDataServices): Promise<T[]>;
    deleteData(params: DynamicDataServices): Promise<void>;
    createData(params: DynamicDataServices): Promise<void>;
    editData(params: DynamicDataServices): Promise<void>;
};
