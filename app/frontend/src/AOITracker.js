// src/AOITracker.js
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BASE = 'http://localhost:5001';

export default function AOITracker() {
  const sessionIdRef = useRef(uuidv4());
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);

  useEffect(() => {
    // helper to get AOI
    const getAOI = (x, y) => {
      const el = document.elementFromPoint(x, y);
      return el?.getAttribute('data-aoi') || '';
    };

    // universal event sender
    const sendEvent = async (body) => {
      try {
        await fetch(`${BASE}/api/aoi_event`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: sessionIdRef.current,
            ...body,
            timestamp_iso: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.error('AOI log failed:', err);
      }
    };

    // periodic sampling every 1s
    const intervalId = setInterval(() => {
      sendEvent({
        event_type: 'sample',
        coordinates: { x: lastXRef.current, y: lastYRef.current },
        mouse_click: false,
        mouse_aoi: getAOI(lastXRef.current, lastYRef.current),
        text_input: false,
        text_activity: '',
        targetId: '',
        description: '',
      });
    }, 1000);

    // track mouse movements
    const handleMouseMove = (e) => {
      lastXRef.current = e.clientX;
      lastYRef.current = e.clientY;
    };

    // track clicks
    const handleClick = (e) => {
      sendEvent({
        event_type: 'click',
        coordinates: { x: e.clientX, y: e.clientY },
        mouse_click: true,
        mouse_aoi: getAOI(e.clientX, e.clientY),
        text_input: false,
        text_activity: '',
        targetId: '',
        description: '',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // handle session end on unload
    const onUnload = () => {
      clearInterval(intervalId);
      sendEvent({
        event_type: 'session_end',
        coordinates: { x: lastXRef.current, y: lastYRef.current },
        mouse_click: false,
        mouse_aoi: getAOI(lastXRef.current, lastYRef.current),
        text_input: false,
        text_activity: '',
        targetId: '',
        description: '',
      });
    };
    window.addEventListener('beforeunload', onUnload);

    // cleanup on unmount or HMR
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', onUnload);
    };
  }, []);

  return null;
}
