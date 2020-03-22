import React, {Component} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import './Auth.css'
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import {updateObject , checkValidity} from "../../shared/utility";

class Auth extends Component {

    state = {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangeHandler = (event, inputIdentifier) => {

        const updatedLoginForm = updateObject(this.state.loginForm, {
            [inputIdentifier] : updateObject(this.state.loginForm[inputIdentifier], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.loginForm[inputIdentifier].validation),
                touched: true
            })
        });

       /* const updatedLoginForm = {
            ...this.state.loginForm,
            [inputIdentifier]: {
                ...this.state.loginForm[inputIdentifier],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.loginForm[inputIdentifier].validation),
                touched: true
            }
        }*/
        this.setState({loginForm: updatedLoginForm})
    }

    authHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.loginForm.email.value, this.state.loginForm.password.value, this.state.isSignUp);
    }

    swithAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    render() {

        const formElementArray = [];

        for (let key in this.state.loginForm) {
            formElementArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        const form = formElementArray.map(formElement => {
            return <Input key={formElement.id}
                          elementType={formElement.config.elementType}
                          elementConfig={formElement.config.elementConfig}
                          value={formElement.config.value}
                          invalid={!formElement.config.valid}
                          shouldValidate={formElement.config.validation ? true : false}
                          touched={formElement.config.touched}
                          changed={(event) => this.inputChangeHandler(event, formElement.id)}
            />
        });

        let errorMessage = null;

        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }



        let formReturn = <Spinner/>;

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        if (!this.props.loading) {
            formReturn = (
                <div className={'Auth'}>
                    {authRedirect}
                    {errorMessage}
                    <form onSubmit={this.authHandler}>
                        {form}
                        <Button btnType={'Success'} clicked={this.authHandler}> Sign In </Button>
                    </form>
                    <Button btnType={'Danger'} clicked={this.swithAuthModeHandler}> Switch
                        To {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'} </Button>
                </div>
            );
        }



        return formReturn;
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
