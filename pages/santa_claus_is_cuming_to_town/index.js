export default function Santa() {
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
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: 'black',
                flexDirection: 'column',
                padding: '20px',
                boxSizing: 'border-box',
                width: '100%'
            }}>
                <h2 style={{
                    color: 'white',
                    marginTop: '20px',
                    fontSize: '20px',
                    fontFamily: 'Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace'
                }}>
                    Merry Christmas
                </h2>



                <img
                    src="/christmas02.png"
                    alt="santa"
                    style={{
                        maxWidth: '100%',
                        width: '400px',
                        height: 'auto',
                        objectFit: 'contain'
                    }}
                />

  
      
  
                <h2 style={{
                    color: 'white',
                    marginTop: '20px',
                    fontSize: '20px',
                    fontFamily: 'Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace'
                }}>
                    Congratulations
                </h2>
            </div>
        </div>
    )
  }