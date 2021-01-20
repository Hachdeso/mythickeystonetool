import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../rootReducer";
import { serverURL } from "../URL";
import MythicKeystonesContentLine from "./MythicKeystonesContentLine";
import { addAll, setHasFetch } from "./mythicKeystonesSlice";

const MythicKeystonesContent: React.FC = () => {
    const dispatch = useDispatch();
    const { hasFetch, charactersData } = useSelector(
        (state: RootState) => state.mythicKeystones
    );

    useEffect(() => {
        if (!hasFetch) {
            axios
                .get(serverURL + "/api/characters/data")
                .then((response) => {
                    dispatch(addAll(response.data));
                    console.log(response.data);
                    dispatch(setHasFetch(true));
                })
                .catch((e) => console.log(e));
        }
    }, [hasFetch]);

    if (!hasFetch) {
        return <div className="mythickeystonescontent"> Chargement ...</div>;
    }

    return (
        <div className="mythickeystonescontent">
            <div className="mythickeystonescontentline mythickeystonescontentline-title">
                <span className="name">Pseudo</span>
                <span>Coffre 1</span>
                <span>Coffre 2</span>
                <span>Coffre 3</span>
            </div>
            {charactersData.map((characterData) => (
                <MythicKeystonesContentLine
                    id={characterData.id}
                    name={characterData.name}
                    playerClass={characterData.class}
                    keystones={characterData.keystones}
                    chessOne={characterData.chessOne}
                    chessTwo={characterData.chessTwo}
                    chessThree={characterData.chessThree}
                />
            ))}
        </div>
    );
};

export default MythicKeystonesContent;
