import axios from "axios";
import React from "react";
class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
        console.log(props)
    }
    componentWillUnmount(){
        return "Delete Component"
    }
    handleDeleteModal = () => {
        this.props.closeModal()
    }
    handleSub = async (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        new Promise((resolve, reject) => {
            if(data.get("name")){
                resolve(
                    {
                        firstname: data.get("name"),
                        lastname: data.get("age"),
                        email: data.get("price"),
                    }
                )
            }else{
                reject({
                    error: true
                })
            }
        }).then(async data => {
            const request = await axios.post(`http://localhost:788/players`, data)
            const response = await request.data
            this.props.handleGetUsers()
            this.props.closeModal()
            return response
        })
    }
    render() {
        return (
             <div className="modal__overlay position-fixed top-0 start-0 end-0 bottom-0 align-items-center justify-content-center d-flex    " style={{background: "rgba(0,0,0,0.4)"}}>
                <div className="modals bg-light text-dark w-50 mx-auto ">  
                    <div className="bg-primary text-light p-2 modal__header d-flex align-items-center justify-content-center position-relative">
                        <h2>Add User</h2>
                        <button onClick={this.handleDeleteModal} className="position-absolute top-0 end-0 btn btn-danger py-0 px-1 fs-4 rounded-0 text-light">&times;</button>
                    </div>
                    <div className="modal__body p-2 bg-light w-75 mx-auto">
                        <form autoComplete="off" className="w-75 d-flex flex-column  mx-auto " onSubmit={this.handleSub}>
                            <label htmlFor="name" className="w-100">
                                <input type="text" name="name" id="name" className="w-100 form-control" placeholder="Name"  />
                            </label>
                            <label htmlFor="age">
                                <input type="number" name="number" id="number" placeholder="Age" className="w-100 form-control my-3  " />
                            </label>
                            <label htmlFor="price">
                                <input type="price" name="price" id="price" placeholder="Price" className="w-100 form-control my-3  " />
                            </label>
                            
                            <div className="my-2">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
             </div>
        );
    }
}
export default Modal;