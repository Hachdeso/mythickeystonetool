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
}
