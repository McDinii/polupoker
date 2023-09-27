import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParticipantList = ({ refreshParticipants }) => {
    const [participants, setParticipants] = useState([]);

    const fetchParticipants = async () => {
        try {
            const response = await axios.get('/api/participants');
            setParticipants(response.data);
            refreshParticipants(); // вызываем функцию для обновления списка участников
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    useEffect(() => {
        fetchParticipants();
    }, []);

    return (
        <div>
            <h2>Список участников</h2>
            {participants.length === 0 ? (
                <p>Нет зарегистрированных участников</p>
            ) : (
                <ul>
                    {participants.map((participant) => (
                        <li key={participant.id}>{participant.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ParticipantList;
