export class User {

    constructor(_id = '', userName = '', password = '', name = '', email = '', image = ''){
        this._id = _id;
        this.userName = userName;
        this.password = password;
        this.name = name;
        this.email = email;
        this.image = image;
    }

    _id: string;
    userName: string;
    password: string;
    name: string;
    email: string;
    image: string;

}