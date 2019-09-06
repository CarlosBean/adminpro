export interface IDoctor {
    name?: string;
    img?: string;
    user?: string;
    hospital?: string;
    _id?: string;
}


export class Doctor implements IDoctor {
    constructor(
        public name?: string,
        public img?: string,
        public user?: string,
        public hospital?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ) { }
}
