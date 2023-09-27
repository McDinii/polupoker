import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistrationForm from './components/RegistrationForm';
import ParticipantList from './components/ParticipantList';

const App = () => {
    const [participants, setParticipants] = useState([]);

    const fetchParticipants = async () => {
        try {
            const response = await axios.get('/api/participants');
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    useEffect(() => {
        fetchParticipants();
    }, []);

    return (
        <div>
            <RegistrationForm fetchParticipants={fetchParticipants} />
            <ParticipantList participants={participants} />
        </div>
    );
};

export default App;
