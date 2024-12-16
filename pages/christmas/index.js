import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Christmas() {
    const router = useRouter();
    const [input, setInput] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        
        if (trimmedInput === 'santa_claus_is_cuming_to_town') {
            router.push(`/${trimmedInput}`);
        } else {
            setShowError(true);
        }
    };

    return (
        <div style={{
            background: 'black',
            minHeight: '100vh',
            margin: 0,
            padding: 0,
            width: '100%',
            overflow: 'hidden'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '100vh',
                flexDirection: 'column',
                padding: '20px',
                boxSizing: 'border-box',
                width: '100%',
                backgroundImage: 'url(/merry_bg.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <img
                    src="/santaclausseal.png"
                    alt="santa"
                    style={{
                        maxWidth: '100%',
                        width: '400px',
                        height: 'auto',
                        objectFit: 'contain'
                    }}
                />
                <img
                    src="/merry_christmas.png"
                    alt="merry_christmas"
                    style={{
                        maxWidth: '100%',
                        width: '400px',
                        height: 'auto',
                        objectFit: 'contain'
                    }}
                />

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