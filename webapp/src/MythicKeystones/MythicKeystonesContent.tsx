import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../rootReducer";
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
                .get("http://localhost:3000/api/characters/data")
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
            {charactersData.map((characterData) => (
                <MythicKeystonesContentLine
                    name={characterData.name}
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
