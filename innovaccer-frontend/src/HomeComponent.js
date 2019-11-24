import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Col} from 'react-bootstrap'
import styled from 'styled-components'
import Axios from 'axios'

const StyledForm = styled(Form)`
	text-align : left!important;
	margin-top : 50px;
`
const Container = styled.div`
	text-align : center!important
`
const StyledCol = styled(Col)`
max-width:20vw!important;
`
const StyledFormRow = styled(Form.Row)`
margin-top:-15px!important;
`
// 'full_name',
// 'email',
// 'phone',
// 'check_out_time',
	
class HomeComponent extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			CheckOutHour : (new Date()).getHours(),
			CheckOutMinute : (new Date()).getMinutes(),
			fullName : '',
			email : '',
			contact : '',
			error : ''
		}
	}
	handleValueChange = e => {
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	resetForm = () => {
		this.setState({
			CheckOutHour : (new Date()).getHours(),
			CheckOutMinute : (new Date()).getMinutes(),
			fullName : '',
			email : '',
			contact : '',
			error : ''
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if(this.state.fullName.length < 5) 
			this.setState({error : "Full name must be greater than 5 characters"})
		else if(!Number(this.state.contact)) 
			this.setState({error : "Contact number must be a number!"})
		else if(this.state.contact.length != 10) 
			this.setState({error : "Contact number must be exactly 10 characters long"})
		else if(this.state.CheckOutHour <= (new Date()).getHours() && this.state.CheckOutMinute <= (new Date()).getMinutes())
			this.setState({error : "Check out time must not be less than or equal to current time"})
		else {
			this.setState({error : ''})
			var datetime = new Date()
			var date = datetime.getDate()
			var month = datetime.getMonth()
			var year = datetime.getFullYear() 			
			Axios.post("http://127.0.0.1:8000/" + "apiv1/create-visitor/", {
                "data": {
					"full_name": this.state.fullName,
					"email": this.state.email,
					"phone": "+91" + this.state.contact,
					"check_out_time": `${year}-${month}-${date} ${this.state.CheckOutHour}:${this.state.CheckOutMinute}:00`
				}})
            .then(response => {
				if(response.data.response === "error") {
					alert(response.data.message + "\n\nPlease Try again")
				}
				else {
					alert("Thanks for filling this form!")
					this.resetForm()
				}				
            })
            .catch(error => {
                console.log(error)
            })
		}
	}
	render() {
		const hours = (new Date()).getHours();
		return (
			<Container className="container">
				<StyledForm onSubmit={this.handleSubmit}>
					<Form.Group controlId="formBasicText">
						<Form.Label className="primary-text">Full name</Form.Label>
						<Form.Control name="fullName" value={this.state.fullName} 
						onChange={this.handleValueChange} 
						type="text" 
						placeholder="Enter Full name here" />
						<Form.Text className="text-muted">
						Full name must be greater than 5 characters
						</Form.Text>
					</Form.Group>
	
					<Form.Group controlId="formBasicEmail">
						<Form.Label className="primary-text">Email Address</Form.Label>
						<Form.Control name="email" value={this.state.email} 
						onChange={this.handleValueChange} 
						type="email" 
						placeholder="Enter email"
						required />
						<Form.Text className="text-muted">
						We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>
	
					<Form.Group controlId="formBasicPhone">
						<Form.Label className="primary-text">Phone Number</Form.Label>
						<Form.Control name="contact" value={this.state.contact} 
						onChange={this.handleValueChange} type="text" 
						placeholder="Phone Number" />
						<Form.Text className="text-muted">
						Enter <b>without</b> Country Code(+91).
						</Form.Text>
					</Form.Group>
	
					<Form.Group>
						<Form.Label style={{fontSize:"30px"}} 
						className="primary-text">Check out time</Form.Label>
					</Form.Group>
							
					<StyledFormRow>
						<Form.Group as={StyledCol} controlId="formGridHour">
							<Form.Label className="primary-text">Hours</Form.Label>
							<Form.Control name="CheckOutHour" 
							onChange={this.handleValueChange} 
							value={this.state.CheckOutHour} as="select">
									{
										[...Array(24 - hours).keys()].map((hour) => {
											return <option key={hour}>{hours + hour}</option>
										})
									}
								</Form.Control>
						</Form.Group>
	
						<Form.Group as={StyledCol} controlId="formGridMinute">
							<Form.Label className="primary-text">Minutes</Form.Label>
							<Form.Control name="CheckOutMinute" 
							onChange={this.handleValueChange} 
							value={this.state.CheckOutMinute} 
							as="select">
									{
										[...Array(60).keys()].map((minute) => {
											return <option key={minute}>{minute}</option>
										})
									}
							</Form.Control>
						</Form.Group>
					</StyledFormRow>
					{
						this.state.error.length > 0 ?  
						<p className="error">{this.state.error}</p>
						:
						""
					}
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</StyledForm>
								
			</Container>
		)
	}
}

export default HomeComponent;