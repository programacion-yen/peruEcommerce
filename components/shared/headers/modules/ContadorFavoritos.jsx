import React, {useState, useEffect} from "react";
import Link from 'next/link';
import useLogin from "/hooks/useLogin";

export default function ContadorFavoritos(){
	const {favoritos, favhook, isLogged, idContacto} = useLogin();
	const [redirect, setRedirect] = useState('/');

	useEffect(() => {

		if(isLogged){
			setRedirect('/account/wishlist');
			favhook();
		}
		else{
			setRedirect('/loginpage/login_page');
		}

		
	},[isLogged, idContacto])

	return(
		<>
		{


			<Link href={redirect}>
				<a className="header__extra" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '36px' }}>
					{/* <i className="icon-heart"></i> */}
					<img src='/logo/favorite.svg' className='svgIconYellow' />
					<span>
						<i>{favoritos}</i>
					</span>
				</a>
			</Link>

			// isLogged ? 

			// <Link href="/account/wishlist">
			// 	<a className="header__extra">
			// 		<i className="icon-heart"></i>
			// 		<span>
			// 			<i>{favoritos}</i>
			// 		</span>
			// 	</a>
			// </Link>

			// :

			// <Link href="/loginpage/login_page">
			// 	<a className="header__extra">
			// 		<i className="icon-heart"></i>
			// 		<span>
			// 			<i>{favoritos}</i>
			// 		</span>
			// 	</a>
			// </Link>


		}
		</>
	)
}