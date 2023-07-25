import axios from "axios";
import React , {Component} from "react";
import Modal from "./Modal/Modal";
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      players: [],
      modal: false
    }
  }
  async componentDidMount(){
    const request = await axios.get(`http://localhost:788/players`)
    const response = await request.data
    if(response){
      this.setState({
        players: response
      })
    }
  }
  handleDeletePlayer =  (idx) => {
    axios.delete(`http://localhost:788/players` + `/${idx}`).then(response => {
      console.log(response.data)
    })
    axios.get(`http://localhost:788/players`).then(response => {
      this.setState({
        players: response.data
      })
    })
  }
  closeModal = () => {
    this.setState({
      modal: false
    })
  }
  handleGetUsers = async () => {
    const request = await axios.get(`http://localhost:788/players`)
    const response = await request.data
    if(response){
      this.setState({
        players: response
      })
    }
  }
  render() {
    const {players, modal} = this.state
    return (
    <div className="text-light text-center my-4">
      <div className="container">
        {modal ? (
          <Modal closeModal={this.closeModal} handleGetUsers={this.handleGetUsers}/>
        ):  null}   
        <h1 className="text-uppercase mb-5">⚽Transfer <span className="text-lowercase">market</span></h1>
        <div className="row">
          <div className="col">
            <button className=" mb-3 btn btn-success" onClick={() => this.setState({
              modal: !this.state.modal
            })}>Add User</button>
            <table className="w-50 table table-hover mx-auto table rounded">
              <thead className="">
                <tr>
                  <th>NO</th>
                  <th>NAME</th>
                  <th>AGE</th>
                  <th>PRICE</th>
                  <th>DEL</th>
                </tr>
              </thead>
              { players?.length ? (
                <tbody>
                   {players?.map((item, index) => {
                    return(
                      <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.firstname}</td>
                        <td>{item.age}</td>
                        <td>
                          <span className="badge bg-primary">💰$ {item.price} 00 e </span>
                        </td>
                        <td><button onClick={() => this.handleDeletePlayer(index+1)} className="btn btn-danger btn-sm">Delete</button></td>
                      </tr>
                    )
                   })} 
                </tbody>
              ): (
                <tbody className="bg-danger text-danger">
                  <tr>
                  <td colSpan={4} className="text-danger">Ma'lumotlar kelmadi</td>
                  </tr>
                </tbody>
              )}              
            </table>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
export default App;