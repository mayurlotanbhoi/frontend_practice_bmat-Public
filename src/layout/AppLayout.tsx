import React from 'react';
import { Outlet } from 'react-router-dom';


const Layout: React.FC = () => {
  
 
    return  (
        <main className="main">
            {/* <Header/> */}
            {/* <ScrollToTop /> */}
            <div className={` container`}>
                <Outlet/>
            </div>  {/* {children} */}
            {/* <Footer/> */}
        </main>
       
    );
};

export default Layout;
