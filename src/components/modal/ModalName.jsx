import "./modalName.scss";
import { doc, updateDoc, getFirestore, collection, addDoc } from "firebase/firestore";

import { useState } from "react";

const ModalName = (props) => {
    const [name, setName] = useState('');
    const db =  getFirestore();
    const  washingtonRef = doc(db, "name", "zDudUf1AKFeHXTXauzIq");

    const upDateData = async ()=>{
        props.setBoo(false);
        await updateDoc(washingtonRef, {
            nameUser: name
        });
        
    };
    return ( <>
       <div className="form">
            <label htmlFor="">Nhap ten cua ban:</label>
            <input value = { name } onChange={(e)=>setName(e.target.value)} type="text" />
            <button onClick={upDateData}>OK!</button>
        </div>        
    </> );
}
 
export default ModalName;