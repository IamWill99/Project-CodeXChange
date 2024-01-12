class User {
    private _id: number;
    private _username: string;
    private _password: string;
    private _email: string;
    private _firstname: string;
    private _lastname: string;

    public constructor (id: number, username: string, password: string, email: string, firstname: string, lastname: string) {
        this._id = id;
        this._username = username;
        this._password = password;
        this._email = email;
        this._firstname = firstname;
        this._lastname = lastname;
    }

    

}

class Votes {
    private _id: number;
    private _userid: number;
    private _questionid: number;
    private _answerid: number;
    private _votepositive: number;
    private _votenegative: number;

    public constructor (id: number, userid: number, questionid: number, answerid: number, votepositive: number, votenegative: number) {
        this._id = id;
        this._userid = userid;
        this._questionid = questionid;
        this._answerid = answerid;
        this._votepositive = votepositive;
        this._votenegative = votenegative;
    }
}






