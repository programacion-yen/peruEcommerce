import {GetProductos} from '../../pages/api/Cart'
import useLogin from '/hooks/useLogin';

export function ContadorCarrito(){

	const {isLogged} = useLogin()
	let TipoUsuario = '';

	if(isLogged)
	{

		if(localStorage.getItem('siPremium') == 1 && localStorage.getItem('siScott') == 1)
		{
			TipoUsuario = 'Premium_Scott';
			
		}
		else if(localStorage.getItem('siPremium') == 0 && localStorage.getItem('siScott') == 1)
		{
			TipoUsuario = 'Scott';
		}
		else if (localStorage.getItem('siPremium') == 1 && localStorage.getItem('siScott') == 0)
		{
			TipoUsuario = 'Premium_Andes'
		}
		else
		{
			TipoUsuario = 'Andes_Normal'
		}

	}
	else
	{
		TipoUsuario = 'NoLogueado'
	}

	let productos = GetProductos();

	let reserva =[];
	let Premium = [];
	let Scott = [];
	let SinCuenta = [];
	let Andes = [];

	for(let i = 0; i < productos.length; i++)
	{

		if(productos[i].TipoU == "Reserva")
		{
			reserva.push(productos[i]);
		}

		if(TipoUsuario == "NoLogueado")
		{
			if(productos[i].TipoU == "NoLogueado")
			{
				SinCuenta.push(productos[i]);
			}
		}
		else if(TipoUsuario == "Andes_Normal")
		{
			if(productos[i].TipoU == "Andes")
			{
				Andes.push(productos[i]);
			}
		}
		else if(TipoUsuario == "Premium_Andes")
		{
			if(productos[i].TipoU == "Premium")
			{
				Premium.push(productos[i]);
			}
		}
		else if(TipoUsuario == "Scott")
		{
			if(productos[i].TipoU == "Scott")
			{
				Scott.push(productos[i]);
			}
		}
		else if(TipoUsuario == "Premium_Scott")
		{
			if(productos[i].TipoU == "Scott")
			{
				Scott.push(productos[i]);
			}
			else if(productos[i].TipoU == "Premium")
			{
				Premium.push(productos[i]);
			}
		}
	}


	let contador = 0;

	if(reserva.length > 0)
	{
		contador += reserva.length;
	}

	if(Premium.length > 0)
	{
		contador += Premium.length;
	}

	if(Scott.length > 0)
	{
		contador += Scott.length;
	}

	if(SinCuenta.length > 0)
	{
		contador += SinCuenta.length;
	}

	if(Andes.length > 0)
	{
		contador += Andes.length;
	}

		return contador;


}