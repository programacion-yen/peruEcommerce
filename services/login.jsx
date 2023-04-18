// TODO: Cambiar url login
const api = 'https://apifbp.andesindustrial.cl/Api/v1/Login'

export default function login ({email,pass}){
    return fetch(api,{
        method: 'POST',
        headers: {
            'Accept': 'application/json,',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,pass})
    }).then(response => {
        if(!response.ok) throw new Error('response is not ok')
       /*  //console.log(response.json()) */
        return response.json()
    }).then(response => {
        const {token} = response
        return response
    })
    // .catch (error => {
    //     // console.log(error)
    // })
}