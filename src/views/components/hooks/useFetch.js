import React, { useState, useEffect, useReducer, useContext, useRef } from "react"
import ReactDOM from "react-dom"
import axios from "axios"

const useFetch = (url) => {
    const [state, setState] = useState([])
    useEffect(() => {
        console.log(url)
        axios.get(url).then(snap => setState(snap.data)).catch(err => setState([]))
    }, [url])


    return state
}

export default useFetch;
