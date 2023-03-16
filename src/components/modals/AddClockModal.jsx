import { useState } from 'react';
import PropTypes from 'prop-types';
// import individual material components to save package size in small demo
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

import NewClockForm from '../forms/NewClockForm';

/**
 * Modal component to display the NewClockForm to user.
 *
 * @param {Object} props - props for the component
 * @param {function} [props.onAdd] - function to add the timezone once selected, accepts 1 param: timezone string
 */
const AddClockModal = ({ onAdd }) => {
  const [open, setOpen] = useState (false);
  return (
    <>
      <IconButton onClick={() => setOpen(true)} aria-label="add">
        <AddIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 4
          }}
        >
          <NewClockForm onSubmit={({ timezone }) => {
            setOpen(false);
            onAdd(timezone);
          }} />
        </Box>
      </Modal>
    </>
  );
};

AddClockModal.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default AddClockModal;