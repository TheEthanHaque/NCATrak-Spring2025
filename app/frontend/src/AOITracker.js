// src/AOITracker.js
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BASE = 'http://localhost:5000';

export default function AOITracker() {
  const sessionId      = useRef(uuidv4());
  const firstEventTime = useRef(null);             // ← new
  const mouse          = useRef({ x: 0, y: 0, aoi: '' });
  const gaze           = useRef({ x:0, y:0, eyeAoi:'', leftX:0, leftY:0, rightX:0, rightY:0 });

  useEffect(() => {
    window.AOI_SESSION_ID = sessionId.current;

    const clamp = (v, max) => Math.min(Math.max(Math.round(v), 0), max);
    const getAOI = (x,y) => document.elementFromPoint(x,y)?.getAttribute('data-aoi') || '';

    // — WebGazer setup —
    const wg = window.webgazer;
    wg.setRegression('ridge')
      .showPredictionPoints(false)
      .showFaceOverlay(false)
      .showFaceFeedbackBox(false);

    wg.setGazeListener(data => {
      if (!data) return;
      const vw = window.innerWidth, vh = window.innerHeight;
      const gx = clamp(data.x, vw), gy = clamp(data.y, vh);
      gaze.current = {
        x:      gx,
        y:      gy,
        eyeAoi: getAOI(gx, gy),
        leftX:  clamp(data.xLeft  ?? gx, vw),
        leftY:  clamp(data.yLeft  ?? gy, vh),
        rightX: clamp(data.xRight ?? gx, vw),
        rightY: clamp(data.yRight ?? gy, vh)
      };
    });
    wg.begin();

    // unified sender
    const sendEvent = async ({
      eventType,
      isClick=false,
      textInput=false,
      activity='',
      targetId='',
      description='',
      key=''
    }) => {
      const nowMs = Date.now();
      // initialize firstEventTime on very first call
      if (firstEventTime.current === null) {
        firstEventTime.current = nowMs;
      }
      const offsetMs = nowMs - firstEventTime.current;

      const nowIso = new Date(nowMs).toISOString();
      const m     = mouse.current;
      const g     = gaze.current;
      const page  = window.location.pathname;

      const payload = {
        session_id:    sessionId.current,
        event_type:    eventType,
        timestamp_iso: nowIso,
        offset_ms:     offsetMs,
        key,            // new: individual key logged
        page,
        coordinates:   { x: m.x, y: m.y },
        mouse_aoi:     m.aoi,
        mouse_click:   isClick,
        text_input:    textInput,
        text_activity: activity,
        targetId,
        description,
        eye_aoi:       g.eyeAoi,
        left_eye_x:    g.leftX,
        left_eye_y:    g.leftY,
        right_eye_x:   g.rightX,
        right_eye_y:   g.rightY
      };

      try {
        await fetch(`${BASE}/api/aoi_event`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.error('AOI log failed:', err);
      }
    };

    // mouse movement & click
    const onMouseMove = e => {
      mouse.current = {
        x:   e.clientX,
        y:   e.clientY,
        aoi: getAOI(e.clientX, e.clientY)
      };
    };
    const onClick = e => {
      onMouseMove(e);
      sendEvent({ eventType: 'click', isClick: true });
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click',     onClick);

    // 1 s sampler
    const intervalId = setInterval(() => sendEvent({ eventType: 'sample' }), 1000);

    // text‐input listener
    const onInput = e => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        sendEvent({
          eventType:   'text_input',
          textInput:   true,
          activity:    e.data ?? e.target.value,
          targetId:    e.target.id || e.target.name,
        });
      }
    };
    document.addEventListener('input', onInput);

    // key‐press listener
    const onKeyDown = e => {
      sendEvent({
        eventType: 'key_press',
        key:       e.key,
        targetId:  e.target.id || e.target.name
      });
    };
    document.addEventListener('keydown', onKeyDown);

    // teardown
    const cleanup = () => {
      clearInterval(intervalId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click',     onClick);
      document.removeEventListener('input',   onInput);
      document.removeEventListener('keydown', onKeyDown);
      wg.clearGazeListener();
      wg.pause();
    };
    window.addEventListener('beforeunload', cleanup);
    return () => {
      cleanup();
      window.removeEventListener('beforeunload', cleanup);
    };
  }, []);

  return null;
}
