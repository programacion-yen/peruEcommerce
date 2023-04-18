import {useEffect, useState} from "react";
import useLogin from "/hooks/useLogin";
import Link from 'next/link';

export default function ContadorCart(){
	const {ContCart, carthook, isLogged} = useLogin();
	const [redirect, setRedirect] = useState('/');

	useEffect(() => {

		if(isLogged ){
			setRedirect('/carritoCompra/cart');
			carthook();
		}
		else{
			setRedirect('/loginpage/login_page');
		}

	}, [isLogged])

	return(
		<>
			{
				<Link href={redirect}>
					<a className="header__extra" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '36px' }}>
					<img src='/logo/shopping-cart-bl.svg' className='svgIconYellow' />
						<span>
							<i>{ContCart}</i>
						</span>
					</a>
				</Link>
			}
		</>

	)
}