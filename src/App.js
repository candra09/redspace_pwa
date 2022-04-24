import React from "react";
import Arrived from "./components/Arrived";
import AsideMenu from "./components/AsideMenu";
import Browse from "./components/Browse";
import Clients from "./components/Clients";
import Footer from "./components/Footer";
import Header from "./components/header";
import Hero from "./components/Hero";
import Offline from "./components/Offline";
import Splash from "./pages/Splash";

export default function App() {
    const [items, setItems] = React.useState([]); 

    //tambah state untuk menampung staus online/offline
    const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);

    //state splash screen
    const [isLoading, setIsLoading] = React.useState(true);

    //fungsi untuk menghandle status offline/online
    function handleOfflineStatus(){
        setOfflineStatus(!navigator.onLine);

    }
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

            const script = document.createElement("script");
            script.src = "/carousel.js";
            script.async = false;
            document.body.appendChild(script);
        })();
        //ketika pertama kali components dijalankan maka akan mengecek status terlebih dahulu
        handleOfflineStatus();
        window.addEventListener('online', handleOfflineStatus);
        window.addEventListener('offline', handleOfflineStatus)

        //splashscreen
        setTimeout(function(){
            setIsLoading(false)
        },3000);

        //fungsi useeffect akan mendevinisikan components
        return function(){
            window.removeEventListener('online', handleOfflineStatus)
            window.removeEventListener('offline', handleOfflineStatus)
        }
    },[offlineStatus]); //dependesi untuk mengecek status, jika hanya utntuk menghandle APi depedensi bisa dikonsongkan.
    return (  
        <>
        {isLoading === true? <Splash/> : 
        (
            <>
            {offlineStatus && <Offline/>}

            <Header/>
            <Hero/>
            <Browse/>
            <Arrived items={items}/>
            <Clients/>
            <AsideMenu/>
            <Footer/>
            </>
            
        )}
        
        </>
    )
} 