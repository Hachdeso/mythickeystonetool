import BlizzApi from "blizzapi";

class Api {
    public api: BlizzApi;

    constructor() {
        this.api = new BlizzApi({
            region: "eu",
            clientId: "7a3adc3bf4d543cc8cd84e644e0b4c47",
            clientSecret: "VYqOYnkXXQqgrcw48LpF26HpuqsA8iej",
        });
    }
}

export const api = new Api().api;
