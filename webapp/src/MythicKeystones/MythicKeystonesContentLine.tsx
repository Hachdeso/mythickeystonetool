import React from "react";
import { Keystone } from "./mythicKeystonesSlice";

interface MythicKeystonesContentLineProps {
    name: string;
    keystones: Keystone[];
    chessOne: number;
    chessTwo: number;
    chessThree: number;
}

const MythicKeystonesContentLine: React.FC<MythicKeystonesContentLineProps> = ({
    name,
    keystones,
    chessOne,
    chessTwo,
    chessThree,
}) => {
    return (
        <div className="mythickeystonescontentline">
            <span className="name">{name}</span>
            <span>{chessOne ? chessOne : "0/1"}</span>
            <span>{chessTwo ? chessTwo : keystones.length + "/4"}</span>
            <span>{chessThree ? chessThree : keystones.length + "/10"}</span>
        </div>
    );
};

export default MythicKeystonesContentLine;
