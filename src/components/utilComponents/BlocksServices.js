import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import navigation from '../../route/_navBlocksServices';
import { CCol, CRow } from '@coreui/react';
import { Avatar, ListItemAvatar } from '@mui/material';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie-player';

function SimpleDialog(props) {
  const { onClose, open, data } = props;

  return (
    <Dialog onClose={(_, reason) => onClose(reason)} open={open}>
      <DialogTitle>Lựa chọn</DialogTitle>
      <List sx={{ pt: 0 }}>
        {data.map((item, index) => (
          <Link to={item.to} key={index}>
            <ListItem disableGutters sx={{ width: 350 }}>
              <ListItemButton key={item}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600], width: 50, height: 50 }}>
                    <Lottie loop animationData={item.icon} play />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} sx={{ marginLeft: 2 }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.array,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(Array(navigation.length).fill(false));

  const handleClickOpen = (index) => {
    const newOpen = [...open];
    newOpen[index] = true;
    setOpen(newOpen);
  };

  const handleClose = (index) => {
    const newOpen = [...open];
    newOpen[index] = false;
    setOpen(newOpen);
  };

  return (
    <div>
      <CRow className="blocks-services">
        {navigation.map((item, index) => {
          if (item.items.length === 0) {
            return (
              <CCol xs={12} sm={6} md={4} key={index} className="my-2">
                <Link to={item.link} target="_blank">
                  <div className="card card-5">
                    <div className="card__icon">
                      <Lottie loop animationData={item.icon} play />
                    </div>
                    <div className="text">{item.name}</div>
                  </div>
                </Link>
              </CCol>
            );
          } else {
            return (
              <CCol xs={12} sm={6} md={4} key={index} className="my-2" onClick={() => handleClickOpen(index)}>
                <div className="card card-5">
                  <div className="card__icon">
                    <Lottie loop animationData={item.icon} play />
                  </div>
                  <div className="text">{item.name}</div>
                </div>
                <SimpleDialog open={open[index]} onClose={() => handleClose(index)} data={item.items} />
              </CCol>
            );
          }
        })}
      </CRow>
    </div>
  );
}
