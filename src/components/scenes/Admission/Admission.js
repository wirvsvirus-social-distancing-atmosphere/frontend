import React, { useEffect, useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';

import CirclePack from 'circlepack-chart';
import * as d3 from 'd3'

const color = d3.scaleOrdinal(d3.schemePaired);
const useStyles = makeStyles(theme => ({
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalRoot: {
        display: 'flex',
        alignItems: 'center',
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

function Admission() {
    const classes = useStyles();
    const bubbleChartContainer = useRef();

    const [openModal, setOpenModal] = useState(false);
    const [formValues, setFormValues] = useState({
        what: '',
        likelihood: 0,
        manageability: 0,
        severity: 0,
    });

    useEffect(() => {
        const bubbleChartData = {
            name: '',
            children: [{
                name: 'Unemployment',
                size: 16
            }, {
                name: 'Depression',
                size: 27
            }, {
                name: 'Family loss',
                size: 8.4
            }, {
                name: 'Isolation',
                size: 5
            }]
        };
        const bubbleChart = CirclePack();
        bubbleChart
            .data(bubbleChartData)
            .width(bubbleChartContainer.current.parentElement.clientWidth)
            .height(500)
            .size('size')
            .color(d => color(d.name))
            (bubbleChartContainer.current);
    }, []);

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
        console.log(formValues);
    };

    return (
        <Container maxWidth="md">
            <DialogTitle className={classes.title}>What are you worried about?</DialogTitle>
            <div className="meter"></div>
            <div className="bubble" ref={bubbleChartContainer}></div>
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

export default Admission;