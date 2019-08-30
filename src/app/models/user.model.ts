export interface IUser {
    name: string;
    email: string;
    img?: string;
    google?: boolean;
    role?: string;
    _id?: string;
    password?: string;
    // tslint:disable-next-line: variable-name
}

export class User implements IUser {
    constructor(
        public name: string,
        public email: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public password?: string,
    ) { }
}
