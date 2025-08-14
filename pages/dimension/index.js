import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function SpotTheDifference() {
  const [foundDifferences, setFoundDifferences] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [clicks, setClicks] = useState(0);
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ตำแหน่งของจุดต่าง (3 จุด) - ใช้อัตราส่วนจากภาพ (0.0-1.0)
  // ปรับตำแหน่งเหล่านี้ให้ตรงกับจุดที่แตกต่างในภาพจริง
  const differences = [
    { id: 1, x: 0.2, y: 0.05, radius: 40, description: "Character detail (upper left)" },
    { id: 2, x: 0.9, y: 0.10, radius: 40, description: "Background element (upper right)" },
    { id: 3, x: 0.88, y: 0.65, radius: 30, description: "Lower right detail" }
  ];

  useEffect(() => {
    // ตรวจสอบว่าเป็น mobile หรือไม่
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (foundDifferences.length === differences.length) {
      setGameCompleted(true);
    }
  }, [foundDifferences]);

  const handleImageClick = (e) => {
    if (gameCompleted) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    setClicks(prev => prev + 1);

    // แปลงตำแหน่งคลิกเป็นอัตราส่วนของภาพ
    const clickXPercent = clickX / canvas.width;
    const clickYPercent = clickY / canvas.height;

    // ตรวจสอบว่าคลิกถูกจุดต่างหรือไม่
    const foundDiff = differences.find(diff => {
      const distance = Math.sqrt(
        Math.pow(clickXPercent - diff.x, 2) + Math.pow(clickYPercent - diff.y, 2)
      );
      const radiusPercent = diff.radius / Math.min(canvas.width, canvas.height);
      return distance <= radiusPercent && !foundDifferences.includes(diff.id);
    });

    if (foundDiff) {
      setFoundDifferences(prev => [...prev, foundDiff.id]);
      
      // วาดวงกลมแสดงจุดที่พบ
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#ff4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const actualX = foundDiff.x * canvas.width;
      const actualY = foundDiff.y * canvas.height;
      const actualRadius = (foundDiff.radius / Math.min(canvas.width, canvas.height)) * Math.min(canvas.width, canvas.height);
      ctx.arc(actualX, actualY, actualRadius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  const resetGame = () => {
    setFoundDifferences([]);
    setGameCompleted(false);
    setClicks(0);
    
    // ล้างวงกลมที่วาดไว้ โดยวาดภาพใหม่
    drawImage();
  };

  const drawImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // ปรับขนาด canvas ให้เหมาะสมกับอุปกรณ์
      const maxWidth = isMobile ? window.innerWidth - 40 : 800;
      const maxHeight = isMobile ? window.innerHeight * 0.6 : 600;
      
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      setImageLoaded(true);
    };
    img.src = '/dimension/image1.png';
  };

  useEffect(() => {
    if (canvasRef.current) {
      drawImage();
    }
  }, [isMobile]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1a2e',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <Head>
        <title>Spot the Difference - Dimension</title>
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
          🔍 Spot the Difference
        </h1>
        
        {/* คำเตือน: ปรับตำแหน่งจุดต่างในไฟล์นี้ให้ตรงกับภาพ image1.png */}
        {/* Coordinates ใช้ระบบ 0.0-1.0 (เปอร์เซ็นต์ของภาพ) */}

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          gap: '10px'
        }}>
          <div style={{ fontSize: isMobile ? '14px' : '16px' }}>
            Found: {foundDifferences.length}/3 differences
          </div>
          <div style={{ fontSize: isMobile ? '14px' : '16px' }}>
            Clicks: {clicks}
          </div>
          <Link href="/dimension/2" style={{
            color: '#4a90e2',
            textDecoration: 'none',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            📖 View Original
          </Link>
        </div>

        {!imageLoaded && (
          <div style={{ padding: '40px', fontSize: '18px' }}>
            Loading image...
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <canvas
            ref={canvasRef}
            onClick={handleImageClick}
            style={{
              border: '2px solid #4a90e2',
              borderRadius: '8px',
              cursor: gameCompleted ? 'default' : 'crosshair',
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>

        {gameCompleted && (
          <div style={{
            backgroundColor: '#27ae60',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            animation: 'pulse 2s infinite'
          }}>
            <h2 style={{ margin: '0 0 10px 0' }}>🎉 Congratulations!</h2>
            <p style={{ margin: '0' }}>
              You found all 3 differences in {clicks} clicks!
            </p>
          </div>
        )}

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <button
            onClick={resetGame}
            style={{
              padding: '12px 24px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
          >
            🔄 Reset Game
          </button>
        </div>

        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '15px',
          borderRadius: '8px',
          fontSize: isMobile ? '12px' : '14px'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>How to Play:</h3>
          <p style={{ margin: '5px 0' }}>• Click on areas where you think there are differences</p>
          <p style={{ margin: '5px 0' }}>• Find all 3 hidden differences in the image</p>
          <p style={{ margin: '5px 0' }}>• Use fewer clicks for a better score!</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @media (max-width: 768px) {
          canvas {
            max-width: calc(100vw - 40px) !important;
          }
        }
      `}</style>
    </div>
  );
}
