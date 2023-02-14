import React, { useContext } from 'react'
import {Link} from 'react-router-dom'

function Topbar() {

    const clear = ()=>{
        window.localStorage.clear()
    }

    return (
        <nav class="navbar" style={{borderBottom:"5px solid black",boxShadow:"0px 0px 10px 10px rgba(0, 0, 0, 0.5)"}}>
            <div style={{ paddingLeft: "0px" }}>
                <i class="fa-brands fa-stack-overflow fa-3x"></i>
                <span style={{ fontSize: "25px", padding: "10px" }}>StackOverflow</span>
            </div>

            <button className='searchBar'>
                <i style={{ marginRight: "10px" }} class="fa-solid fa-magnifying-glass"></i>
                <input
                    spellcheck="false"
                    type="text"
                    class="search"
                    id="search"
                    placeholder="Search questions here..."
                ></input>
            </button>
            <nav class="navbar-menu">
                <div className='p-2 mr-3' >{window.localStorage.getItem("Name")}</div>
                <Link to={"/"} onClick={clear} className='btn btn-dark' style={{ marginRight: "20px" }}><i class="fa-solid fa-arrow-right-from-bracket"></i>Log out</Link>
            </nav>
        </nav>
    )
}

export default Topbar