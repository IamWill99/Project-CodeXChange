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

class VraagDisplay {
    public _ID: HTMLOutputElement;
    public _UserID: HTMLOutputElement;
    public _question: HTMLOutputElement;
    public _questionSnippet: HTMLOutputElement;

    public constructor() {
        this._ID = this.getElement("#ID");
        this._UserID = this.getElement("#UserID");
        this._question = this.getElement("#question");
        this._questionSnippet = this.getElement("#questionSnippet");
    }

    private getElement(selector: string): HTMLOutputElement {
        const element: HTMLOutputElement | null = document.querySelector(selector);
        if (!element) {
            throw new Error(`Element with selector ${selector} not found.`);
        }
        return element;
    }

    public async laatVraagZien(): Promise<void> {
        try {
            const vraagData: any = await this.fetchVraagData();
            this.setToHtmlElements(vraagData);
            console.log("Vragen worden laten zien.");
        } catch (error: any) {
            console.error("Er is een fout opgetreden");
        }
    }

    private async fetchVraagData(): Promise<any> {
        const vraagQuery: string = "/api/getQuestion"; // URL voor het ophalen van vraaggegevens
        const response: Response = await fetch(vraagQuery);
        if (!response.ok) {
            throw new Error(`Fout bij het ophalen van vraaggegevens: ${response.status}`);
        }
        return await response.json();
    }

    private setToHtmlElements(vraagData: any): void {
        // Pas dit aan op basis van de structuur van je vraagData-object.
        this._ID.innerHTML = String(vraagData.ID);
        this._UserID.innerHTML = String(vraagData.UserID);
        this._question.innerHTML = String(vraagData.Question);
        this._questionSnippet.innerHTML = String(vraagData.Questionsnippet);
    }
}

// Voorbeeldgebruik van de VraagDisplay-klasse.
const vraagDisplay: VraagDisplay = new VraagDisplay();
vraagDisplay.laatVraagZien();
