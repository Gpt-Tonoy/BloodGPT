import React, { useState } from 'react';
import './App.css';
import Scene3D from './Scene3D';

function App() {
  const [currentGroup, setCurrentGroup] = useState('O+');
  const [targetGroup, setTargetGroup] = useState('B+');
  const [isSimulating, setIsSimulating] = useState(false);
  
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInitialize = () => setIsSimulating(true);

  return (
    // UI-এর z-index বাড়ানো হলো যাতে 3D এর ওপরে থাকে, আর পজিশন অ্যাবসোলিউট করা হলো
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* 3D ক্যানভাস ব্যাকগ্রাউন্ডে থাকবে */}
      <Scene3D />

      <div className="app-container" style={{ position: 'relative', zIndex: 10, height: '100%', overflowY: 'auto' }}>
        <header className="header">
          <h1>BloodGPT</h1>
          <div className="system-online">SYSTEM ONLINE</div>
        </header>

        {isSimulating ? (
          <div className="glass-panel" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2 className="heading-font" style={{ color: '#00ffcc' }}>INITIALIZING 3D LABORATORY...</h2>
            <p style={{ marginTop: '20px', color: '#8892b0' }}>Loading Assets & WebGL Engine</p>
            <button 
              className="init-btn" 
              style={{ marginTop: '30px', borderColor: '#fff', color: '#fff' }}
              onClick={() => setIsSimulating(false)}
            >
              ABORT
            </button>
          </div>
        ) : (
          <div className="glass-panel">
            <h2 className="heading-font" style={{ textAlign: 'center', marginBottom: '10px' }}>BLOOD GROUP SIMULATOR</h2>
            <p className="subtitle">Next Generation Blood Analysis Experience</p>

            <div className="selectors">
              <div className="selector-group">
                <label>CURRENT GROUP</label>
                <select value={currentGroup} onChange={(e) => setCurrentGroup(e.target.value)}>
                  {bloodGroups.map(group => <option key={group} value={group}>{group}</option>)}
                </select>
              </div>

              <div className="selector-group">
                <label>TARGET GROUP</label>
                <select value={targetGroup} onChange={(e) => setTargetGroup(e.target.value)}>
                  {bloodGroups.map(group => <option key={group} value={group}>{group}</option>)}
                </select>
              </div>
            </div>

            <button className="init-btn" onClick={handleInitialize}>
              Initialize Simulation
            </button>

            <p className="disclaimer">
              Fictional 3D simulation · Not a medical procedure
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
