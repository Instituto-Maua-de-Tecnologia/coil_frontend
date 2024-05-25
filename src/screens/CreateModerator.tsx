// src/App.tsx
import React, { useState } from "react";
import CreateModeratorModal from "./CreateModeratorModal";

const CreateModerator: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateModerator = (email: string) => {
        console.log(`Creating moderator with email: ${email}`);
        // Aqui você pode adicionar a lógica para criar o moderador, como uma chamada à API
    };

    return (
        <div className="App">
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Novo Moderador
            </button>
            <CreateModeratorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateModerator={handleCreateModerator}
            />
        </div>
    );
};

export default CreateModerator;
