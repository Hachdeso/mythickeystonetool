import { Request, Response } from "express";
import { api } from "../../blizzapi";
import axios from "axios";

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
        const charactersResponse = await axios.get(
            "http://localhost:3000/api/characters"
        );
        const characters: any[] = charactersResponse.data;

        const response: any[] = [];
    }
}
