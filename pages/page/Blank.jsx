import React from 'react';
import BreadCrumb from '/components/elements/BreadCrumb';


const breadCrumb = [
    {
        text: 'Inicio',
        url: '/',
    },
    {
        text: 'Políticas De Privacidad Y Aviso Legal',
    },
];
const BlankContent = () => (
    <>
        <BreadCrumb breadcrumb={breadCrumb} />
        <div className="ps-section--custom">
            <div className="container">
                <div className="ps-section__header">
                    <h2 style={{ color:'#003399' }}>ANDES INDUSTRIAL</h2>
                </div>
                <div className="ps-section__content" style={{ textAlign: 'justify' }}>
                    <h5>POR FAVOR LEA ATENTAMENTE LOS SIGUIENTES TÉRMINOS Y CONDICIONES DE USO (&quot;CONDICIONES&quot;) ANTES DE USAR CUALQUIERA DE LOS SITIOS WEB AFILIADAS SHIMANO 
                        (colectivamente, los &quot;Sitios&quot;) *.</h5>
                    <p>
                        AL ENTRAR EN EL QUE SITIOS, EL USUARIO, RECONOCE Y ACEPTA QUE EL ACCESO Y USO DE LOS SITIOS ESTÁN SUJETOS 
                        A LOS SIGUIENTES TÉRMINOS Y CONDICIONES DE USO Y LAS RENUNCIAS VARIOS EL PRESENTE DOCUMENTO.
                    </p>
                    <p>
                        SI USTED NO ESTÁ DE ACUERDO CON ESTAS CONDICIONES, NO ACCEDA A LOS SITIOS.
                    </p>
                    <p>
                        SHIMANO, Inc. y sus filiales (&quot;SHIMANO&quot;) se reservan el derecho de hacer revisiones ESTOS TÉRMINOS EN CUALQUIER MOMENTO, CON O SIN AVISO. 
                        USTED ACEPTA por tales revisiones y debería, por tanto, visitar periódicamente esta página para revisar los términos actuales.
                    </p>
                    <p>
                        USTED ES RESPONSABLE DE CONFORMIDAD CON CUALQUIERA Y TODAS LAS LEYES LOCALES APLICABLES DE SU USO DE LOS SITIOS. SHIMANO NO SE HACE 
                        RESPONSABLE NI GARANTIZA QUE LOS MATERIALES CONTENIDOS EN EL sitios son apropiados para, o accesibles desde todos los lugares.
                    </p>
                    <p>
                        AL ENTRAR EN LOS SITIOS DE USTED RECONOCE Y ACEPTA QUE EL USO DE LOS SITIOS ES BAJO SU PROPIO RIESGO Y QUE NINGUNA DE LAS PARTES QUE PARTICIPAN 
                        EN LA CREACIÓN, PRODUCCIÓN O ENTREGA DE LOS SITIOS SON RESPONSABLES POR DAÑOS DIRECTOS, INDIRECTOS, DAÑOS DIRECTOS, INDIRECTOS, MORALES, 
                        o cualquier otra pérdida, costos o gastos o cualquier tipo (incluyendo honorarios legales, honorarios de expertos u otros desembolsos) 
                        que puedan surgir, directa o indirectamente, a través SU ACCESO, USO O NAVEGACIÓN DE LOS SITIOS O POR MEDIO DE LA DESCARGA DE CUALQUIER MATERIAL, 
                        DATOS, TEXTO, IMÁGENES, VIDEO O AUDIO DE LOS SITIOS, INCLUYENDO PERO NO LIMITADO A CUALQUIER DAÑO CAUSADO POR CUALQUIER virus o errores informáticos, 
                        la acción humana o inacción o CUALQUIER SISTEMA INFORMÁTICO, LÍNEA TELEFÓNICA, HARDWARE, SOFTWARE O MAL FUNCIONAMIENTO DEL PROGRAMA, o cualquier otro error, 
                        falla o retraso en las transmisiones informáticas o conexiones de red.
                    </p>
                    <h5>Derechos de autor</h5>
                    <p>
                        Shimano es el propietario del copyright (© 2009, Shimano, Inc. Todos los derechos reservados) de todo el contenido en el sitio y ninguna porción de los Sitios, 
                        incluyendo pero no limitado a, texto, gráficos, imágenes, audio o video, se puede utilizar, reproducir, distribuir, mostrar o transmitir de cualquier manera, 
                        para cualquier propósito, sin el permiso expreso y por escrito de Shimano, salvo lo dispuesto expresamente en este documento.
                    </p>
                    <h5>Uso de los Sitios</h5>
                    <p>
                        Shimano le autoriza a ver y descargar los materiales en los Sitios solamente para su uso privado, siempre que se mantengan y no cambiar o eliminar los 
                        derechos de autor y de todos y otros avisos propietarios contenidos en los materiales originales.
                    </p>
                    <p>
                        Usted no puede modificar los materiales en los Sitios en ninguna forma ni reproducir o mostrar públicamente, ejecutar, distribuir, vender, alquilar, 
                        transmitir crear trabajos derivados de, o utilizar dichos materiales para fines públicos o comerciales. A estos efectos, el uso de estos materiales en 
                        cualquier otro sitio web o entorno informático en red para cualquier propósito. Los materiales en los Sitios son propiedad intelectual y cualquier uso no
                        autorizado de cualquier material en el sitio puede violar los derechos de autor, marcas registradas y otras leyes. Si usted incumple alguno de estos términos, su autorización para usar el sitio terminará automáticamente y usted deberá destruir inmediatamente cualquier material descargado o impreso.
                    </p>
                    <p>
                        No se puede cargar, distribuir o publicar a través de los Sitios cualquier información u otro material que (i) viole o infrinja los derechos de cualquier persona,
                        incluidos los derechos de autor, patentes, marcas registradas, marcas de servicio, secretos comerciales u otros derechos de propiedad, (ii) sea difamatorio, 
                        amenazante, difamatorio, obsceno, indecente, pornográfico, o podría dar lugar a responsabilidad civil o criminal bajo las leyes de la ley de Japón o internacionales, 
                        o (iii) incluye todos los errores, virus, gusanos , puertas trampa, caballos de Troya, hacks, o cualquier otro código dañino o propiedades. Usted acepta indemnizar a 
                        Shimano por cualquier daño que el resultado de cualquiera de las acciones anteriores. Shimano puede eliminar o quitar cualquier información o cualquier otro material 
                        que es cargado por usted en cualquier momento, en su discreción única y absoluta.
                    </p>
                    <p>
                        Sujetos a la Política de Privacidad, cualquier cosa que usted envíe o publique en los Sitios o Shimano, incluyendo ideas, conocimientos, técnicas, preguntas, 
                        comentarios y sugerencias (colectivamente, &quot;Materiales&quot;) es y será tratado como no confidencial y no . Al enviar o publicar una presentación a los Sitios o 
                        Shimano, Usted renuncia a cualquier derecho que pueda tener en dicha presentación (a excepción de las cuestiones contempladas en la Política de Privacidad). 
                        Shimano tendrá el derecho exclusivo, libre de regalías, mundial, perpetuo y transferible para usar, copiar, reproducir, distribuir, mostrar, ejecutar, vender, 
                        arrendar, transmitir o crear trabajos derivados de ninguna de las entregas por cualquier medio y en cualquier forma, y ​​para traducir, modificar, realizar ingeniería 
                        inversa, desmontar o descompilar dicha Presentación. Todos los envíos automáticamente pasarán a ser propiedad única y exclusiva de Shimano, sin compensación alguna, 
                        y no será devuelto.
                    </p>
                    <h5>Aviso legal</h5>
                    <p>
                        Los materiales proporcionados en los Sitios se proporcionan &quot;tal cual&quot;, &quot;lugar donde se encuentra&quot; sin garantías de ningún tipo, ya sea expresa o implícita, 
                        incluyendo pero sin limitarse a garantías de comerciabilidad, adecuación para un propósito particular y no violación de los de propiedad intelectual. Shimano 
                        obligaciones con respecto a sus productos se rigen exclusivamente por los acuerdos bajo los que se proporcionan y nada en los Sitios debe interpretarse como 
                        una modificación de dichos acuerdos. Además, Shimano no garantiza la exactitud o la integridad de los materiales en los Sitios. Shimano puede hacer cambios y / o 
                        actualización de los materiales en los Sitios, o en los productos y precios descritos en los Sitios, en cualquier momento sin previo aviso. Los materiales en los 
                        Sitios puede estar fuera de fecha y Shimano no ofrece ninguna garantía, declaración o compromiso de actualizar los materiales en los sitios en términos de su 
                        corrección, exactitud, adecuación, utilidad, puntualidad, fiabilidad, etc. La información publicada en el sitio puede hacer referencia a productos que no están 
                        disponibles en su país.
                    </p>
                    <p>
                        Shimano no representa ni garantiza que las funciones y servicios disponibles en el sitio será ininterrumpido o libre de errores, que los defectos sean corregidos, 
                        o que el sitio o el servidor que hace que el sitio esté disponible estén libres de virus u otros componentes dañinos.
                    </p>
                    <p>
                        Shimano se exime de cualquier responsabilidad por los actos, omisiones y conducta de los usuarios o terceros en relación con o relacionada con el uso de los Sitios.
                        Usted asume total responsabilidad por el uso de los Sitios y los sitios web vinculados.Su único recurso en contra de Shimano de insatisfacción con los Sitios o cualquier 
                        material contenido al respecto es dejar de usar los Sitios o cualquier tipo de materiales.Esta limitación en el alivio es una parte de la negociación entre las partes.
                    </p>
                    <h5>Limitación de responsabilidad</h5>
                    <p>
                        En ningún caso Shimano u otros terceros mencionados en los Sitios serán responsables de daños directos, especiales, incidentales, indirectos o consecuentes 
                        de ningún tipo (incluyendo, sin limitaciones, las que resultan de la pérdida de beneficios, datos perdidos o interrupción de negocio) que resulten del uso, 
                        imposibilidad de uso o los resultados del uso de los Sitios, los sitios web vinculados a los Sitios o los materiales o información o servicios contenidos en 
                        uno o en todos los sitios web, ya sea basado en garantía, contrato, agravio o cualquier otra teoría legal y si Shimano no ha sido advertido de la posibilidad 
                        de tales daños.
                    </p>
                    <p>
                        Si, no obstante las disposiciones de estos Términos, Shimano se encuentra para ser responsable ante usted por cualquier daño o pérdida que surja de o relacionados 
                        de alguna manera con el uso de los Sitios o cualquier material contenido en ella, la responsabilidad de Shimano no será en ningún caso exceder de EE.UU. $ 100,00.
                    </p>
                    <p>La ley aplicable no puede permitir la limitación o exclusión de responsabilidad o daños incidentales o consecuentes, por lo que la limitación o exclusión puede no aplicarse a usted.</p>
                    <h5>Los enlaces a otros sitios web</h5>
                    <p>
                        Los enlaces a sitios web de terceros en los Sitios se proporcionan únicamente para su comodidad y por lo tanto el acceso a su propio riesgo. Si utiliza estos vínculos, 
                        abandonará el sitio y Shimano no tiene ningún control sobre el contenido de estos sitios web. Shimano no lo hace, y usted acepta que Shimano no tiene la obligación, 
                        revisar las comunicaciones, materiales, información, opiniones y otros contenidos publicados en los sitios web de terceros. Shimano no ha revisado estos sitios Web de terceros, 
                        no controla y no es responsable de ninguno de estos sitios web o sus contenidos. Por lo tanto, Shimano no avala ni representa a ninguno de ellos, la información, 
                        productos o materiales que se encuentran allí, o cualquier resultado que pueda obtenerse mediante su utilización. SI USTED DECIDE ACCEDER A CUALQUIERA DE LOS SITIOS WEB 
                        DE TERCEROS VINCULADOS EN LOS SITIOS, LO HACE BAJO SU PROPIO RIESGO.
                    </p>
                    <h5>Marcas / Propiedad Intelectual</h5>
                    <p>
                        Todas las marcas registradas, marcas de servicio y nombres comerciales de Shimano utilizados en los Sitios son marcas comerciales o marcas comerciales registradas de Shimano. 
                        Todos los demás productos y nombres de compañías mencionados en los Sitios son marcas comerciales o marcas comerciales registradas de sus respectivos dueños. Al entrar en el sitio, 
                        usted reconoce y acepta que cualquier nombre, logotipo o marca comercial incluida en el sitio es propiedad de Shimano y no puede ser utilizada por usted sin el consentimiento previo 
                        y por escrito. Cualquier otra propiedad intelectual de los Sitios, incluyendo pero no limitado a las patentes, concedidas o pendientes, son propiedad exclusiva de Shimano y / o de 
                        sus licenciatarios. Shimano hará cumplir agresivamente sus derechos de propiedad intelectual con todo el rigor de la ley. Cualquier uso no autorizado del nombre, logotipo y marcas 
                        pueden ser objeto de sanciones o daños, incluyendo pero no limitado a los relacionados con la violación de marcas registradas, derechos de autor, la privacidad y los derechos de 
                        publicidad.
                    </p>
                    <h5>Indemnidad</h5>
                    <p>
                        Usted acepta defender, indemnizar y mantener indemne Shimano de cualquier y todo reclamo, responsabilidades, pérdidas, gastos, daños, costos, incluyendo, sin limitación razonable 
                        de los honorarios de abogados, relacionados con cualquier violación de estos términos y condiciones de uso que usted o su representante autorizado los usuarios, o en conexión o 
                        derivados de o relacionados de alguna manera con el uso de los Sitios o cualquier otro producto de su compra en los Sitios.
                    </p>
                    <h5>Plazo Terminación</h5>
                    <p>
                        Estos términos son aplicables a usted acceder a los Sitios. Shimano se reserva el derecho en su entera discreción, de cancelar o restringir su uso del Sitio, sin previo aviso, 
                        por cualquier razón o no, y sin ninguna responsabilidad hacia usted o por terceros. Además, estos términos, o cualquier parte de ellos, podrá ser rescindido por Shimano 
                        sin previo aviso en cualquier momento, por cualquier razón. Las disposiciones relativas al Derecho de Autor, Marcas, Responsabilidad, Limitación de Responsabilidad, Indemnización 
                        y Varios, sobrevivirán a cualquier terminación.
                    </p>
                    <h5>Información de Contacto</h5>
                    <p>Por favor envíe sus preguntas o comentarios a su oficina local de Shimano.</p>
                    <h5>Reserva de Derechos</h5>
                    <p>Shimano se reserva para sí todos los derechos no expresamente concedidos aquí.</p>
                    <p>
                        * Los sitios incluyen, pero no se limitan a, y puede ser actualizada sin previo aviso http://www.shimano.com.au http://www.shimano.com, http://www.shimano-china.com, http: / / cycle.shimano-eu.com, http://www.shimano-benelux.com, 
                        http://www.shimano-nordic.com, http://www.shimano-france.com, http:// cycle.shimano.co.jp, http://bike.shimano.com, http://www.coasting.com, http://pro-bikegear.com, http://www.shimano-eyewear.com, http://www.shimano-cyclingwear.com, 
                        http://techdocs.shimano.com, http://fish.shimano-eu.com http://www.shimanofish.com.au, http:// shimanofireblood.com, http://shimanocarpexpert.com, http://fishing.shimano.co.jp, http://lafish.shimano.com, http://boat.shimano.com y http://aifie.shimano.com.
                        ***
                    </p>

                    <p style={{ textAlign: 'center' }}>Política de privacidad - Condiciones de Uso © 2012 SHIMANO TODOS LOS DERECHOS RESERVADOS</p>
                </div>
            </div>
        </div>
    </>
);

export default BlankContent;
