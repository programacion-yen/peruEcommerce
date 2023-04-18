import { useEffect, useState } from "react"

export const BlogImagen = ({ columna }) => {

    const [responsive, setResponsive] = useState(false)

    const handleResize = () => {
        if(window.innerWidth <= 576) {
            setResponsive(true)
        } else if(window.innerWidth > 576) {
            setResponsive(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize, false);
        }
    }, [])

    return (
        <img src={ responsive ? columna.mobile || columna.web : columna.web} style={{ margin: '0 auto', objectFit: 'contain' }} />
    )
}
