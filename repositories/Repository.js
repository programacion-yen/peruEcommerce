export default function repositories()
{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const serializeQuery = (query) => {
        return Object.keys(query)
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
            )
            .join('&');
    };

    const url = 'https://apiandes.andesindustrial.cl/web/Api/v1'
    const urlMinisitio = 'https://apiandes.andesindustrial.cl/web/Api/v1/Utilidades'

    const urlBest = 'https://apifbp.andesindustrial.cl/Api/v1'

    return {
        requestOptions,
        serializeQuery,
        url,
        urlMinisitio,
        urlBest
    }
}
