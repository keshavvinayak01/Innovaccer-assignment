import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Col} from 'react-bootstrap'
import styled from 'styled-components'
import { getHours, getMinutes } from 'date-fns';
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

function HomeComponent() {
	const [CheckOutHour, setCheckOutHour] = useState(String((new Date()).getHours()));
	const [CheckOutMinute, setCheckOutMinute] = useState(String((new Date()).getMinutes()));

	const hours = (new Date()).getHours();
	const minutes = (new Date()).getMinutes();
	
	const handleHourChange = e => {
		setCheckOutHour(e.target.value)
	}

	const handleMinuteChange = e => {
		setCheckOutMinute(e.target.value)
	}
	return (
		<Container className="container">
			<StyledForm>
				<Form.Group controlId="formBasicText">
					<Form.Label className="primary-text">Full name</Form.Label>
					<Form.Control type="text" placeholder="Enter Full name here" />
				</Form.Group>

				<Form.Group controlId="formBasicEmail">
					<Form.Label className="primary-text">Email Address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
					We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPhone">
					<Form.Label className="primary-text">Phone Number</Form.Label>
					<Form.Control type="text" placeholder="Phone Number" />
					<Form.Text className="text-muted">
					Enter <b>without</b> Country Code(+91).
					</Form.Text>
				</Form.Group>

				<Form.Group>
					<Form.Label style={{fontSize:"30px"}} className="primary-text">Check out time</Form.Label>
				</Form.Group>
						
				<StyledFormRow>
					<Form.Group as={StyledCol} controlId="formGridHour">
						<Form.Label className="primary-text">Hours</Form.Label>
						<Form.Control onChange={handleHourChange} value={CheckOutHour} as="select">
								<option>Hours</option>
								{
									[...Array(24 - hours).keys()].map((hour) => {
										return <option>{hours + hour}</option>
									})
								}
							</Form.Control>
					</Form.Group>

					<Form.Group as={StyledCol} controlId="formGridMinute">
						<Form.Label className="primary-text">Minutes</Form.Label>
						<Form.Control onChange={handleMinuteChange} value={CheckOutMinute} as="select">
								{
									[...Array(60 - minutes).keys()].map((minute) => {
										return <option>{minutes + minute}</option>
									})
								}
						</Form.Control>
					</Form.Group>
				</StyledFormRow>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</StyledForm>

		</Container>
	)
}

export default HomeComponent;