// src/AOITracker.js
import { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BASE = 'http://localhost:5001';

export default function AOITracker() {
  // Generate one session ID per mount
  const sessionId = useMemo(() => uuidv4(), []);

  useEffect(() => {
    let running = true;
    const startTime = performance.now();
    let lastX = 0,
      lastY = 0;

    // Get the AOI under the given point
    const getAOI = (x, y) => {
      const el = document.elementFromPoint(x, y);
      return el?.getAttribute('data-aoi') || '';
    };

    // POST helper — includes session_id
    const sendEvent = async (body) => {
      try {
        await fetch(`${BASE}/api/aoi_event`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, ...body }),
        });
      } catch (err) {
        console.error('AOI log failed:', err);
      }
    };

    // Sample every 1s (1000ms) — change back to 10 for 10ms
    const intervalId = setInterval(() => {
      if (!running) return;
      const now = performance.now();
      const ms = Math.floor(now - startTime);

      sendEvent({
        timestamp_ms: ms,
        coordinates: { x: lastX, y: lastY },
        mouse_aoi: getAOI(lastX, lastY),
        mouse_click: false,
        event_type: 'sample',
      });
    }, 1000);

    // Track latest mouse position
    const handleMouseMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
    };

    // Immediate click logging
    const handleClick = (e) => {
      const now = performance.now();
      const ms = Math.floor(now - startTime);

      sendEvent({
        timestamp_ms: ms,
        coordinates: { x: e.clientX, y: e.clientY },
        mouse_aoi: getAOI(e.clientX, e.clientY),
        mouse_click: true,
        event_type: 'click',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      running = false;
      clearInterval(intervalId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [sessionId]);

  return null;
}

