import { Request, Response } from "express";
import { api } from "../../blizzapi";
import axios, { AxiosResponse } from "axios";
import { Keystone } from "../keystones/keystones.controller";
import { CharacterServices } from "./characters.services";
import { serverURL } from "../../URL";

interface Character {
    id: number;
    name: string;
    realmSlug: string;
    class: string;
}

interface CharacterKeystone {
    id: number;
    name: string;
    class: string;
    keystones: Keystone[];
}

export interface CharacterData {
    id: number;
    name: string;
    class: string;
    keystones: Keystone[];
    chessOne: number;
    chessTwo: number;
    chessThree: number;
}

export class CharactersController {
    public async get(req: Request, res: Response) {
        const charactersServices = new CharacterServices();
        const token = await api.getAccessToken();
        const blizzardResponse = await axios.get(
            "https://eu.api.blizzard.com/data/wow/guild/dalaran/lames-de-wrynn/roster?namespace=profile-eu&locale=en_EU&access_token=" +
                token
        );
        const blizzardMembers: any[] = blizzardResponse.data.members;
        const formatMembers: Character[] = [];

        blizzardMembers.forEach((blizzardMember) => {
            const character = blizzardMember.character;
            if (character.level === 60) {
                formatMembers.push({
                    id: character.id,
                    name: character.name,
                    realmSlug: character.realm.slug,
                    class: charactersServices.getClassNameById(
                        character.playable_class.id
                    ),
                });
            }
        });

        res.status(200).json(formatMembers);
    }

    public async getWithKeystones(req: Request, res: Response) {
        let charactersResponse: AxiosResponse<any> | undefined;

        try {
            charactersResponse = await axios.get(serverURL + "/api/characters");
        } catch (e) {
            console.log(e);
        }

        if (!charactersResponse) return;

        const characters: Character[] = charactersResponse.data;
        const toReturn: CharacterKeystone[] = [];

        characters.forEach((character) => {
            axios
                .get(
                    serverURL +
                        "/api/keystones/" +
                        character.realmSlug +
                        "/" +
                        character.name.toLowerCase()
                )
                .then((response) => {
                    toReturn.push({
                        id: character.id,
                        name: character.name,
                        class: character.class,
                        keystones: response.data,
                    });
                    if (toReturn.length === characters.length) {
                        return res.status(200).json(toReturn);
                    }
                });
        });
    }

    public async getFinalData(req: Request, res: Response) {
        const characterServices = new CharacterServices();
        const charactersKeystonesResponse = await axios.get(
            serverURL + "/api/characters/keystones"
        );

        const charactersKeystones: CharacterKeystone[] =
            charactersKeystonesResponse.data;

        const toReturn: CharacterData[] = [];

        charactersKeystones.forEach((characterKeystones) => {
            const orderedKeystones = characterServices.orderKeystones(
                characterKeystones.keystones
            );
            toReturn.push({
                id: characterKeystones.id,
                name: characterKeystones.name,
                class: characterKeystones.class,
                keystones: orderedKeystones,
                chessOne: characterServices.getChessOne(orderedKeystones),
                chessTwo: characterServices.getChessTwo(orderedKeystones),
                chessThree: characterServices.getChessThree(orderedKeystones),
            });
        });

        res.status(200).json(characterServices.orderCharactersData(toReturn));
    }
}
