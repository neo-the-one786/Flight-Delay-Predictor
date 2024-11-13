import React, {useState, useEffect} from 'react';
import * as tf from '@tensorflow/tfjs';
import {Container, TextField, Button, Typography, Grid, Paper, Box} from '@mui/material';

function App() {
    const [formData, setFormData] = useState({
        scheduled_departure: '',
        actual_departure: '',
        scheduled_arrival: '',
        actual_arrival: '',
        from: '',
        to: '',
        airline: '',
        aircraft_code: '',
        status: ''
    });
    const [delay, setDelay] = useState(null);
    const [model, setModel] = useState(null);

    useEffect(() => {
        const loadModel = async () => {
            const loadedModel = await tf.loadLayersModel('/path/to/tfjs_model/model.json');
            setModel(loadedModel);
        };
        loadModel();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!model) return;
        const inputTensor = tf.tensor([Object.values(formData).map(value => parseFloat(value) || 0)]);
        const prediction = model.predict(inputTensor);
        const predictedDelay = prediction.dataSync()[0];
        setDelay(predictedDelay);
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} sx={{padding: 3}}>
                <Typography variant="h4" component="h1" gutterbottom style={{fontFamily: 'Century Gothic, sans-serif', fontWeight: 'bold'}}>
                    Flight Delay Predictor
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="scheduled_departure"
                                label="Scheduled Departure"
                                type="datetime-local"
                                onChange={handleChange}
                                InputLabelProps={{shrink: true}}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="actual_departure"
                                label="Actual Departure"
                                type="datetime-local"
                                onChange={handleChange}
                                InputLabelProps={{shrink: true}}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="scheduled_arrival"
                                label="Scheduled Arrival"
                                type="datetime-local"
                                onChange={handleChange}
                                InputLabelProps={{shrink: true}}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="actual_arrival"
                                label="Actual Arrival"
                                type="datetime-local"
                                onChange={handleChange}
                                InputLabelProps={{shrink: true}}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="from"
                                label="From"
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="to"
                                label="To"
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="airline"
                                label="Airline"
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="aircraft_code"
                                label="Aircraft Code"
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="status"
                                label="Status"
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Predict Delay
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                {delay !== null && (
                    <Typography variant="h6" component="p" align="center" sx={{mt: 3}}>
                        Predicted Delay: {delay} minutes
                    </Typography>
                )}
            </Paper>
        </Container>
    );
}

export default App;
