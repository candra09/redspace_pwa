import React from "react";
import Arrived from "./components/Arrived";
import AsideMenu from "./components/AsideMenu";
import Browse from "./components/Browse";
import Clients from "./components/Clients";
import Footer from "./components/Footer";
import Header from "./components/header";
import Hero from "./components/Hero";

export default function App() {
    const [items, setItems] = React.useState([]);

    //useEffect: ketika di reload adakan mengambil data dari API
    //UseState memiliki dua parameter, yaitu fungsi dan dependensi list
    React.useEffect(function(){
        (async function(){
            const response = await fetch('https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc', {
                header:{
                    "Content-Type": "application/json",
                    "accept": "application/json",
                    "key": process.env.REACT_APP_APIKEY
                }
            });
            const {nodes} = await response.json();
            setItems(nodes);
        })();
    },[]);
    return (  
        <>
        <Header/>
        <Hero/>
        <Browse/>
        <Arrived items={items}/>
        <Clients/>
        <AsideMenu/>
        <Footer/>
        </>
    )
} 