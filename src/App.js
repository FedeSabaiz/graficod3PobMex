import React from 'react';
import './css/custom.scss';
import GraficoInai from './components/GraficoInai';
import GrafInaiResponsive from './components/GrafInaiResponsive';


class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			resultado: []
		};
		
				
	}
	
	async informacion() {
		let data = await fetch('https://api.worldbank.org/v2/country/mx/indicator/SP.POP.TOTL?format=json').then(res => res.json());
		// console.log(data[1]);
		let resultado = data[1].map(x => {
			return {year:x.date, people:x.value}
		})
		this.setState({
			resultado
		})
	}

	componentDidMount() {
		this.informacion();
	}
	
	
	render() { 
		
		
		console.log(window.innerWidth)
		return ( 
				<div>
					<h1>Panel de control</h1>

					{ window.innerWidth > 768 ? <GraficoInai data={this.state.resultado}/> : <GrafInaiResponsive data={this.state.resultado}/> }
					

					
				</div>
		);
	}
}
 
export default App;
