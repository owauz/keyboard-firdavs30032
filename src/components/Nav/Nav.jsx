import { useState, useEffect } from "react"
export default function Nav() {
    const [IsDarkMode, setIsDarkMode] = useState(false)
    const toggleDarkMode = () => {
        setIsDarkMode(!IsDarkMode)
    }
    useEffect(() => {
        document.body.classList.toggle('dark', IsDarkMode)
    }, [IsDarkMode])
    return (
        <>
            <nav>
                <div className="container">
                    <div className="navbar">
                        <img src="img/book.svg" alt="" />
                        <div className="shrift-darkmode">
                            <select
                                style={{ color: !IsDarkMode ? "black" : "white" }}
                                onChange={(e) => {
                                    const value = e.target.value
                                    document.body.classList.remove("font1", "font2", "font3")
                                    if (value === "sans") {
                                        document.body.classList.add("font1")
                                    }else if (value === "serif") {
                                        document.body.classList.add("font2")
                                    }else if (value === "mono") {
                                        document.body.classList.add("font3")
                                    }
                                }}>
                                <option value="sans">Sans Serif</option>
                                <option value="serif">Roboto</option>
                                <option value="mono">Mono</option>
                            </select>
                            <img className="line" style={{marginTop:'0px'}} src="img/line.svg" alt="" />
                            <button className="toggle-btn" onClick={toggleDarkMode} style={{ backgroundColor: !IsDarkMode ? "#757575" : "#A445ED" }}>
                                <button className="toggle-btns" style={{ marginLeft: !IsDarkMode ? '-18px' : '18px', }}></button>
                            </button>
                            <img src={IsDarkMode ? "img/pink-moon.svg" : "img/moon.svg"} alt="" style={{ width: "20px", height: "20px", marginRight: "8px" }} />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}