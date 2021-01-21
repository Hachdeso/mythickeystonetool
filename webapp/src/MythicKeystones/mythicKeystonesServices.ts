export class MythicKeystonesServices {
    public getChessColor(chessLevel: number): string {
        if (chessLevel < 5) {
            return "grey";
        } else if (chessLevel < 8) {
            return "green";
        } else if (chessLevel < 10) {
            return "blue";
        } else if (chessLevel < 14) {
            return "violet";
        } else {
            return "orange";
        }
    }
}
