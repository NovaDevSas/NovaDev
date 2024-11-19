import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/community.css';

const socket = io('http://localhost:5000'); // Asegúrate de que el servidor esté corriendo en este puerto

const Community = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });
        
        return () => {
            socket.off('chat message'); // Limpiar el socket cuando el componente se desmonte
        };
    }, []);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('chat message', message);
            setMessage('');
        }
    };

    return (
        <div className="community neomorph">
            <h2>Comunidad de Hábitos</h2>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        {msg}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="neomorph-button">
                Enviar
            </button>
        </div>
    );
};

export default Community;
