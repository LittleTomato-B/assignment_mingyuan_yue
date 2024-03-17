// index.js: Main page for the Next.js app showcasing a scatter plot visualization
// Author: Mingyuan Yue
// Creation Date: 2024-03-17

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Charts from "./assignment4_mingyuan_yue"; // Import the Charts component

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Citi Bike Visualization</title>
        <meta name="description" content="Visualization of Citi Bike usage using D3 and React with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ margin: 0, padding: 0, backgroundColor: "white" }}>
        {/* Render the Charts component containing the scatter plot */}
        <Charts />
      </main>
    </>
  );
}