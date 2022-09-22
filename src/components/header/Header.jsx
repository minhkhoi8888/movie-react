import { useEffect, useRef, useState, useCallback } from "react";

import {Link, useLocation, useNavigate } from "react-router-dom";

import "./Header.scss";
import Logo from "../../asset/logo2.png";
import Button from "../button/Button";
import ModalName from "../modal/ModalName";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyA0nsnP1TYHXh_vChHduDXLVZ00Nx_NfXM",
    authDomain: "dtdm-2022.firebaseapp.com",
    projectId: "dtdm-2022",
    storageBucket: "dtdm-2022.appspot.com",
    messagingSenderId: "375618910492",
    appId: "1:375618910492:web:5c5f3359f86aa1950322d9"
})

const firestore = firebase.firestore();

const headerNav = [
    {
        display: "Home",
        path: "/"
    },
    {
        display: "Movies",
        path: "/movie"
    },
    {
        display: "TV Series",
        path: "/tv"
    }
]

const Header = () => {
    const { pathname } = useLocation();
    const navigate =  useNavigate();

    const headerRef = useRef(null);
    const navRef = useRef(null);
    const selectRef = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [modalBoo, setmodalBoo] = useState(true);
    const [modalText, setmodalText] = useState("");

    const nameRef = firestore.collection("name");
    const [nameUser] = useCollectionData(nameRef);
    useEffect(()=>{
        if (nameUser != undefined){
            setmodalText(nameUser[0].nameUser);
        }
    },[nameUser])
    

    const active = headerNav.findIndex((element)=> element.path === pathname);

    const openNav = ()=>{
        navRef.current.style.width = "100%";
        if(window.innerWidth <= 780){
            navRef.current.style.width = "100%";
        } else if (window.innerWidth > 780 && window.innerWidth<= 1200){
            navRef.current.style.width = "40vw";
        }
    }
    const closeNav = ()=>{
        if(window.innerWidth < 1200 ){
            navRef.current.style.width = "0%";
        }
    }

    const toggleInput = ()=>{
        let toogleInput = document.querySelector(".header__nav__input__contain").classList.toggle("header__nav__input__contain--active");
    }
    
    const foCus = useCallback(()=>{
        const valueSelect = selectRef.current.value;
        
        if(keyword.trim().length > 0){
            navigate(`/${valueSelect}/search/${keyword}`)
        }
    },[navigate, keyword]); 

    useEffect(()=>{
        const shinkHeader = ()=>{
            if (document.body.scrollTop >=50 || document.documentElement.scrollTop >=50){
                headerRef.current.classList.add("shink");
            } else {
                headerRef.current.classList.remove("shink");
            }
        }
        // enter to search
        const enterEvent = (e)=>{
            e.preventDefault();
            if (e.keyCode === 13){
                foCus();
                closeNav();
            }
        }
        document.addEventListener("keyup", enterEvent);
        window.addEventListener("scroll", shinkHeader);
        return ()=>{
            window.removeEventListener("scroll", shinkHeader);
            document.removeEventListener("keyup", enterEvent);
        }
    },[foCus]);
    
    return (
        <>
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <Link to="/"><img src={Logo} alt="" /></Link>
                </div>
                
                <div ref={navRef} className="header__nav">
                    <div className="header__nav__left">
                        <a  className="closeNav" onClick={()=>{closeNav()}}>X</a>
                        {headerNav.map((item, index) =>(
                            <Link to={item.path} key={index}>
                                <span onClick={()=>{closeNav()}}  className={index === active ? "active" : ""}>
                                    {item.display}
                                </span>
                            </Link>
                        ))}
                    </div>
                    <div className="header__nav__right">
                        <div className="header__nav__input">
                            <div className="header__nav__input__contain">
                                <select ref={selectRef} className="select-type" name="select-type">
                                    <option className="option-type" value="movie">Movie</option>
                                    <option value="tv">Tv Show</option>
                                </select>
                                <input 
                                    type="text"
                                    placeholder="enter keyword"
                                    value={keyword}
                                    onChange={(e)=>setKeyword(e.target.value)}
                                />
                                
                            </div>
                            <Button 
                                    className="toggle-input header__nav__btn-cirle"
                                    onClick={toggleInput}
                                >
                                    <i className="bi bi-search"></i>
                            </Button>
                        </div>

                        <Button className="header_nav__noti header__nav__btn-cirle"><i className="bi bi-bell"></i></Button>
                        <Button className="header_nav__login">Hi {modalText}</Button>
                    </div>
                    
                </div>
                
                <a className="openNav" onClick={()=>{openNav()}}><i className="bi bi-list"></i></a>
            </div>
        </div>
        {modalBoo ? <ModalName setBoo={setmodalBoo} app={firestore}> </ModalName> : ""}
        </>
    )
}

export default Header