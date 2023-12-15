import "./config";
import { api, session, url } from "@hboictcloud/api";

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

    console.log("Hallo");



    if (!gebruikersnaamInput.value || !EmailInput.value || !WachtwoordInput.value || !firstnameInput.value || !lastnameInput.value) {
        // Toon een foutmelding of voer andere acties uit als de voorwaarden niet zijn voldaan
        console.log("Vul alle velden in voordat u registreert.");
        return;
    }
    console.log("2");

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(EmailInput.value)) {
        // Toon een foutmelding of voer andere acties uit als het e-mailadres niet geldig is
        console.log("Voer een geldig e-mailadres in.");
        return;
    }

    // Voer wachtwoordvalidatie uit
    const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(WachtwoordInput.value)) {
        // Toon een foutmelding of voer andere acties uit als het wachtwoord niet geldig is
        console.log("Het wachtwoord moet minimaal 8 tekens lang zijn en minimaal één letter en één cijfer bevatten.");
        return;
    }

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