import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function OriginalImage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // ตำแหน่งของจุดต่าง (สำหรับอ้างอิง)
  const differences = [
    { id: 1, description: "Character detail (upper left)", location: "Upper left area - character detail" },
    { id: 2, description: "Background element (upper right)", location: "Upper right corner - background element" },
    { id: 3, description: "Lower right detail", location: "Lower right corner area" }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1a2e',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: isMobile ? '10px 5px' : '20px'
    }}>
      <Head>
        <title>Original Image - Dimension</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: isMobile ? '24px' : '32px',
          marginBottom: '20px',
          color: '#4a90e2'
        }}>
          📖 Original Image Reference
        </h1>

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '30px',
          gap: '15px'
        }}>
          <Link href="/dimension" style={{
            padding: '12px 24px',
            backgroundColor: '#4a90e2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            transition: 'background-color 0.3s',
            display: 'inline-block'
          }}>
            🎮 Back to Game
          </Link>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <img
            src="/dimension/image2.png"
            alt="Original Image Reference"
            style={{
              maxWidth: '100%',
              height: 'auto',
              border: '3px solid #4a90e2',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          />
        </div>

        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'left'
        }}>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            textAlign: 'center',
            color: '#4a90e2' 
          }}>
            🎯 Difference Locations (Spoiler Alert!)
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '15px'
          }}>
            {differences.map((diff, index) => (
              <div key={diff.id} style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '15px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <h4 style={{ 
                  margin: '0 0 8px 0',
                  color: '#e74c3c',
                  fontSize: isMobile ? '14px' : '16px'
                }}>
                  Difference #{diff.id}
                </h4>
                <p style={{ 
                  margin: '0 0 5px 0',
                  fontSize: isMobile ? '12px' : '14px'
                }}>
                  <strong>What:</strong> {diff.description}
                </p>
                <p style={{ 
                  margin: '0',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#bbb'
                }}>
                  <strong>Where:</strong> {diff.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          backgroundColor: 'rgba(74, 144, 226, 0.1)',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #4a90e2'
        }}>
          <h3 style={{ 
            margin: '0 0 15px 0',
            color: '#4a90e2'
          }}>
            📝 About This Image
          </h3>
          <p style={{ 
            margin: '0 0 10px 0',
            fontSize: isMobile ? '14px' : '16px',
            lineHeight: '1.6'
          }}>
            This is the original reference image for the spot-the-difference game. 
            The game version contains 3 subtle differences that have been carefully placed 
            to challenge your observation skills.
          </p>
          <p style={{ 
            margin: '0',
            fontSize: isMobile ? '14px' : '16px',
            lineHeight: '1.6',
            color: '#bbb'
          }}>
            Compare this original with the game image to spot what's different, 
            or use this as a reference if you're stuck!
          </p>
        </div>

        <div style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          fontSize: isMobile ? '12px' : '14px'
        }}>
          <p style={{ margin: '0', color: '#888' }}>
            💡 Tip: Try not to look at the spoilers above until you've tried finding 
            the differences yourself in the game!
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          img {
            max-width: calc(100vw - 10px) !important;
            width: calc(100vw - 10px) !important;
          }
          
          body {
            padding: 0 !important;
            margin: 0 !important;
          }
        }
        
        a:hover {
          background-color: #357abd !important;
        }
      `}</style>
    </div>
  );
}
