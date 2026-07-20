import { Link } from 'react-router-dom';


export  function Sidebar(){

return (

<aside>

<h2>Mi Biblioteca</h2>


<Link to="/">
Dashboard
</Link>


<Link to="/biblioteca">
Biblioteca
</Link>


</aside>

)

}