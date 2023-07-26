import React from "react";
import Forma from "../Settings/assets/images/images-removebg-preview.png"
import axios from "axios";
class ModalProgram extends React.Component{
    constructor(props){
        super(props);
        this.state = {
             
        }
    }
    handleDeleteModal = () => {
        this.props.closeModal()
    }
    handleChangeCurrent = (type, params) => {
        if(type === "age"){
            if(params){
                this.props.incAge()
            }else{
                this.props.decAge()
            }
        }else if(type === "price"){
            if(params){
                this.props.incPrice()
            }else{
                this.props.decPrice()
            }   
        }
    }
    handleSaveChange = async () => {
        const request = await axios.post(`http://localhost:788/players`, {
            firstname: "None",
            age: this.props.age,
            price: this.props.price,
            club: "None"
        })
        let response;
        if(request.status === 201){
            this.props.closeModal()
            response = await request.data
        }
        return response
    }
    componentWillUnmount(){
        this.props.handleGetUsers()
    }
    render() {
        return (
            <div className="modal__overlay position-fixed top-0 start-0 end-0 bottom-0 align-items-center justify-content-center d-flex    " style={{background: "rgba(0,0,0,0.4)"}}>
                <div className="modals bg-light text-dark w-50 pb-3 mx-auto ">  
                    <div className="bg-primary text-light p-2 modal__header d-flex align-items-center justify-content-center position-relative">
                        <h2>Add program User</h2>
                        <button onClick={this.handleDeleteModal} className="position-absolute top-0 end-0 btn btn-danger py-0 px-1 fs-4 rounded-0 text-light">&times;</button>
                    </div>
                    <div className="modal__body p-2 bg-light w-75 mx-auto">
                        <div className="row p-2 d-flex align-items-center">
                            <div className="col-5">
                                <div className="btn-group" role="group">
                                    <button className="btn btn-secondary  group-item" onClick={() => this.handleChangeCurrent("age", false)}>Age -</button>
                                    <button className="btn btn-light  group-item">{this.props.age}</button>
                                    <button className="btn btn-secondary" onClick={() => this.handleChangeCurrent("age", true)}>Age + </button>                                
                                </div>
                            </div>
                            <div className="col-2">
                                <img className="img-fluid" src={Forma} alt="Forma" />
                            </div>
                            <div className="col-5">
                            <div className="btn-group" role="group">
                                    <button className="btn btn-secondary  group-item" onClick={() => this.handleChangeCurrent("price", false)}>Price -</button>
                                    <button className="btn btn-light  group-item">{this.props.price}</button>
                                    <button className="btn btn-secondary" onClick={() => this.handleChangeCurrent("price", true)}>Price +</button>                                
                                </div>    
                            </div>
                        </div>
                    </div>
                    <div className="modal__program">
                        <button className="btn btn-danger me-2" onClick={this.handleDeleteModal}>Cancel</button>
                        <button className="btn btn-success" onClick={this.handleSaveChange}>Save changes</button>
                    </div>
                </div>
             </div> 
        );
    }
}
export default ModalProgram