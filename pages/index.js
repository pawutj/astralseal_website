import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Picture of Café au lait</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <hr/>
        
        {/* FIXED SIZE IMAGE CONTAINER - No stretching possible */}
        <div className="fixed-image-container" style={{
          width: '784px',
          height: '572px',
          margin: '0 auto',
          textAlign: 'center',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src="/landingpage.png"
            alt="Picture of the author"
            className="fixed-image"
            style={{
              width: '784px',
              height: '572px',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block'
            }}
          />
        </div>

        <div className="main_2">
          <div>
            <div style={{ marginTop:5}} className="d-flex justify-content-center"> 
              <h3>The Picture of Café au lait - After Story Patch</h3>
            </div>
            <div style={{ marginTop:2}} className="d-flex justify-content-center">
              <h4>(Zipfile Data Size 86 mb.)</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <a href="https://drive.google.com/file/d/1UvKlWf88hJpTk7DyTsjwTM1UE2jczqKn/view">
              <button style={{ marginTop:2 }} className="btn_2"> Google Drive Download </button>
            </a>
          </div>
          <div style={{ marginTop: 2 }}>
            <h4>How to Install</h4>
            <p>Add patch.rpy to "\Steam\steamapps\common\The picture of Cafe au lait\game"</p>
          </div>
        </div>
        <hr />
      </main>

      <footer>
        <a
          href="https://www.facebook.com/AstralSeal2023"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow us -{' '}
          <img src="/facebook.png" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        hr {
          border-top: 1px solid red !important;
        }
        
        /* Safe image container */
        .image-container {
          width: 100%;
          max-width: 784px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        /* Landing image with forced aspect ratio preservation */
        .landing-image {
          width: auto !important;
          max-width: 100% !important;
          height: auto !important;
          object-fit: contain !important;
          object-position: center !important;
          display: block !important;
          margin: 0 auto !important;
          aspect-ratio: auto !important;
        }
        
        .btn_2 {
          border: none;
          display: inline-block;
          margin-left: 10px;
          padding: 7px 12px;
          background-color: #D21404;
          border-radius: 3px;
          color: #ffffff;
          font-weight: bold;
          transition: 0.5s;
          -moz-transition: 0.5s;
          -webkit-transition: 0.5s;
        }

        .main_2 {
          color: rgb(88,66,60);
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        footer img {
          margin-left: 0.5rem;
          max-width: none !important;
          width: auto !important;
          height: 1em !important;
        }
        
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
        
        /* Mobile responsiveness - scale down proportionally */
        @media (max-width: 800px) {
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
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        
        * {
          box-sizing: border-box;
        }
        
        /* Global image protection - VERY IMPORTANT */
        img:not(.logo) {
          max-width: 100% !important;
          height: auto !important;
          object-fit: contain !important;
          object-position: center !important;
          width: auto !important;
        }
        
        /* Force all containers to respect image dimensions */
        div img:not(.logo),
        span img:not(.logo),
        section img:not(.logo) {
          width: auto !important;
          max-width: 100% !important;
          height: auto !important;
          object-fit: contain !important;
        }
        
        /* Prevent flexbox from stretching images */
        .d-flex img:not(.logo),
        div[style*="flex"] img:not(.logo) {
          width: auto !important;
          height: auto !important;
          flex-shrink: 0 !important;
          object-fit: contain !important;
        }
      `}</style>
    </div>
  )
}
