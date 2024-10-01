Teoretiska resonemang:

Jag valde att använda MongoDB som databas. Eftersom vi nyligen jobbat med GraphQL och mitt fokus låg på att få allt att funka med typescript så försökte jag hålla det så enkelt som möjligt medan jag lär mig grunderna. 

Jag upplevde att MongoDB var mycket snabbare att sätta upp och gav mig färre problem på min dator än MySQL, dessutom verkade det vara mer flexibelt ifall jag skulle köra fast och något behöver ändras.
Det kändes lättare att jobba med, särskilt när backenden är ganska simpel.

Jag använder dessa npm-paket:
Express: Ramverk för Node.js som underlättar hantering av routing och HTTP-förfrågningar. <br>
Mongoose: ODM som körs mot MongoDB, man skriver scheman och modeller för datat som ska in.<br>
TypeScript: Ett språk ovanpå JavaScript, hjälper till att förebygga fel genom typning.<br>
dotenv: Hjälper till att hantera miljövariabler på ett säkert sätt, förhindrar att känslig information läcker ut.<br>
express-validator: Används för att validera det som skickas in och att det uppfyller vissa krav, tex längden på lösenord.<br>

Applikationen är ett RESTful API som tillåter användare att skapa, läsa, uppdatera och ta bort användare och uppgifter.
När man skickar en förfrågan hanterar Express den genom routes och controllers.
Valideringsmiddleware kontrollerar att inkommande data är korrekt innan den skickas vidare och körs.
Om allt är i sin ordning interagerar applikationen med MongoDB via Mongoose för att göra olika saker med databasen, tex skapa, ta bort, ändra eller uppdatera nya användare och tasks.

