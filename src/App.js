import React from "react";
import Arrived from "./components/Arrived";
import AsideMenu from "./components/AsideMenu";
import Browse from "./components/Browse";
import Clients from "./components/Clients";
import Footer from "./components/Footer";
import Header from "./components/header";
import Hero from "./components/Hero";

export default function App() {
    return (  
        <>
        <Header/>
        <Hero/>
        <Browse/>
        <Arrived/>
        <Clients/>
        <AsideMenu/>
        <Footer/>
        </>
    )
} 