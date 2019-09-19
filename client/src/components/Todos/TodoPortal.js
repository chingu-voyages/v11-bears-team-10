import React,{useState, useEffect} from 'react'
import  ReactDOM  from 'react-dom';

import Todos from './Todos'

const modalRoot = document.getElementById('modal-root');

function TodoPortal(props){
	const[element] = useState(document.createElement('div'))

	useEffect(() => {
		modalRoot.appendChild(element)
		
		return () => {
			modalRoot.removeChild(element)
		}
	},[])

	return (
    ReactDOM.createPortal(
		 <Todos {...props} />,
		  element
		)
	)
}

export default TodoPortal;