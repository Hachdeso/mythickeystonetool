import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { api } from "../../blizzapi";

export interface Keystone {
    level: number;
    timed: boolean;
}

export class KeystonesController {
    async get(req: Request, res: Response) {
        const token = await api.getAccessToken();
        var blizzardResponse: AxiosResponse<any> | undefined;

        try {
            blizzardResponse = await axios.get(
                "https://eu.api.blizzard.com/profile/wow/character/" +
                    req.params.realmSlug +
                    "/" +
                    req.params.characterName +
                    "/mythic-keystone-profile?namespace=profile-eu&locale=en_EU&access_token=" +
                    token
            );
        } catch (e) {
            res.status(404).json({ message: e });
        }

        if (!blizzardResponse) return;

        if (!blizzardResponse.data.current_period.best_runs) {
            res.status(200).json([]);
            return;
        }

        const blizzardRuns: any[] =
            blizzardResponse.data.current_period.best_runs;
        const keystones: any[] = [];

        blizzardRuns.forEach((blizzardRun) => {
            keystones.push({
                level: blizzardRun.keystone_level,
                timed: blizzardRun.is_completed_within_time,
            });
        });

        res.status(200).json(keystones);
    }
}
