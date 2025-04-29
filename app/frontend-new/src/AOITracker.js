import React, { useEffect } from 'react';

const AOITracker = () => {
    useEffect(() => {
        const handleMouseMove = (event) => {
            const data = {
                event_type: 'mousemove',
                coordinates: { x: event.clientX, y: event.clientY },
                mouse_click: false,
                text_input: false,
                text_activity: ''
            };
            sendEvent(data);
        };

        const handleClick = (event) => {
            const data = {
                event_type: 'click',
                coordinates: { x: event.clientX, y: event.clientY },
                mouse_click: true,
                text_input: false,
                text_activity: ''
            };
            sendEvent(data);
        };

        const handleKeyDown = (event) => {
            const data = {
                event_type: 'keydown',
                coordinates: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
                mouse_click: false,
                text_input: true,
                text_activity: event.key
            };
            sendEvent(data);
        };

        const sendEvent = async (eventData) => {
            try {
                await fetch('http://127.0.0.1:5000/api/aoi_event', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(eventData),
                });
            } catch (error) {
                console.error('Failed to send AOI event:', error);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return <div>AOI Tracker Active. Move your mouse or type something!</div>;
};

export default AOITracker;

