import axios from "axios";

import Validation from "../../validation";
// import setUser from "./setUser";
import setError from "./setError";

export function createProject(data) {
  let title = data.title;
  let description = data.description;
  return dispatch => {
    const validation = new Validation(data, {
      title: "min:4",
      description: "min:4"
    });
    validation.validate();
    axios
      .post(
        `/project/${data.userId}`,
        {
          title,
          description
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken")
          }
        }
      )
			.then(response =>
				{
					console.log("at project", response.data)
					dispatch({
						type: "ADD_PROJECT",
						payload: response.data
					})
				}
       
      )
      .catch(e => {
        if (!e.response)
          dispatch(setError({ requestTimeout: e.code === "ECONNABORTED" }));
        else if (e.response.status !== 401)
          dispatch(setError({ statusCode: e.response.status }));
      });
  };
}



// async function getData(){
// 	const id = localStorage.getItem('user_id');
// 	try {
// 		const response = await axios.get(`/users/${id}`, 		{
// 			headers: {
// 				Authorization: "Bearer " + localStorage.getItem("authToken")
// 			}
// 		});
// 		setData(response.data.user)
// 	} catch (error) {
// 		console.error(error);
// 	}
// }


// useEffect(() => {
// 	 getData()
// },[])