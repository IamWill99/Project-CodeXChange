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
