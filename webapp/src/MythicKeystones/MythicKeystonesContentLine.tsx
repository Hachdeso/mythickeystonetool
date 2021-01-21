import React from "react";
import { useDispatch } from "react-redux";
import { Keystone } from "./mythicKeystonesDataSlice";
import { setIdToDisplay } from "./mythicKeystonesDetailsSlice";
import { MythicKeystonesServices } from "./mythicKeystonesServices";

interface MythicKeystonesContentLineProps {
    id: number;
    name: string;
    playerClass: string;
    keystones: Keystone[];
    chessOne: number;
    chessTwo: number;
    chessThree: number;
}

const MythicKeystonesContentLine: React.FC<MythicKeystonesContentLineProps> = ({
    id,
    name,
    playerClass,
    keystones,
    chessOne,
    chessTwo,
    chessThree,
}) => {
    const mythicKeystoneServices = new MythicKeystonesServices();
    const dispatch = useDispatch();
    return (
        <div
            className="mythickeystonescontentline mythickeystonescontentline-item"
            onMouseEnter={() => dispatch(setIdToDisplay(id))}
            onMouseLeave={() => dispatch(setIdToDisplay(0))}
        >
            <span className={`name ${playerClass}`}>{name}</span>
            <span className={mythicKeystoneServices.getChessColor(chessOne)}>
                {chessOne ? chessOne : "0/1"}
            </span>
            <span className={mythicKeystoneServices.getChessColor(chessTwo)}>
                {chessTwo ? chessTwo : keystones.length + "/4"}
            </span>
            <span className={mythicKeystoneServices.getChessColor(chessThree)}>
                {chessThree ? chessThree : keystones.length + "/10"}
            </span>
        </div>
    );
};

export default MythicKeystonesContentLine;
