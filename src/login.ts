import "./config";
import { api, session, url } from "@hboictcloud/api";

/**
 * Deze methode wordt aangeroepen als de pagina is geladen, dat gebeurt helemaal onderin!
 */
function setup(): void {
    // Maak een actie aan voor de login knop. Als je hier op drukt wordt de code tussen de { } aangeroepen
    document.querySelector(".login-btn")?.addEventListener("click", async () => {
        // Haal de waarden uit de inputvelden met het id username en password
        const username: string = (<HTMLInputElement>document.getElementById("username")).value;
        const password: string = (<HTMLInputElement>document.getElementById("password")).value;

        // Roep de loginFromDatabase functie aan (op regel 50) en geef username en password mee
        try {
            const data: any = await loginFromDatabase(username, password);
            
            if (data.length > 0) {
                // Maak user object aan met de waarden uit de database
                // Sla de gebruikersgegevens op in een sessie
                session.set("user", data[0].id);

                // Stuur de gebruiker door naar de homepagina
                url.redirect("/index.html");
            } else {
                // Als de gebruiker niet bestaat, geef melding aan gebruiker door in de css (bootstrap) de display op block te zetten
                document.getElementsByClassName("alert-danger")[0].setAttribute("style", "display: block");

                // Maak de inputvelden weer leeg
                (<HTMLInputElement>document.getElementById("username")).value = "";
                (<HTMLInputElement>document.getElementById("password")).value = "";
            }
        } catch (error) {
            // als het niet lukt de data op te halen, geef de gebruiker een foutmelding
            console.log("Fout bij inloggen");
        }
    });
}

/**
 *
 * @param username
 * @param password
 * @returns Array with the user data
 */
async function loginFromDatabase(username: string, password: string): Promise<Array<any> | undefined> {
    // proberen de data op te halen uit de database
    try {
        const data: any = await api.queryDatabase(
            "SELECT id FROM user WHERE username = ? AND password = ?",
            username,
            password
        );

        return data;
    } catch (error) {
        // als het niet lukt de data op te halen, geef een lege array terug
        return [];
    }
}

// Roep de setup functie aan als de pagina is geladen
setup();

// Met deze functie kan de User een account aanmaken op de registratiewebsite. Er zijn drie velden
// waar de gebruiker zijn/haar naam, email en wachtwoord invult. Deze gegevens worden vervolgens opgeslagen
// in de database. Zo kunnen ze deze gegevens gebruiken om later in te loggen.

function createUser(): void {
    const gebruikersnaamInput: HTMLInputElement = document.querySelector("#usernameregistreer") as HTMLInputElement;
    const gebruikersnaam: string = gebruikersnaamInput.value;
    const EmailInput: HTMLInputElement = document.querySelector("#emailregistreer") as HTMLInputElement;
    const Email: string = EmailInput.value;
    const WachtwoordInput: HTMLInputElement = document.querySelector("#passwordregistreer") as HTMLInputElement;
    const Wachtwoord: string = WachtwoordInput.value;
    const firstnameInput: HTMLInputElement = document.querySelector("#firstname") as HTMLInputElement;
    const firstname: string = firstnameInput.value;
    const lastnameInput: HTMLInputElement = document.querySelector("#lastname") as HTMLInputElement;
    const lastname: string = lastnameInput.value;

// if statement 

    // Hier worden de ingevulde velden naar de database gestuurd met de "INSERT INTO" functie. De console log
    // geeft vervolgens de "account is aangemaakt" melding.
   
    const waaromwerkthetniet: string = "INSERT INTO user (username, password, email, firstname, lastname) VALUES (?, ?, ?, ?, ?)";
    api.queryDatabase(waaromwerkthetniet, gebruikersnaam, Wachtwoord, Email, firstname, lastname);
    console.log("Account is aangemaakt.", gebruikersnaam);
}

// Dit is betreft de registreerknop op de website. Deze lijn code reageert als de user op de knop drukt
// en activeerd de CreateUser functie die hierboven staat.

const registreerknop: HTMLButtonElement = document.querySelector("#registreerButton") as HTMLButtonElement;
registreerknop.addEventListener("click", createUser);


