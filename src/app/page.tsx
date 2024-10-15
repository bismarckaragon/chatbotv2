"use client";

import Chat from '../components/Chat';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
    <Head>
      <title>Lecciones de CEOs</title>
      <meta name="description" content="Aplicación web de Lecciones de CEO's" />
    </Head>
    <main>
      <h1>Bienvenido al Chat de Lecciones de CEOs</h1>
      <Chat />
    </main>
    <style jsx>{`
      main {
        padding: 50px;
        text-align: center;
      }
      h1 {
        margin-bottom: 20px;
      }
    `}</style>
  </div>
  );
}
