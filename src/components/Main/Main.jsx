
import { useState } from 'react';
import './Main.css';
import MainCurrent from './MainCurrent';
import MainDaily from './MainDaily';

const Main = () => {
    
    const [currentIcon,setCurrentIcon] = useState('');
    
    
    return (
        <main className="main">
            <MainCurrent currentIcon={currentIcon} />
            <MainDaily setCurrentIcon={setCurrentIcon}/>
        </main>
    );
}

export default Main;