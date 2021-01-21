import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../rootReducer";
import { CharacterData } from "./mythicKeystonesDataSlice";

const MythicKeystonesDetails: React.FC = () => {
    const { idToDisplay } = useSelector(
        (state: RootState) => state.mythicKeystones.detail
    );

    const characterData: CharacterData | undefined = useSelector(
        (state: RootState) => {
            const data = state.mythicKeystones.data.charactersData;
            const characterData = data.find(
                (characterData) => characterData.id === idToDisplay
            );
            if (characterData) {
                return characterData;
            } else {
                return undefined;
            }
        }
    );

    if (!characterData || !characterData.keystones.length) {
        return <div></div>;
    }

    return (
        <div className="mythickeystonesdetails">
            <span className={`name ${characterData.class}`}>
                {characterData.name}
            </span>
            <div className="keystones">
                {characterData.keystones.map((keystone) => (
                    <div className="keystone">
                        <span className="dungeon">{keystone.dungeon}</span>
                        <span className="level">{keystone.level}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MythicKeystonesDetails;
