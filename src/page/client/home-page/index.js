import {UseDocumentTitle} from "~/hooks";
import {Link} from "react-router-dom";

export default function HomePage(){
    UseDocumentTitle('Home')
    return (
        <div>home page
            <Link to={'/dashboard'}>Dashboard</Link>
        </div>
    )
}