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

    public async loadVragen(): Promise<void> {
        // Haal vragen en username op uit de database, zodat we kunnen kijken wie de vraag heeft gesteld
        const vragen: any = await api.queryDatabase(`
        SELECT question.*
        FROM question
    `);

        //toon de vragen op de pagina
        this.displayVragen(vragen);
    } 

    private displayVragen(vragen: any[]): void {
        // Container waarin de vragen worden weergegeven
        const vragenContainer: HTMLElement | null = document.querySelector("#vragenContainer");

        if (vragenContainer) {
            // Maak voor elke vraag een nieuw HTML-element aan
            vragen.forEach((vraag: any) => {
                const vraagElement: HTMLElement = document.createElement("div");
                vraagElement.className = "vraag-item";

                vraagElement.innerHTML = `
                    <p class="username-text"><strong>Gebruikersnaam:</strong> ${vraag.username}</p>
                    <p><strong>Vraag:</strong> ${vraag.Question}</p>
                    <p><strong>Codesnippet:</strong> ${vraag.Questionsnippet}</p>
                    <hr>
                `;

                const codeSnippetParagraph: HTMLElement | null = vraagElement.querySelector(".code-snippet-text");
                if (codeSnippetParagraph) {
                    codeSnippetParagraph.textContent = vraag.Questionsnippet;
                }

                // Voeg het nieuwe element toe aan de container
                vragenContainer.appendChild(vraagElement);
            });
        }
    }

    //dit zorgt ervoor dat de ID van de user wordt opgehaald zodat je weet wie de vraag schrijft
    private getLoggedInUserID(): string | null {

        return session.get("user") || null;
    }
    

    public createVraag(): void {
        const vraag: string = this.vraagInput.value;
        const vraagSnippet: string = this.vraagSnippetInput.value;

        // Ophalen gebruikersnaam uit de sessie
        const username: string | null = session.get("username");

        // Als voor één of andere reden de gebruikersnaam niet beschikbaar is, geef een foutmelding
        if (!username) {
            alert("Gebruikersnaam is niet beschikbaar.");
            return;
        }


        // Ophalen ID van gebruiker uit de sessie
        const userID: string | null = this.getLoggedInUserID();

        // Als voor één of andere reden de User niet is ingelogd, dan wordt er een console log achter gelaten waarin staat dat de user niet ingelogd is
        if (!userID) {
            alert("Gebruiker is niet ingelogd.");
            return;
        }

        console.log("text");
        console.log(vraagSnippet);
        
        // deze code is om de ingevuld gegevens in de database op te slaan het word dus in de question tabel opgeslagen
        const maakVraagAan: string = "INSERT INTO question (UserID, Question, Questionsnippet, username) VALUES (?, ?, ?, ?)";
        api.queryDatabase(maakVraagAan, userID, vraag, vraagSnippet, username);


        console.log("Nieuwe vraag is aangemaakt.");
        
        

    }



            
}

        
// Maak een instantie van de klasse VraagCreator
const vraagCreator: VraagCreator = new VraagCreator();

document.addEventListener("DOMContentLoaded", () => vraagCreator.loadVragen());


// Hier wordt de actie uitgevoerd wanneer er op de knop gedrukt wordt.
const vraagKnop: HTMLButtonElement | null = document.querySelector("#vraagbutton");
if (vraagKnop) {
    vraagKnop.addEventListener("click", () => vraagCreator.createVraag());
}



