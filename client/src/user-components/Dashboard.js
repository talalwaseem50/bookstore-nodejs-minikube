import React from 'react'
//import Button from '@material-ui/core/Button';

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
        
    }

    handleSubmit(event) {
        console.log('')
        /*fetch('http://localhost:3001/search/' + path)
        .then(response => response.json())
        .then(d => {
            this.setState({
                datasets: d.datasets,
                labels: d.labels
            })
        })*/
    }

    render() {
        return (
            <div><p>Hello</p></div>
        )
    }
}

export default Dashboard;