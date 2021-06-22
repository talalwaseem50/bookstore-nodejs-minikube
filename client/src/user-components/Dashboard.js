import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import OrderDataService from '../services/order.service'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            add: false
        }
        this.handleClickAddOpen = this.handleClickAddOpen.bind(this)
        this.handleAddClose = this.handleAddClose.bind(this)
        this.handleAddSubmitClose = this.handleAddSubmitClose.bind(this)
    }

    handleClickAddOpen(){
        this.setState({
            add: true
        })
      };
    

    handleAddClose(){
        this.setState({
            add: false
        })
      };
    
    handleAddSubmitClose() {
        const data = {
          userId: 1,
          order_status: 'Pending'
        }
    
        console.log(data)
    
        OrderDataService.create(data)
        .then((response) => {
            this.setState({
                add: false
            })
        }, (error) => {
          console.log(error);
        });
      };

    render() {
        return (
            <div>
                <Button variant="outlined" color="secondary" onClick={this.handleClickAddOpen}>
                    Add new Order
                </Button>
                <Dialog open={this.state.add} onClose={this.handleAddClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new Order</DialogTitle>
                <DialogContent>
          
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleAddClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleAddSubmitClose} color="primary">
                        Add
                    </Button>
                </DialogActions>
                </Dialog>
                
            </div>
        )
    }
}

export default Dashboard;