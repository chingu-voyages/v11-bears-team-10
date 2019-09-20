import React,{useState, useEffect} from 'react'
import  ReactDOM  from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export default (Component) => {
  	return (props) => {
		const[element] = useState(document.createElement('div'))
	
		useEffect(() => {
			modalRoot.appendChild(element)
			
			return () => {
				modalRoot.removeChild(element)
			}
		})
	
		return (
			ReactDOM.createPortal(
			 <Component {...props} />,
				element
			)
		)
	}
}

