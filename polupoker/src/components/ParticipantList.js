import React, { useState, useEffect } from 'react';

const ParticipantList = () => {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        // Fetch participant data from the server or any other data source
        const fetchParticipants = async () => {
            try {
                const response = await fetch('/api/participants');
                const data = await response.json();
                setParticipants(data);
            } catch (error) {
                console.error('Error fetching participants:', error);
            }
        };
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
