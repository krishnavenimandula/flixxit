import styles from "./Dashboard";
import React, {useState} from "react";
import Navbar from '../Navbar/Navbar';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
    const[isScrolled, setIsScrolled] = useState(true)
    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0? false : true);
        return () => (window.onscroll = null);
    }
	return (
		<div className={styles.main_container}>   
            <Navbar isScrolled ={isScrolled} />
            <button className={styles.white_btn} onClick={handleLogout}>
					Logout
			</button>
			
		</div>
	);
};

export default Main;