import {Sidebar}from './Sidebar';
import {Navbar} from './Navbar';


interface Props{
    children: React.ReactNode;
}


export function MainLayout({children}:Props){

return (

<div className="flex">

<Sidebar/>

<div className="flex-1">

<Navbar/>

<main>
{children}
</main>

</div>

</div>

)

}