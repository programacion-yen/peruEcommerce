import {message} from 'antd'


export function Success (mensaje) {
	message.success(mensaje, 1);
}

export function MError(mensaje){
	message.error(mensaje, 1);
}

export function Warning(mensaje){
	message.warning(mensaje, 1);
}