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

    public get username(): string  {
        return this._username;
    }
 
    public set username(username: string) {
        this._username = username;
    }

    public get lastname(): string  {
        return this._lastname;
    }
 
    public set lastname(lastname: string) {
        this._lastname = lastname;
    }

}

const william: User = new User(4, "William", "wat", "is", "dit", "Boutros");
console.log(william.username, william.lastname);


class Question {

    private _id: number;
    private _userId: number;
    private _question: string;
    private _questionSnippet: string;
    private _questionDate: Date;

    public constructor(id: number, userId: number, question: string, questionSnippet: string, questionDate: Date) {
        this._id = id;
        this._userId = userId;
        this._question = question;
        this._questionSnippet = questionSnippet;
        this._questionDate = questionDate;
    }

    
    public get question(): string  {
        return this._question;
    }
 
    public set question(question: string) {
        this._question = question;
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


class Answer {

    private _id: number;
    private _userId: number;
    private _questionId : number;
    private _answer: string;
    private _answerSnippet: string;
    private _answerDate: Date;

    public constructor(id: number, userId: number, questionId: number, answer: string, answerSnippet: string, answerDate: Date) {
        this._id = id;
        this._userId = userId;
        this._questionId = questionId;
        this._answer = answer;
        this._answerSnippet = answerSnippet;
        this._answerDate = answerDate;
    }
}




