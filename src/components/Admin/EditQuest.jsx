import React, { useState, useEffect, useContext } from "react";
import QuestsTable from "../Quests/QuestsTable";
import EditQuestPage from "./EditQuestPage";
import CodeEditor from "../Layout/CodeEditor";
import { getAllQuests } from "../../services/questsServices";
import { AuthContext } from "../../contexts/AuthContext";

const EditQuest = () => {
  const [quests, setQuests] = useState([]);
  const [selectedQuestId, setSelectedQuestId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { accessToken, checkValidToken } = useContext(AuthContext);

  const fetchQuests = async () => {
    try {
      const questsData = await getAllQuests(accessToken,checkValidToken);
      setQuests(questsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const handleQuestClick = (questId) => {
    setSelectedQuestId(questId);
  };

  const handleBack = () => {
    setSelectedQuestId(null); // go back to quest list
  };

  return (
    <div className="mx-auto min-h-screen p-10 bg-gradient-to-b from-[#141e30] to-[#123556] text-white">
      {selectedQuestId ? (
        <EditQuestPage questId={selectedQuestId} onBack={handleBack} />
      ) : (
        <QuestsTable mode="edit" quests={quests} onQuestClick={handleQuestClick} />
      )}
    </div>
  );
};


export default EditQuest;
