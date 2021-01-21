import { Keystone } from "./keystones.controller";

export class KeystonesServices {
    public isInCurrentPeriod(timestamp: number): boolean {
        const now = new Date();
        const dayOfWeek = now.getDay();
        var lastWednesday = new Date();
        if (dayOfWeek === 0) {
            lastWednesday.setDate(now.getDate() - 4);
        } else if (dayOfWeek >= 3) {
            lastWednesday.setDate(now.getDate() - (dayOfWeek - 3));
        } else {
            lastWednesday.setDate(now.getDate() - dayOfWeek + 4);
        }

        return new Date(timestamp) > lastWednesday;
    }

    public getDungeonNameById(id: number): string {
        switch (id) {
            case 375:
                return "Brumes de Tirna Scithe";

            case 376:
                return "Sillage nécrotique";

            case 377:
                return "L'Autre côté";

            case 378:
                return "Salles de l'Expiation";

            case 379:
                return "Malepeste";

            case 380:
                return "Profondeurs Sanguines";

            case 381:
                return "Flèches de l'Ascension";

            case 382:
                return "Théâtre de la Souffrance";

            default:
                return "undefined";
        }
    }
}
