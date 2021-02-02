

export class User {

    static fromFirebase({ email, uid, username }: {email:string, uid:string, username:string}){
        return new User(uid, username, email);
    }

    constructor(
        public uid: string | undefined,
        public username: string,
        public email: string | null | undefined
    ){}

}