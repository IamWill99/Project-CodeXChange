import "./config";
import { api, session, url } from "@hboictcloud/api";
import { User } from "./models/user";

/**
 * Deze methode wordt aangeroepen als de pagina is geladen, dat gebeurd helemaal onderin!
 */
async function setup(): Promise<void> {
    // Kijk of de gebruiker is ingelogd anders mag je hier niet komen.
    security();

    // Maak een actie aan voor de logout knop. Als je hier op drukt wordt de logout functie aangeroepen
    document.querySelector(".logout-btn")?.addEventListener("click", logout);

    // Haal alle gegevens van de gebruiker op uit de database en stop dat in het model User
    const user: User | undefined = await getUserInfo(session.get("user"));

    // vul naam is uit het object in de sessie
    if (user) {
        document.querySelector(".name")!.innerHTML = user.firstname + " " + user.lastname;
    }
}

/**
 * Check if the user is logged in
 * De methode geeft niets terug (void) en heeft daarom geen return statement
 */
function security(): void {
    // Als de sessie met naam user_id niet bestaat (door de ! werkt de if als nietwaar) dan is de gebruiker niet ingelogd
    if (!session.get("user") || session.get("user") === undefined) {
        // Stuur de gebruiker door naar de login pagina
        url.redirect("login.html");
    }
}

/**
 * Haal alle gegevens van de gebruiker op uit de database
 * @param id
 * @returns user object
 */
async function getUserInfo(userid: number): Promise<User | undefined> {
    try {
        const data: any = await api.queryDatabase("SELECT * FROM user WHERE id = ?", userid);

        if (data.length > 0) {
            const user: User = new User(
                data[0]["id"],
                data[0]["username"],
                data[0]["email"],
                data[0]["firstname"],
                data[0]["lastname"]
            );
            return user;
        }
        return undefined;
    } catch (error) {
        console.error(error);

        return undefined;
    }
}

/**
 * Logout van de gebruiker door de sessie te verwijderen
 * De methode geeft niets terug (void) en heeft daarom geen return statement
 */
function logout(): void {
    //Verwijder de sessies
    session.remove("user");

    //Stuur de gebruiker door naar de login pagina
    url.redirect("login.html");
}

//Run bij het opstarten de setup functie
await setup();

//Dit pakt de class van de verwijderknop in de HTML. Als je er op klikt komt er een bevestigingsscherm.
document.querySelector(".delete-account-btn")?.addEventListener("click", showConfirmationDialog);

//functie waar een popup komt die vraagt of je je account wil verwijderen. Wanneer de gebruiker op ja drukt
//dan wordt de functie deleteAccount geactiveerd.
async function showConfirmationDialog(): Promise<void> {
    const confirmDelete: any = confirm("Weet je zeker dat je je account wilt verwijderen?");

    if (confirmDelete) {
        await deleteAccount();
    }
}

//Functie om je account te verwijderen. Hij checkt de user in de sessie, dan verwijdert hij deze user uit
//de database.
async function deleteAccount(): Promise<void> {
    const userId: number | undefined = session.get("user");

    if (userId !== undefined) {
        try {
            //Verwijder de gebruiker uit de database
            await api.queryDatabase("DELETE FROM user WHERE id = ?", userId);

            //Verwijder de sessies
            session.remove("user");


            //Stuur de gebruiker door naar de login pagina
            url.redirect("login.html");
        } catch (error) {
            console.error(error);
        }
    }
}
