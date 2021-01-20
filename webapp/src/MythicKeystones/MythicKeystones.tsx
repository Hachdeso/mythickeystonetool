import React from "react";
import MythicKeystonesContent from "./MythicKeystonesContent";
import "./mythicKeystones.scss";

const MythicKeystones: React.FC = () => {
    return (
        <div className="mythicKeystones">
            <h1>Mythiques +</h1>
            <MythicKeystonesContent />
        </div>
    );
};

export default MythicKeystones;
