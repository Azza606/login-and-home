import React from "react"
import {Link, Redirect} from "react-router-dom"

import { signup } from "../auth";



import Input from "../components/Input.component"
import Button from "../components/Button.component"
import "../css//signUpForm.page.css"


import SocialLogin from "../user/SocialLogin";




class SignIn extends React.Component{
    constructor(){
        super()

        this.state = {
            
                    "email":
                        {
                            "value":"",
                            "error_msg":"Email is invalid",
                            "has_error":false,
                        },
                    "fname":
                        {
                            "value":"",
                            "error_msg":"First name is invalid",
                            "has_error":false,
                        },
                    "lname":
                        {
                            "value":"",
                            "error_msg":"Last name is invalid",
                            "has_error":false,
                            
                        }
                    ,
                    "cin":
                        {
                            "value":"",
                            "error_msg":"Cin is invalid",
                            "has_error":false,
                        }
                    ,
                    "password1":
                        {   
                            "value":"",
                            "error_msg":"password must contain at least 8 characters",
                            "has_error":false,
                        },
                    "password2":
                        {
                            "value":"",
                            "error_msg":"confirm password didn't match",
                            "has_error":false,
                        },
                    redirect:false,
                    error:"",
                    redirectToReferer: false,
                    loading: false
                }
    }
    

    handleData = (name,data_dict) => {
        var valid=""
        switch(name){
            case 'email':
                valid = data_dict.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                data_dict.has_error = valid ? false : true;
            break;
            case 'fname':
                valid = data_dict.value.length > 2 && data_dict.value.match(/^[A-Za-z]+$/);
                data_dict.has_error = valid ? false : true;
            break;
            case 'lname':
                valid = data_dict.value.length > 2 && data_dict.value.match(/^[A-Za-z]+$/);
                data_dict.has_error = valid ? false : true;
            break;
            case 'cin':
                valid = data_dict.value.length === 8;
                data_dict.has_error = valid ? false : true;
            break;
            case 'password1':
                valid = data_dict.value.length >= 8 && data_dict.value.match(/[a-zA-Z0-9]/)
                data_dict.has_error = valid ? false : true;
            break;
            case 'password2':
                valid = data_dict.value === this.state.password1.value
                data_dict.has_error = valid ? false : true;
            break;
        }
    
        return data_dict
    }

    handleChange = (e) =>{
        e.preventDefault();
        const {value, name} = e.target
        if (name==='email' && this.state.error ) this.setState({error:""})
        var _state = this.state[name]
        _state.value = value 
        _state = this.handleData(name,_state)
        this.setState({name:_state},
            
        )
    }

    

    handleSubmit= (event) => {
        event.preventDefault();
        const user = {};
        const formData = new FormData(event.target)
        var form_valid = true
        for (var name of formData.keys()) {
            if(this.state[name].value === ""){
                var _state = this.state[name];
                _state.has_error = true;
                this.setState({name:_state})
            }
            if (this.state[name].has_error ) form_valid = false  
      }
    if (form_valid){

        for (var key of formData.keys()) {user[key]=formData.get(key)}
        signup(user).then(data => {
            if (data.error){
                this.setState({error:data.error})
            }
            else this.setState({redirect: true});
        });

        }
      
    }
 
    
    render(){
      
        if (this.state.redirect){
            return( <Redirect to="/"/>)
        }
        return(
           
            <form method="post" onSubmit={this.handleSubmit}  className="signup">
                
                
                <div className="title"> Create your account  </div>
                <div className="container">
                <div className='col'>
                    
                    
                    
                    <Input 
                        onChange={this.handleChange}
                        name="cin"
                        value={this.state.cin.value || ""}
                        label="Cin"
                        required
                        has_error = {this.state.cin.has_error}
                        error_msg = { this.state.cin.has_error ? this.state.cin.error_msg: null}
                    />
                   
                <Input 
                    name="fname"
                    onChange={this.handleChange}
                    value={this.state.fname.value || ""}
                    label="first name"
                    required
                    error_msg = { this.state.fname.has_error ? this.state.fname.error_msg: null}

                />
               
                <Input 
                    name="lname"
                    onChange={this.handleChange}
                    value={this.state.lname.value || ""}
                    label="last name"
                    required
                    error_msg = { this.state.lname.has_error ? this.state.lname.error_msg: null}

                />
                </div>
              
                <div className="col">
                <Input 
                    name="email"
                    type="email"

                    onChange={this.handleChange}
                    value={this.state.email.value || ""}
                    label="Email"

                    required
                    has_error={async () => (this.state.email.has_error)}
                    // error_msg = {this.state.email.has_error ? this.state.email.error_msg: null}
                    error_msg = {this.state.error ? this.state.error: this.state.email.has_error ? this.state.email.error_msg: null }
                    />
                <Input 
                    name="password1"
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password1.value || ""}
                    label="password"
                    required
                    error_msg = { this.state.password1.has_error ? this.state.password1.error_msg: null}

                />
                <Input 
                    name="password2"
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password2.value || ""}
                    label="Confirm Password"
                    required
                    error_msg = { this.state.password2.has_error ? this.state.password2.error_msg: null}

                />
                </div>
                </div>
               
                <Button className="login-btn default" type="submit" >sign up</Button>
                <div className="btn-group" style={{margin:"0"}}>
                    <SocialLogin></SocialLogin>
                    {/* <Button className="login-btn facebook" type="submit" >Signup with facebook</Button>
                    <Button className="login-btn google" type="submit" >Signup with google</Button> */}
                </div>
                <a  href="/signin"  class="signup-link link">Already have an account ?</a>
                
            </form>  
          
        )}
    }

// tofix: 
// 


export default SignIn