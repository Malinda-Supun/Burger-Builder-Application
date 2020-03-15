import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import './ContactData.css'

class ContactData extends Component{

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props)

     this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Malinda Supun',
                address: {
                    street: 'Test 1 Street',
                    zipCode: '404',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => this.setState({loading: false}));


    }

    render() {

        let form = (
            <form >
                <input className={'Input'} type="text" name={'name'} placeholder={'Your Name'}/>
                <input className={'Input'} type="email" name={'email'} placeholder={'Your Mail'}/>
                <input className={'Input'} type="text" name={'street'} placeholder={'Street'}/>
                <input className={'Input'} type="text" name={'postal'} placeholder={'Postal Code'}/>
                <Button btnType={'Success'} clicked={this.orderHandler}> ORDER </Button>
            </form>
        );

        if (this.state.loading){
            form = <Spinner/>;
        }

        return (
            <div className={'ContactData'}>
                <h1>Enter your Contact Data</h1>
                {form}
            </div>
        );
    }
}

export default ContactData;
