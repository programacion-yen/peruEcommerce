import { BlogImagen } from "./BlogImagen"
import { BlogTexto } from "./BlogTexto"

export const BlogFila = ({ fila }) => {

    return (
        <div className="row">
            {
                fila.columnas.map( (columna, i, a) => (
                    <div className={`col-12 col-lg-${12/a.length}`} key={i} style={{ display: 'flex', marginBottom: '4%' }}>
                        {
                            columna.tipo === 'imagen'
                                ? <BlogImagen columna={columna} />
                                : <BlogTexto columna={columna} />
                        }
                    </div>
                ))
            }
        </div>
    )
}
