import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import navigation from '../../route/_navBlocksServices';
import { CCol, CRow } from '@coreui/react';
import { Avatar, ListItemAvatar } from '@mui/material';
import { Link } from 'react-router-dom';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, data } = props;

  const handleClose = (value) => {
    console.log(value);
    onClose(value);
  };

  const handleListItemClick = (value) => {
    handleClose(value);
  };

  return (
    <Dialog onClose={() => handleClose(selectedValue)} open={open}>
      <DialogTitle>Lựa chọn</DialogTitle>
      <List sx={{ pt: 0 }}>
        {data.map((item, index) => (
          <Link to={item.to} key={index}>
            <ListItem disableGutters sx={{ width: 300 }}>
              <ListItemButton onClick={() => handleListItemClick(item)} key={item}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>📑</Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
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
  selectedValue: PropTypes.string,
  data: PropTypes.array,
  key: PropTypes.number,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(Array(navigation.length).fill(false));
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = (index) => {
    const newOpen = [...open];
    newOpen[index] = true;
    setOpen(newOpen);
  };

  const handleClose = (index, value) => {
    const newOpen = [...open];
    newOpen[index] = false;
    setOpen(newOpen);
    setSelectedValue(value);
  };

  return (
    <div>
      <CRow className="blocks-services">
        {navigation.map((item, index) => {
          return (
            <CCol xs={6} md={4} key={index} className="my-2" onClick={() => handleClickOpen(index)}>
              <div className="card card-5">
                <div className="card__icon">📑</div>
                <div className="text">{item.name}</div>
              </div>
              <SimpleDialog open={open[index]} onClose={(value) => handleClose(index, value)} data={item.items} />
            </CCol>
          );
        })}
      </CRow>
    </div>
  );
}
