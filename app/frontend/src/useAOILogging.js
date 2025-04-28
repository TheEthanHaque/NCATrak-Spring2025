// src/useAOILogging.js
import { useCallback } from 'react';

// adjust to match whatever port your API is running on
const BASE = 'http://localhost:5001';

export default function useAOILogging(tabName) {
  return useCallback((eventType, extra = {}) => {
    const payload = {
      event_type: eventType,
      tab: tabName,
      ...extra
    };

    fetch(`${BASE}/api/aoi_event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(err => {
      console.error('AOI logging error:', err);
    });
  }, [tabName]);
}

