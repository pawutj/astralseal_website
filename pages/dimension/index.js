import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SpotTheDifference() {
  const [foundDifferences, setFoundDifferences] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameStarted, setGameStarted] = useState(true);
  const [timeLeft, setTimeLeft] = useState(180); // 180 วินาที
  const [gameOver, setGameOver] = useState(false);
  const [clicks, setClicks] = useState(0);
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);
  const router = useRouter();

  // ตำแหน่งของจุดต่าง (3 จุด) - ใช้อัตราส่วนจากภาพ (0.0-1.0)
  const differences = [
    { id: 1, x: 0.23, y: 0.07, radius: 25, description: "Character detail (upper left)" },
    { id: 2, x: 0.78, y: 0.30, radius: 33, description: "Background element (upper right)" },
    { id: 3, x: 0.83, y: 0.60, radius: 25, description: "Lower right detail" }
  ];

  // Timer Effect
  useEffect(() => {
    if (gameStarted && !gameCompleted && !gameOver && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [gameStarted, gameCompleted, gameOver, timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get time color based on remaining time
  const getTimeColor = () => {
    if (timeLeft > 60) return '#4a90e2';
    if (timeLeft > 30) return '#f39c12';
    return '#e74c3c';
  };

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
    if (foundDifferences.length === differences.length && !gameOver) {
      setGameCompleted(true);
      clearInterval(timerRef.current);
      
      // Redirect to congratulations page after 2 seconds
      setTimeout(() => {
        router.push('/dimension/2');
      }, 2000);
    }
  }, [foundDifferences, gameOver, router]);

  const handleImageClick = (e) => {
    if (gameCompleted || gameOver) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;
    
    // Get display dimensions
    const displayWidth = parseFloat(canvas.style.width);
    const displayHeight = parseFloat(canvas.style.height);
    
    const clickX = (e.clientX - rect.left) * (displayWidth / rect.width);
    const clickY = (e.clientY - rect.top) * (displayHeight / rect.height);

    setClicks(prev => prev + 1);

    // แปลงตำแหน่งคลิกเป็นอัตราส่วนของภาพ
    const clickXPercent = clickX / displayWidth;
    const clickYPercent = clickY / displayHeight;

    // ตรวจสอบว่าคลิกถูกจุดต่างหรือไม่
    const foundDiff = differences.find(diff => {
      const distance = Math.sqrt(
        Math.pow(clickXPercent - diff.x, 2) + Math.pow(clickYPercent - diff.y, 2)
      );
      const radiusPercent = diff.radius / Math.min(displayWidth, displayHeight);
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
      const actualX = foundDiff.x * displayWidth;
      const actualY = foundDiff.y * displayHeight;
      const actualRadius = (foundDiff.radius / Math.min(displayWidth, displayHeight)) * Math.min(displayWidth, displayHeight);
      ctx.arc(actualX, actualY, actualRadius, 0, 2 * Math.PI);
      ctx.stroke();
    } else {
      // แสดงกากบาทที่จุดที่คลิกผิด
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 4;
      
      // วาดกากบาท (X)
      const size = 15;
      ctx.beginPath();
      // เส้นแรก (\)
      ctx.moveTo(clickX - size, clickY - size);
      ctx.lineTo(clickX + size, clickY + size);
      // เส้นที่สอง (/)
      ctx.moveTo(clickX + size, clickY - size);
      ctx.lineTo(clickX - size, clickY + size);
      ctx.stroke();
      
      // หักเวลาเมื่อคลิกผิด
      setTimeLeft(prev => {
        const newTime = prev - 30;
        if (newTime <= 0) {
          setGameOver(true);
          return 0;
        }
        return newTime;
      }); 
    }
  };

  const resetGame = () => {
    setFoundDifferences([]);
    setGameCompleted(false);
    setGameOver(false);
    setGameStarted(true);
    setTimeLeft(180);
    setClicks(0);
    clearInterval(timerRef.current);
    
    // ล้างวงกลมที่วาดไว้ โดยวาดภาพใหม่
    drawImage();
  };

  const drawImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // ปรับขนาด canvas ให้เหมาะสมกับอุปกรณ์
      const maxWidth = isMobile ? window.innerWidth - 10 : 800;
      const maxHeight = isMobile ? window.innerHeight * 0.7 : 600;
      
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;
      
      // Set canvas resolution to maintain quality
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = newWidth * pixelRatio;
      canvas.height = newHeight * pixelRatio;
      
      // Set display size
      canvas.style.width = newWidth + 'px';
      canvas.style.height = newHeight + 'px';
      
      // Scale context for high DPI displays
      ctx.scale(pixelRatio, pixelRatio);
      
      // Enable image smoothing for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      setImageLoaded(true);
    };
    img.src = '/dimension/IMG2.PNG';
  };

  useEffect(() => {
    if (canvasRef.current) {
      drawImage();
    }
  }, [isMobile]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: isMobile ? '10px 5px' : '20px'
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
        
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          gap: '10px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '15px',
          borderRadius: '8px'
        }}>
          <div style={{ 
            fontSize: isMobile ? '16px' : '18px',
            color: getTimeColor(),
            fontWeight: 'bold'
          }}>
            Time: {formatTime(timeLeft)}
          </div>
          <div style={{ fontSize: isMobile ? '14px' : '16px' }}>
            Found: {foundDifferences.length}/3 differences
          </div>
        </div>

        {/* FIXED SIZE IMAGE CONTAINER - Name2.png */}
        <div className="title-image-container" style={{
          width: isMobile ? 'calc(100vw - 40px)' : '400px',
          height: isMobile ? 'calc((100vw - 40px) * 200 / 400)' : '200px',
          maxWidth: '400px',
          maxHeight: '200px',
          margin: '20px auto',
          textAlign: 'center',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src="/dimension/Name2.png"
            alt="Game Title"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
              borderRadius: '8px'
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <canvas
            ref={canvasRef}
            onClick={handleImageClick}
            style={{
              borderRadius: '8px',
              cursor: (gameCompleted || gameOver) ? 'default' : 'crosshair',
              maxWidth: '100%',
              height: 'auto'
            }}
          />
          
          {/* Game Over Overlay */}
          {gameOver && !gameCompleted && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0,0,0,0.8)',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              minWidth: '300px'
            }}>
              <img
                src="/dimension/fail.png"
                alt="Game Over"
                style={{
                  width: isMobile ? '200px' : '250px',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>
          )}
        </div>

        {/* FIXED SIZE IMAGE CONTAINER - warning.png */}
        <div className="warning-image-container" style={{
          width: isMobile ? 'calc(100vw - 40px)' : '300px',
          height: isMobile ? 'calc((100vw - 40px) * 150 / 300)' : '150px',
          maxWidth: '300px',
          maxHeight: '150px',
          margin: '30px auto 0 auto',
          textAlign: 'center',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src="/dimension/warning.png"
            alt="Warning"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
              borderRadius: '8px',
              opacity: 0.8
            }}
          />
        </div>

      </div>

      <style jsx>{`
        /* Mobile responsive scaling */
        @media (max-width: 800px) {
          /* Landing page image scaling */
          .fixed-image-container {
            width: calc(100vw - 40px) !important;
            height: calc((100vw - 40px) * 572 / 784) !important;
            max-width: 784px !important;
            max-height: 572px !important;
          }
          
          .fixed-image {
            width: 100% !important;
            height: 100% !important;
          }
        }
        
        @media (max-width: 450px) {
          .fixed-image-container {
            width: calc(100vw - 20px) !important;
            height: calc((100vw - 20px) * 572 / 784) !important;
          }
        }
        
        /* CRITICAL: Prevent any image stretching */
        img {
          object-fit: contain !important;
          object-position: center !important;
        }
        
        div[style*="display: flex"] img {
          flex-shrink: 0 !important;
        }
      `}</style>
    </div>
  );
}
