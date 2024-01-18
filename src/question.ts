import "./config";
import { api, session, url } from "@hboictcloud/api";

// Deze functie zorgt voor een werkende menubalk.

function toggleNav():void {
    const navbar: HTMLDivElement = document.querySelector(".navigation") as HTMLDivElement;
    navbar.style.width = navbar.style.width === "200px" ? "0" : "200px" ;
}
// Dit zorg ervoor dat alle knoppen met het id toggle-button worden opgeroepen om de functie uit te voeren
document.querySelectorAll<HTMLButtonElement>(".toggle-button")
    .forEach((button: HTMLButtonElement) => button.addEventListener("click", toggleNav));
    

// Functie om een vraag te creëren en de UserID te gebruiken zodat we weten wie de vraag heeft gesteld
class VraagCreator {
    private vraagInput: HTMLInputElement;
    private vraagSnippetInput: HTMLTextAreaElement;

    public constructor() {
        this.vraagInput = document.querySelector("#vraagstellen") as HTMLInputElement;
        this.vraagSnippetInput = document.querySelector("#vraagsnippet") as HTMLTextAreaElement;
    }

    private getLoggedInUserID(): string | null {
        
        return session.get("user") || null;
    }

    public createVraag(): void {
        const vraag: string = this.vraagInput.value;
        const vraagSnippet: string = this.vraagSnippetInput.value;

        // Ophalen ID van gebruiker uit de sessie
        const userID: string | null = this.getLoggedInUserID();
        // Als voor één of andere reden de User niet is ingelogd, dan wordt er een console log achter gelaten
        if (!userID) {
            alert("Gebruiker is niet ingelogd.");
            return;
        }

        console.log("text");
        console.log(vraagSnippet);

        const maakVraagAan: string = "INSERT INTO question (UserID, Question, Questionsnippet) VALUES (?, ?, ?)";
        api.queryDatabase(maakVraagAan, userID, vraag, vraagSnippet);
        console.log("Nieuwe vraag is aangemaakt.");
    }
}

// Maak een instantie van de klasse VraagCreator
const vraagCreator: VraagCreator = new VraagCreator();

// Hier wordt de actie uitgevoerd wanneer er op de knop gedrukt wordt.
const vraagKnop: HTMLButtonElement | null = document.querySelector("#vraagbutton");
if (vraagKnop) {
    vraagKnop.addEventListener("click", () => vraagCreator.createVraag());
}

class vraagDisplay{
    public _ID: HTMLOutputElement;
    public _UserID: HTMLOutputElement;
    public _question: HTMLOutputElement;
    public _questionSnippet: HTMLOutputElement;

    public constructor() {
        this._ID = document.querySelector("#ID") as HTMLOutputElement;
        this._UserID = document.querySelector("#UserID") as HTMLOutputElement;
        this._question = document.querySelector("#question") as HTMLOutputElement;
        this._questionSnippet = document.querySelector("#questionSnippet") as HTMLOutputElement;
    }

    public laatvraagzien(){

        

        const getVraag: string = "SELECT FROM question (ID, UserID, Question, Questionsnippet) VALUES (?, ?, ?, ?)";
        api.queryDatabase(getVraag, this._ID, this._UserID, this._question, this._questionSnippet);
        console.log("vragen worden laten zien.");
    }
}