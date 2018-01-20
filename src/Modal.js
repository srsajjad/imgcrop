import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import './Cropper.css'

const customContentStyle = {
  width: '70%',
  margin: 'auto'
}

class Modal extends React.Component {
  state = {
    open: false,
    imgsrc: ''
  }

  handleClose = () => {
    document.querySelector('#myFile').value = ''
    this.setState({ imgsrc: '', open: false })
  }

  render () {
    const actions = [
      <FlatButton label='Cancel' primary onClick={this.handleClose} />,
      <FlatButton label='Submit' primary onClick={this.handleClose} />
    ]
    let self = this
    return (
      <div>
        <input
          onChange={e => {
            let myFile = e.target.files[0]
            let fileReader = new FileReader()
            fileReader.onload = function (event) {
              let myImg = event.target.result
              self.setState({ imgsrc: myImg, open: true })
            }
            myFile ? fileReader.readAsDataURL(myFile) : null
          }}
          type='file'
          id='myFile'
        /><br /><br />
        <Dialog
          actionsContainerStyle={{ position: 'relative' }}
          contentStyle={customContentStyle}
          title='Cropping Images With Ease'
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Cropper
            style={{ height: 400, width: '100%' }}
            aspectRatio={16 / 16}
            src={this.state.imgsrc}
            guides={false}
            crop={this._crop}
          />
        </Dialog>
      </div>
    )
  }
}

export default Modal
