import React from 'react'
import '../Styles/Loader.css'

const Loader = () => {
    return (
        <>
            <div className="loader">
                <div className="loader-container">
                    <i className="fa-regular fa-circle fa-bounce" style={{
                        color: "#ffff"
                    }}></i>
                </div>
            </div>
        </>
    )
}

export default Loader