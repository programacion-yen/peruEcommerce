
export const BlogTexto = ({ columna }) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {
                columna.titulo && <h3 style={{ fontSize: '22px' }}>{ columna.titulo }</h3>
            }
            
            <p style={{ fontSize: '18px', margin: 0 }}>{ columna.parrafo }</p>
        </div>
    )
}
