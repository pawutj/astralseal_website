import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import QRCode from 'qrcode';

export default function QRGenerator() {
  const [url, setUrl] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [error, setError] = useState('');
  const canvasRef = useRef(null);

  const generateQRCode = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    try {
      setError('');
      
      // Create a temporary canvas for the QR code
      const tempCanvas = document.createElement('canvas');
      
      // Generate QR code with high error correction to allow for logo overlay
      await QRCode.toCanvas(tempCanvas, url, {
        errorCorrectionLevel: 'H',
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      // Load the logo image
      const logo = new Image();
      logo.crossOrigin = 'anonymous';
      logo.src = '/image/astralseal_logo.webp';
      
      logo.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to match QR code
        canvas.width = tempCanvas.width;
        canvas.height = tempCanvas.height;
        
        // Draw the QR code
        ctx.drawImage(tempCanvas, 0, 0);
        
        // Calculate logo size (about 20% of QR code size)
        const logoSize = canvas.width * 0.2;
        const logoX = (canvas.width - logoSize) / 2;
        const logoY = (canvas.height - logoSize) / 2;
        
        // Draw white background circle for logo
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, logoSize / 2 + 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw the logo in the center
        ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
        
        // Convert canvas to data URL for display
        setQrCodeDataUrl(canvas.toDataURL('image/png'));
      };

      logo.onerror = () => {
        setError('Failed to load logo image');
      };
      
    } catch (err) {
      setError('Failed to generate QR code: ' + err.message);
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateQRCode();
  };

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeDataUrl;
    link.click();
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <Head>
        <title>QR Code Generator - AstralSeal</title>
        <link rel="icon" href="/icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '32px',
          fontWeight: 'bold'
        }}>
          QR Code Generator
        </h1>

        <form onSubmit={handleSubmit} style={{
          marginBottom: '30px'
        }}>
          <div style={{
            marginBottom: '20px'
          }}>
            <label htmlFor="url-input" style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '18px'
            }}>
              Enter URL:
            </label>
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '2px solid #333',
                backgroundColor: '#1a1a1a',
                color: 'white',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {error && (
            <div style={{
              color: '#ff6b6b',
              marginBottom: '15px',
              padding: '10px',
              backgroundColor: '#2a1a1a',
              borderRadius: '5px',
              border: '1px solid #ff6b6b'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Generate QR Code
          </button>
        </form>

        {/* Hidden canvas for QR code generation */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {qrCodeDataUrl && (
          <div style={{
            textAlign: 'center',
            marginTop: '30px'
          }}>
            <h2 style={{
              marginBottom: '20px',
              fontSize: '24px'
            }}>
              Your QR Code:
            </h2>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              display: 'inline-block',
              marginBottom: '20px'
            }}>
              <img
                src={qrCodeDataUrl}
                alt="Generated QR Code"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>

            <div>
              <button
                onClick={downloadQRCode}
                style={{
                  padding: '12px 30px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0b7dda'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'}
              >
                Download QR Code
              </button>
            </div>
          </div>
        )}

        <div style={{
          marginTop: '50px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#888'
        }}>
          <p>Enter any URL to generate a QR code with the AstralSeal logo in the center.</p>
        </div>
      </div>
    </div>
  );
}

