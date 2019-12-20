export class Publication {

    constructor(_id = '', user = '', imageUser = '', publication = '', createAt = ''){
        this._id = _id;
        this.user = user;
        this.imageUser = imageUser;
        this.publication = publication;
        this.createAt = createAt;
    }

    _id: string;
    user: string;
    imageUser: string;
    publication: string;
    createAt: string;

}