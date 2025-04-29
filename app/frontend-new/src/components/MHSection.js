import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SubNavigationBar from './SubNavigationBar';
import MHBasicInterface from './MHBasicInterface';
import TreatmentPlan from './TreatmentPlan';
import CaseNotes from './CaseNotes';
import MHAssessment from './MHAssessment';

const MHSection = () => {
  const subNavItems = [
    { label: 'Basic', route: '/' },
    { label: 'Treatment Plan', route: '/treatment-plan' },
    { label: 'Case Notes', route: '/case-notes' },
    { label: 'Assessment', route: '/assessment' }
  ];

  return (
    <>
      <SubNavigationBar items={subNavItems} baseRoute="/CaseMH" />
      
      <Routes>
        <Route path="/" element={<MHBasicInterface />} />
        <Route path="/treatment-plan" element={<TreatmentPlan />} />
        <Route path="/case-notes" element={<CaseNotes />} />
        <Route path="/assessment" element={<MHAssessment />} />
        <Route path="*" element={<Navigate to="/CaseMH" replace />} />
      </Routes>
    </>
  );
};

export default MHSection;