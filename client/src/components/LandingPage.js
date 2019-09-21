import React, { Component } from "react";

import backgroundImage from '../images/landing.png'
import Footer from './Footer/Footer'

export default class LandingPage extends Component {
	render() {
		return (
			<div className="landing">
				<section className="hero flex-col">
					<div className="flex-col hero-message">
						<h1>Koub.</h1>
						<span>manage projects better</span>
					</div>
				</section>
				<Footer />
			</div>
		)
	}
}
