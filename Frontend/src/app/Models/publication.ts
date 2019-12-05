export class Publication {

    constructor(_id = '', user = '', publication = '', createAt = ''){
        this._id = _id;
        this.user = user;
        this.publication = publication;
        this.createAt = createAt;
    }

    _id: string;
    user: string;
    publication: string;
    createAt: string;

}