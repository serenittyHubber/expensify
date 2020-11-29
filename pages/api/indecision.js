import React from "react";
import Modal from 'react-modal';
class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.handlePicker = this.handlePicker.bind(this);
        this.handleOptions = this.handleOptions.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            options: ['café', 'Journal', 'Sionism', 'Judeus'],
            selectedOption: false
        }
    }

    handlePicker(){
        const num = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[num];
        this.setState(()=>{
            return{
                selectedOption: option
            }
        });
        console.log(this.state.selectedOption);
    }

    handleOptions(option){
        if(!option){
            return "Write some option";
        }else if(this.state.options.indexOf(option) > -1){
            return "Already exist";
        }
        this.setState((prevState)=>{
            return{
                options: prevState.options.concat(option)
            }
        })
    }
    closeModal(){
        this.setState(()=>{return{ selectedOption: false}})
    }
 
    render(){
        return(
        <div>
            <h1>Indecision</h1>
            <Header title="Indecision APP pra caralho" />
            <AddOptions handleOptions={this.handleOptions} />
            <Options options={this.state.options} />
            <Actions handlePicker={this.handlePicker} />
            <OptionModal selectedOption={this.state.selectedOption} closeModal={this.closeModal}/>
        </div>
        );
    }

}
    

const OptionModal = (props) => (
    <Modal
         isOpen={!!props.selectedOption}
         contentLabel="Modal Serior"
         onRequestClose={props.closeModal}
         closeTimeoutMS={200}
         ariaHideApp={false}
         >
        <h3> Modal Content </h3>
        <h3 className="modal__title">Selected Option</h3>
        {props.selectedOption && <p>{props.selectedOption}</p>}
        <button onClick={props.closeModal}>Close</button>
    </Modal>
);

    const Header = (props) =>{ 
        return(
        <div>{props.title}</div>
        )
    }

    class Actions extends React.Component{
       render(props){
           return(
                <div>
                    <button onClick={this.props.handlePicker}>Handle</button>
                </div>
           )
       }
    }
    

    const Options = (props) =>{
        return(
            <div>
                <ul>
                    {props.options.map((option)=>(<Option key={option} optionTxt={option} />))}
                </ul>
            </div>
        )
    }
   
    const Option = (props) =>{
        return(
        <li>{props.optionTxt}</li>
        )
    }

    class AddOptions extends React.Component {
        state = { error: undefined }
        handleOpt = (e) =>{
            e.preventDefault();
            const option = e.target.elements.option.value.trim();
            console.log(option);
            const error = this.props.handleOptions(option);
            if(error){
                this.setState(()=>{return {error}})
            }
        }
        render() { 
            return ( <div>
                {this.state.error && <div>🏘 {this.state.error}</div>}
                <form onSubmit={this.handleOpt}>
                    <input 
                        name="option"
                        type="text"
                        placeholder="Write a option"
                    />
                    <button type="submit"> 
                        add       
                    </button>
                </form>
            </div> );
        }
    }
     
export default IndecisionApp;