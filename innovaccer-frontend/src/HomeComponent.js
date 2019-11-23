import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Col} from 'react-bootstrap'
import styled from 'styled-components'
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

	handleSubmit = (e) => {
		e.preventDefault();
		if(this.state.fullName.length < 5) 
			this.setState({error : "Full name must be greater than 5 characters"})
		else if(!Number(this.state.contact)) 
			this.setState({error : "Contact number must be a number!"})
		else if(this.state.contact.length < 10) 
			this.setState({error : "Contact number must be exactly 10 characters long"})
		else 
			this.setState({error : ''})
		if(this.state.error.length === 0) {
			return;
			// Make the API CALL HERE
		}
	}
	render() {
		const hours = (new Date()).getHours();
		const minutes = (new Date()).getHours();
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
						placeholder="Enter email" />
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
									<option>Hours</option>
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
										[...Array(60 - minutes).keys()].map((minute) => {
											return <option key={minute}>{minutes + minute}</option>
										})
									}
							</Form.Control>
						</Form.Group>
					</StyledFormRow>
					<p className="error">{this.state.error}</p>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</StyledForm>
								
			</Container>
		)
	}
}

export default HomeComponent;