import React from 'react';
import parse from 'html-react-parser';

export default function PartialSpecification(detail) {

    let specification;
    if (detail) {
        detail.detail.map((item, i) => {
            specification = item.fichaTecnica != null ? item.fichaTecnica : '';
        })
    }
    
    return (
        <div className="table-responsive">
            <table className="table table-bordered ps-table ps-table--specification">
                <tbody>
                    <tr>
                        <td>Marca</td>
                        <td>{specification.marca ? specification.marca : 'Sin datos'}</td>
                    </tr>
                    <tr>
                        <td>Uso</td>
                        <td>{specification.uso ? specification.uso : 'Sin datos'}</td>
                    </tr>
                    <tr>
                        <td>Modelo</td>
                        <td>{specification.modelo ? specification.modelo : 'Sin datos' }</td>
                    </tr>
                    <tr>
                        <td>Talla / Medidas</td>
                        <td>{specification.talla_medida ? specification.talla_medida : 'Sin datos' }</td>
                    </tr>
                    <tr>
                        <td>Material Color</td>
                        <td>{specification.material_color ? specification.material_color : 'Sin datos' }</td>
                    </tr>
                    <tr>
                        <td>Peso</td>
                        <td>{specification.peso ? specification.peso : 'Sin datos' }</td>
                    </tr>
                    <tr>
                        <td>Características Especificas</td>
                        <td>
                            {
                                specification.caracteristicas_especificas 
                                ? parse(specification.caracteristicas_especificas)
                                : 'Sin datos'
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Procedencia / Origen</td>
                        <td>{specification.procedencia_origen ? specification.procedencia_origen : 'Sin datos'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

