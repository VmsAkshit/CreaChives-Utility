import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// --- LOCAL SETUP INSTRUCTIONS ---
// 1. Uncomment the two lines below in your local project:
// import App from './App.jsx'
// import './index.css' 

// 2. Delete the 'PlaceholderApp' component below.
// --------------------------------

// --- PLACEHOLDER FOR PREVIEW (DELETE ME LOCALLY) ---
const PlaceholderApp = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#f3f4f6'
  }}>
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem', 
      background: 'white', 
      borderRadius: '1rem', 
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      maxWidth: '400px'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem' }}>
        Main.jsx Connected
      </h2>
      <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
        This file is working! It successfully connects React to your HTML.
      </p>
      <div style={{ 
        background: '#eff6ff', 
        padding: '1rem', 
        borderRadius: '0.5rem', 
        textAlign: 'left',
        fontSize: '0.9rem'
      }}>
        <strong>Next Steps:</strong>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.2rem', marginTop: '0.5rem', color: '#1e40af' }}>
          <li>Save this as <code>src/main.jsx</code></li>
          <li>Uncomment the <code>import App</code> line</li>
          <li>Ensure <code>App.jsx</code> is in the same folder</li>
        </ul>
      </div>
    </div>
  </div>
);
// ---------------------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* In your local project, replace PlaceholderApp with App */}
    <PlaceholderApp /> 
    {/* <App /> */}
  </React.StrictMode>,
)
