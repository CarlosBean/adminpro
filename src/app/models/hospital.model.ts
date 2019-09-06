export interface IHospital {
    name: string;
    img?: string;
    _id?: string;
}

export class Hospital implements IHospital {
    constructor(
        public name: string,
        public img?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ) { }
}
