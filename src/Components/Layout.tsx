import { useState } from 'react'
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <div style={{ backgroundColor:"red" }}>Header</div>
            <div id="detail">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout