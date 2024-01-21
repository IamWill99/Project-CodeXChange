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


// Functie om een vraag te creëren samen met de codesnippet. Verder wordt er gekeken naar de username in
// de database, zodat we te zien krijgen wie de vraag heeft gesteld
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

                const codeSnippetText: any = this.htmlEntitiesDecode(vraag.Questionsnippet);

                //Hier wordt letterlijk het element van de vraag en username geplaatst op de webpagina
                vraagElement.innerHTML = `
                    <p class="username-text"><u><strong>Gebruiker:</strong></u> ${vraag.username}</p>
                    <p><strong>Vraag:</strong> ${vraag.Question}</p>
                    <p><strong>Codesnippet:</strong> <span class="code-snippet-text">${codeSnippetText}</span></p>
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

    
    // Deze functie zorgt ervoor dat de code in codesnippet niet letterlijk wordt genomen en als
    // platte tekst op de webpagina komt te staan. Zo worden er bugs voorkomen.
    private htmlEntitiesDecode(input: string): string {
        const doc:any = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent || "";
    }

    //dit zorgt ervoor dat de ID van de user wordt opgehaald zodat je weet wie de vraag schrijft
    private getLoggedInUserID(): string | null {

        return session.get("user") || null;
    }
    
    public async loadGebruikerVragen(gebruikersnaam: string): Promise<void> {
        // Voer de query uit om vragen van de specifieke gebruiker op te halen
        const vragen: any = await api.queryDatabase(`
            SELECT *
            FROM question
            WHERE Username = ?
        `, gebruikersnaam);
    
        // Verwerk en toon de vragen op de pagina
        this.displayVragen(vragen);
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


// Met deze knop wordt de gebruiker gebracht naar een aparte pagina met zijn eigen vragen. Deze functie
// haalt de username uit de sessie, zodat je alleen je eigen vragen te zien krijgt.
const mijnVragenButton: HTMLButtonElement | null = document.querySelector("#mijnVragenButton");
if (mijnVragenButton) {
    mijnVragenButton.addEventListener("click", () => {
        // Haal gebruikersnaam op uit de sessie
        const gebruikersnaam: string | null = session.get("username");

        if (gebruikersnaam) {
            // Maak de nieuwe URL met de gebruikersnaam als queryparameter
            const nieuweURL:any = `mijnVragen.html?gebruiker=${encodeURIComponent(gebruikersnaam)}`;

            // Doorverwijzen naar de nieuwe pagina
            window.location.href = nieuweURL;
        }
    });
}
