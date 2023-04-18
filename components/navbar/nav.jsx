import Menus from '/components/elements/menu/Menus';

export default function Nav({grupos}) {

    return (
        <nav className="navbar navbar-expand-lg" style={{ color: 'black', backgroundColor: '#fee01e', padding: 0 }}>
            <div className="container col-8 padding-global-home" style={{ maxWidth: '1200px', padding: '0 1rem' }}>
                <Menus grupos={grupos} />
            </div>
        </nav>
    )
}