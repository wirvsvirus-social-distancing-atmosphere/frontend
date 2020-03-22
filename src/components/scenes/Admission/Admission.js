import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';

import Fearometer from '../../elements/Fearometer';
import BubbleChart from '../../elements/BubbleChart';
import Histogram from '../../elements/Histogram';

const useStyles = makeStyles(theme => ({
    row: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    modalBody: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function Admission({
    history,
}) {
    const classes = useStyles();

    const [openModal, setOpenModal] = useState(false);
    const [formValues, setFormValues] = useState({
        what: '',
        likelihood: 0,
        manageability: 0,
        severity: 0,
    });

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleInputChange = e => {
        const {name, value} = e.target
        console.log(e)
        setFormValues({...formValues, [name]: value})
    }

    const handleSeverityChange = (_e, newValue) => {
        setFormValues({...formValues, "severity": newValue});
    }
    const handleLikelihoodChange = (_e, newValue) => {
        setFormValues({...formValues, "likelihood": newValue});
    }
    const handleManageabilityChange = (_e, newValue) => {
        setFormValues({...formValues, "manageability": newValue});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        history.replace({
            pathname: 'screenb',
        });
    };

    return (
        <Container maxWidth="md">
            <DialogTitle className={classes.row}>What are you worried about?</DialogTitle>
            <BubbleChart />

            <div className={classes.row}>
                <Fearometer />
                <Histogram />
            </div>
            
            <Button
                variant='contained'
                color='primary'
                onClick={handleOpenModal}
            >
                Was fühlst du derzeit?
            </Button>
            <Modal
                className={classes.row}
                open={openModal}
                onClose={handleCloseModal}
            >
                <form
                    className={classes.modalBody}
                    onSubmit={handleSubmit}
                >
                    <Typography gutterBottom>
                        What could happen?
                    </Typography>
                    <TextField
                        id="what"
                        placeholder="F.e. depression"
                        fullWidth
                        margin="none"
                        name='what'
                        onChange={handleInputChange}
                        value={formValues.what}
                    />

                    <Typography gutterBottom>
                        How bad is it?
                    </Typography>
                    <Slider
                        name='severity'
                        onChange={handleSeverityChange}
                        value={formValues.severity}
                    />

                    <Typography gutterBottom>
                        How likely is it?
                    </Typography>
                    <Slider
                        name='likelihood'
                        onChange={handleLikelihoodChange}
                        value={formValues.likelihood}
                    />

                    <Typography gutterBottom>
                        How manageable is it?
                    </Typography>
                    <Slider
                        name='manageability'
                        onChange={handleManageabilityChange}
                        value={formValues.manageability}
                    />
                    
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Modal>
        </Container>
    );
}

export default withRouter(Admission);