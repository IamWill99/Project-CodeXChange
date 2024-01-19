import "./config";
import { api, session, url } from "@hboictcloud/api";

// Deze functie zorgt voor een werkende menubalk.

function toggleNav(): void {
    const navbar: HTMLDivElement = document.querySelector(".navigation") as HTMLDivElement;
    navbar.style.width = navbar.style.width === "200px" ? "0" : "200px";
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
    //dit zorgt ervoor dat de ID van de user wordt opgehaald zodat je weet wie de vraag schrijft

    public createVraag(): void {
        const vraag: string = this.vraagInput.value;
        const vraagSnippet: string = this.vraagSnippetInput.value;

        // Ophalen ID van gebruiker uit de sessie
        const userID: string | null = this.getLoggedInUserID();
        // Als voor één of andere reden de User niet is ingelogd, dan wordt er een console log achter gelaten waarin staat dat de user niet ingelogd is
        if (!userID) {
            alert("Gebruiker is niet ingelogd.");
            return;
        }

        console.log("text");
        console.log(vraagSnippet);

        const maakVraagAan: string = "INSERT INTO question (UserID, Question, Questionsnippet) VALUES (?, ?, ?)";
        api.queryDatabase(maakVraagAan, userID, vraag, vraagSnippet);
        console.log("Nieuwe vraag is aangemaakt.");
        // deze code is om de ingevuld gegevens in de database op te slaan het word dus in de question tabel opgeslagen
    }
}

// Maak een instantie van de klasse VraagCreator
const vraagCreator: VraagCreator = new VraagCreator();

// Hier wordt de actie uitgevoerd wanneer er op de knop gedrukt wordt.
const vraagKnop: HTMLButtonElement | null = document.querySelector("#vraagbutton");
if (vraagKnop) {
    vraagKnop.addEventListener("click", () => vraagCreator.createVraag());
}

class VraagDisplay {
    public _ID: string;
    public _UserID: string;
    public _question: HTMLTextAreaElement;
    public _questionSnippet: HTMLTextAreaElement;

    public constructor() {
        this._ID = "";
        this._UserID = session.get("user");
        console.log(this._UserID);
        
        this._question = this.getElement("#question");
        this._questionSnippet = this.getElement("#questionSnippet");
    }

    private getElement(selector: string): HTMLTextAreaElement {
        console.log(selector);
        
        const element: HTMLTextAreaElement | null = document.querySelector(selector);
        if (!element) {
            throw new Error(`Element with selector ${selector} not found.`);
        }
        return element;
    }

    public async laatVraagZien(): Promise<void> {
        try {
            
            const vraagophalen: string = "SELECT * FROM question WHERE UserID = 1";
            const response: any = await api.queryDatabase(vraagophalen, this._ID, this._UserID, this._question, this._questionSnippet);
            // const vraagData: any = await this.fetchVraagData();
            // console.log(document.querySelectorAll("#question"));
            console.log(response);
            console.log(this._question);
            
            this._question.value = response[0].Question;
                        
            
            console.log("Vragen worden laten zien.");
        } catch (error: any) {
            console.error("Er is een fout opgetreden");
            console.error(error);
        }
    }

    public async fetchVraagData(): Promise<any> {
        const vraagophalen: string = "SELECT * FROM question WHERE UserID = 1";
        const response: any = await api.queryDatabase(vraagophalen, this._ID, this._UserID, this._question, this._questionSnippet);
        // code voor het ophalen van de gestelde vragen
        //  = await fetch(vraagophalen);
        // console.log(response);
        console.log(response);
        
        return response;
    }

}


// Hier wordt de actie uitgevoerd wanneer er op de knop gedrukt wordt.
const vraaglatenzien: HTMLButtonElement = document.querySelector("#vraagzien") as HTMLButtonElement;
const vraagDisplay: VraagDisplay = new VraagDisplay;
const data: any = vraaglatenzien.addEventListener("click", vraagDisplay.fetchVraagData);


const questionElement: any = document.getElementById("question") as HTMLTextAreaElement;
questionElement.value = "";