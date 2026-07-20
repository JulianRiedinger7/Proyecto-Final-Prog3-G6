interface Libro{

titulo:string;
autor:string;
portada:string;
estado:string;

}


interface Props{
libro:Libro;
}



export default function BookCard({libro}:Props){


return (

<div>


<img 
src={libro.portada}
/>


<h3>
{libro.titulo}
</h3>


<p>
{libro.autor}
</p>


<span>
{libro.estado}
</span>


</div>

)

}