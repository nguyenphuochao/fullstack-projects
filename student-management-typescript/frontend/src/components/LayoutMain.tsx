import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

const LayoutMain = () => {
    return (
        <>
            <div className="container" style={{ marginTop: '20px' }}>
                <Header />
                <Outlet />
                <Footer />
            </div>

        </>
    )
}

export default LayoutMain