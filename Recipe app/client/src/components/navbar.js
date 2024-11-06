import {Link} from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';


export const Navbar = ()=>{
    const [cookies,setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const logout = ()=>{
        setCookies("access_token","");
        window.localStorage.removeItem("userId");
        navigate("/auth");
    }
    return (
        <div className="navbar">
            <Link to="/home" ><i className="fa fa-home"></i>Home</Link> 
            <Link to="/create-recipe" ><FontAwesomeIcon icon={faUtensils} />Create a RecYippee!</Link> 
            <Link to="/saved-recipes" ><FontAwesomeIcon icon={faBookmark} />Saved RecYippees</Link> 
            {!cookies.access_token ? (
                <Link to="/auth" ><FontAwesomeIcon icon={faSignInAlt} />Login/Register</Link> 
                ): (
                <button onClick ={logout}><FontAwesomeIcon icon={faSignInAlt} />Logout</button>
                )}
            
        </div>
    )
}