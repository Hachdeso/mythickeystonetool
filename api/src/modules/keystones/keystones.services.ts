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
}
