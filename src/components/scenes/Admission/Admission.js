import React from 'react';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    modalRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function Admission() {
    const classes = useStyles();

    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Container maxWidth="sm">
            <Button
                variant='contained'
                color='primary'
                onClick={handleOpenModal}
            >
                +
            </Button>
            <Modal
                className={classes.modalRoot}
                open={openModal}
                onClose={handleCloseModal}
            >
                <form>
                    <TextField
                        id="anxiety"
                        label="What could happen?"
                        style={{ margin: 8 }}
                        placeholder="F.e. depression"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <Typography id="input-slider" gutterBottom>
                        How bad is it?
                    </Typography>
                    <Slider />

                    <Typography id="input-slider" gutterBottom>
                        How likely is it?
                    </Typography>
                    <Slider />

                    <Typography id="input-slider" gutterBottom>
                        How manageable is it?
                    </Typography>
                    <Slider />

                </form>
            </Modal>
        </Container>
    );
}

export default Admission;