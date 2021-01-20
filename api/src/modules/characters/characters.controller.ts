import { Request, Response } from "express";
import { api } from "../../blizzapi";
import axios, { AxiosResponse } from "axios";
import { Keystone } from "../keystones/keystones.controller";
import { CharacterServices } from "./characters.services";

interface Character {
    name: string;
    realmSlug: string;
}

interface CharacterKeystone {
    name: string;
    keystones: Keystone[];
}

interface CharacterData {
    name: string;
    keystones: Keystone[];
    chessOne: number;
    chessTwo: number;
    chessThree: number;
}

export class CharactersController {
    public async get(req: Request, res: Response) {
        const token = await api.getAccessToken();
        const blizzardResponse = await axios.get(
            "https://eu.api.blizzard.com/data/wow/guild/dalaran/lames-de-wrynn/roster?namespace=profile-eu&locale=en_EU&access_token=" +
                token
        );
        const blizzardMembers: any[] = blizzardResponse.data.members;
        const formatMembers: any[] = [];

        blizzardMembers.forEach((blizzardMember) => {
            const character = blizzardMember.character;
            if (character.level === 60) {
                formatMembers.push({
                    name: character.name,
                    realmSlug: character.realm.slug,
                });
            }
        });

        res.status(200).json(formatMembers);
    }

    public async getWithKeystones(req: Request, res: Response) {
        let charactersResponse: AxiosResponse<any> | undefined;

        try {
            charactersResponse = await axios.get(
                "http://localhost:3000/api/characters"
            );
        } catch (e) {
            console.log(e);
        }

        if (!charactersResponse) return;

        const characters: Character[] = charactersResponse.data;
        console.log(characters);
        const toReturn: any[] = [];

        characters.forEach((character) => {
            axios
                .get(
                    "http://localhost:3000/api/keystones/" +
                        character.realmSlug +
                        "/" +
                        character.name.toLowerCase()
                )
                .then((response) => {
                    toReturn.push({
                        name: character.name,
                        keystones: response.data,
                    });
                    if (toReturn.length === characters.length) {
                        return res.status(200).json(toReturn);
                    }
                });
        });
    }

    public async getFinalData(req: Request, res: Response) {
        const charactersKeystonesResponse = await axios.get(
            "http://localhost:3000/api/characters/keystones"
        );

        const charactersKeystones: CharacterKeystone[] =
            charactersKeystonesResponse.data;

        console.log(charactersKeystones);

        const toReturn: CharacterData[] = [];

        charactersKeystones.forEach((characterKeystones) => {
            const characterServices = new CharacterServices();
            const orderedKeystones = characterServices.orderKeystones(
                characterKeystones.keystones
            );
            toReturn.push({
                name: characterKeystones.name,
                keystones: orderedKeystones,
                chessOne: characterServices.getChessOne(orderedKeystones),
                chessTwo: characterServices.getChessTwo(orderedKeystones),
                chessThree: characterServices.getChessThree(orderedKeystones),
            });
        });

        res.status(200).json(toReturn);
    }
}
