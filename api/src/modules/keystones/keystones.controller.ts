import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { api } from "../../blizzapi";
import { KeystonesServices } from "./keystones.services";

export interface Keystone {
    dungeon: string;
    level: number;
    timed: boolean;
}

export class KeystonesController {
    async get(req: Request, res: Response) {
        const keystonesServices = new KeystonesServices();
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
        const keystones: Keystone[] = [];

        blizzardRuns.forEach((blizzardRun) => {
            const timestamp = blizzardRun.completed_timestamp;

            if (keystonesServices.isInCurrentPeriod(timestamp)) {
                keystones.push({
                    dungeon: keystonesServices.getDungeonNameById(
                        blizzardRun.dungeon.id
                    ),
                    level: blizzardRun.keystone_level,
                    timed: blizzardRun.is_completed_within_time,
                });
            }
        });

        res.status(200).json(keystones);
    }
}
