import "./config";
import { api, session, url } from "@hboictcloud/api";



function toggleNav():void {
    const navbar: HTMLDivElement = document.querySelector(".navigation") as HTMLDivElement;
    navbar.style.width = navbar.style.width === "200px" ? "0" : "200px" ;
}
// Dit zorg ervoor dat alle knoppen met het id toggle-button worden opgeroepen om de functie uit te voeren
document.querySelectorAll<HTMLButtonElement>(".toggle-button")
.forEach((button: HTMLButtonElement) => button.addEventListener("click", toggleNav));

class Question {

    private _id: number;
    private _userId: number;
    private _question: string;
    private _questionSnippet: string;

    public constructor(id: number, userId: number, question: string, questionSnippet: string) {
        this._id = id;
        this._userId = userId;
        this._question = question;
        this._questionSnippet = questionSnippet;
    }

    public get id(): number  {
        return this._id;
    }
 
    public set id(id: number) {
        this._id = id;
    }

    public get userId(): number  {
        return this._userId;
    }
 
    public set userId(userId: number) {
        this._userId = userId;
    }

    public get question(): string  {
        return this._question;
    }
 
    public set question(question: string) {
        this._question = question;
    }

    public get questionSnippet(): string  {
        return this._questionSnippet;
    }
 
    public set questionsnippet(questionSnippet: string) {
        this._questionSnippet = questionSnippet;
    }

} 

const vraag: Question = new Question(1, 2, "hallo", "doei");
console.log(vraag.id, vraag.userId, vraag.question, vraag.questionSnippet);



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
