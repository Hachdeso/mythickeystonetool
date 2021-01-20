import { Keystone } from "../keystones/keystones.controller";
import { CharacterData, CharactersController } from "./characters.controller";

export class CharacterServices {
    public orderCharactersData(
        charactersData: CharacterData[]
    ): CharacterData[] {
        function compare(a: CharacterData, b: CharacterData) {
            let comparison = 0;
            if (a.chessOne < b.chessOne) {
                comparison = 1;
            } else if (a.chessOne > b.chessOne) {
                comparison = -1;
            } else {
                if (a.chessTwo < b.chessTwo) {
                    comparison = 1;
                } else if (a.chessTwo > b.chessTwo) {
                    comparison = -1;
                } else {
                    if (a.chessThree < b.chessThree) {
                        comparison = 1;
                    } else if (a.chessThree > b.chessThree) {
                        comparison = -1;
                    }
                }
            }

            return comparison;
        }
        console.log(charactersData.sort(compare));
        return charactersData.sort(compare);
    }

    public orderKeystones(keystones: Keystone[]): Keystone[] {
        function compare(a: Keystone, b: Keystone) {
            let comparison = 0;

            if (a.level && b.level) {
                if (a.level < b.level) {
                    comparison = 1;
                } else if (a.level > b.level) {
                    comparison = -1;
                }
            }
            return comparison;
        }

        return keystones.sort(compare);
    }

    public getChessOne(keystones: Keystone[]): number {
        if (!keystones.length) return 0;
        return keystones[0].level;
    }

    public getChessTwo(keystones: Keystone[]): number {
        if (keystones.length < 4) return 0;
        return keystones[3].level;
    }

    public getChessThree(keystones: Keystone[]): number {
        if (keystones.length < 10) return 0;
        return keystones[9].level;
    }

    public getClassNameById(id: number): string {
        switch (id) {
            case 1:
                return "warrior";

            case 2:
                return "paladin";

            case 3:
                return "hunter";

            case 4:
                return "rogue";

            case 5:
                return "priest";

            case 6:
                return "deathKnight";

            case 7:
                return "shaman";

            case 8:
                return "mage";

            case 9:
                return "warlock";

            case 10:
                return "monk";

            case 11:
                return "druid";

            case 12:
                return "demonHunter";

            default:
                return "undefined";
        }
    }
}
