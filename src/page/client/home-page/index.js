import {UseDocumentTitle} from "~/hooks";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function HomePage(){
    UseDocumentTitle('Home')
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/sign-in')
    }, []);
    return (
        <div>
            {/*home page*/}
            {/*<Link to={'/dashboard'}>Dashboard</Link>*/}
        </div>
    )
}