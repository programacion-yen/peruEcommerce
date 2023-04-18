import {BASE_PATH, BASE_PATH_PUBLICA, BASE_PATH_PUBLICA_FBP} from '../../utils/constant';
import axios from 'axios';

export async function registerApi(FormData){

	try {
		const url = `${BASE_PATH_PUBLICA_FBP}/Api/v1/RegistroUsuario`;
		const result = await axios.post(url, FormData);
		return result;

	} catch (error) {
		//console.log(error);
		return null;
	}

}