import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ refreshParticipants }) => {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [telegram, setTelegram] = useState('');
    const [experience, setExperience] = useState('');
    const [isPlayingMoney, setIsPlayingMoney] = useState(false);
    const [telegramError, setTelegramError] = useState('');
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };
    const handleTelegramChange = (event) => {
        setTelegram(event.target.value);
        setTelegramError('');
    };
    const handleExperienceChange = (event) => {
        setExperience(event.target.value);
    };

    const handleIsPlayingMoneyChange = (event) => {
        setIsPlayingMoney(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (telegram && !/^(https?:\/\/)?(www\.)?(t\.me\/)[^\s/]+$/.test(telegram)) {
            setTelegramError('Invalid Telegram link');
            return;
        }

        const participant = {
            name,
            nickname,
            telegram,
            experience,
            isPlayingMoney,
        };

        try {
            await axios.post('/api/participants', participant);
            // Дополнительные действия после успешной отправки данных
            refreshParticipants();
        } catch (error) {
            console.error('Error inserting participant:', error);


    }};

    return (
        <form onSubmit={handleSubmit}>
            <h2>Рестрация на покерный турнир</h2>
            <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <label>
                Nickname:
                <input type="text" value={nickname} onChange={handleNicknameChange} />
            </label>
            <label>
                Telegram:
                <input type="text" value={telegram} onChange={handleTelegramChange} />
                <span style={{ color: 'red' }}>{telegramError}</span>
            </label>
            <label>
                Опыт:
                <select value={experience} onChange={handleExperienceChange}>
                    <option value="">Какой у тебя опыт?</option>
                    <option value="1">Никогда не играл</option>
                    <option value="2">Знаю правила</option>
                    <option value="3">Играл пару раз с друзьями</option>
                    <option value="4">Регулярно играю с друзья</option>
                    <option value="5">Выступаю на профессиональном уровне</option>
                </select>
            </label>
            <label>
                Готов сыграть на деньги:
                <input
                    type="checkbox"
                    checked={isPlayingMoney}
                    onChange={handleIsPlayingMoneyChange}
                />
            </label>
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};

export default RegistrationForm;
