import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
export default function Chinas() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [input, setInput] = useState('');
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  // สร้าง array ของรูปภาพปกติและรูปภาพ hover
    const listImg = [
        '4523', '8621',
        '5842', '1752',
        '1234', '4258',
        '9544', '7142',
        '7812', '0721'
      ]
    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      };
  const images = (listImg).map( s => {
    return ({
    default: "/china/angplo.png",
    hover: `/china/${s}.png`
    })
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (trimmedInput === 'salapao') {
        router.push(`/${trimmedInput}`);
    } else {
        setShowError(true);
    }
};





  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleTouchStart = (index) => {
    setHoveredIndex(index);
  };

  const handleTouchEnd = () => {
    setHoveredIndex(null);
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
    gap: '1rem',
    width: '100%',
    maxWidth: '1000px',
    padding: isMobile ? '1rem' : 0
  };

  return (
    <div style={{
      background: 'black',
      minHeight: '100vh',
      margin: 0,
      padding: '2rem',
      width: '100%',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%'
      }}>
        <h2 style={{
          color: 'white',
          fontSize: isMobile ? '18px' : '20px',
          fontFamily: 'Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace',
          textAlign: 'center'
        }}>
          หาคำตอบจากอั่งเปา
        </h2>

        <div style={gridStyles}>
          {images.map((img, index) => (
            <div 
              key={index} 
              style={{
                aspectRatio: '1',
                width: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={hoveredIndex === index ? img.hover : img.default}
                alt={`china ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
          ))}
        </div>

        <form 
                    onSubmit={handleSubmit}
                    style={{
                        marginTop: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    {showError && (
                        <h2 style={{
                            color: 'red',
                            marginTop: '20px',
                            fontSize: '20px',
                            fontFamily: 'Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace'
                        }}>
                            Wrong Answer
                        </h2>
                    )}

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setShowError(false);
                        }}
                        style={{
                            padding: '10px 15px',
                            fontSize: '16px',
                            borderRadius: '5px',
                            border: '2px solid #fff',
                            background: 'black',
                            color: 'white',
                            width: '200px',
                            outline: 'none'
                        }}
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            borderRadius: '5px',
                            border: '2px solid #fff',
                            background: 'black',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Submit
                    </button>
                </form>
      </div>
    </div>
  );
}