import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import axios from "axios"

const useUser = (url = "/api/user") => {
    const [state, setState] = useState({})
    useEffect(() => {
        axios.get(url).then(snap => setState(snap.data)).catch(err => setState({}))
    }, [url])


    return state
}

export default useUser;