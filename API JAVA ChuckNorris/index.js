/*Variable para identificar el boton*/
const but = document.querySelector('button');
/*Variable para que nos muestre la frase*/
const Parrafo = document.querySelector('h2');
but.addEventListener('click', getData)

async function getData()
{
	try 
	{
		/*Funcion Fetch que manda a llamar a nuestro enlace*/
		/*Fetch Permite crear una interfaz,que hace una comunicacion de JavaScript con la API*/
		const data = await fetch('https://api.chucknorris.io/jokes/random');
		const json = await data.json();
		/*console.log(json);
		console.log(json.value);*/
		Parrafo.textContent = json.value;
	}
	catch(e) 
	{
		/*Try Catch para que muestre un error, en caso de haberlo*/
		console.error(e);
	}
}