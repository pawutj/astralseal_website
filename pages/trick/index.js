import Image from "next/image"
import Head from 'next/head';
export default function Trick() {

    return (
        <div>
            <Head>
                <title>Re:Fragment ~ Halloween Puzzle</title>
                <link rel="icon" href="/icon.png" />
            </Head>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: 'black',
                flexDirection: 'column'
            }}>
                <Image
                    src="/halo.png"
                    alt="Trick"
                    width={400}
                    height={523}
                    priority
                />
                <h2 style={{
                    color: 'black',
                    marginTop: '20px',
                    fontSize: '20px'
                }}>
                    ถ้าไม่อยากถูก trick ก็ให้ treat
                </h2>
            </div>
        </div>
    )
}