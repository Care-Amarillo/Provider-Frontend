import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './EditUser.css';
import axios from "axios";
import AlertDialogSlide from "../AlertDialogSlide";
import {ToastContainer} from "react-toastr";
import {createMuiTheme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
        backgroundColor: "#132C3C",
        color: "white",
        '&:disabled': {
            backgroundColor: "lightgrey"
        },
        '&:hover': {
            backgroundColor: "#132C3C",
            color: '#FFFFFF'
        }
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
}));

const getSteps = () => {
    return ['Personal Info', 'Contact Info'];
}

const FormOne = (props) => {
    const classes = useStyles();
    const registerComponent = props.registerComponent;

    const onChangeFirstName = (e) => {
        registerComponent.setState({
            fName: e.target.value,
        });
    };

    const onChangeLastName = (e) => {
        registerComponent.setState({
            lName: e.target.value,
        });
    };


    return <form className={classes.form} noValidate autoComplete="off">
        <TextField id="firstName" label="First Name" value={registerComponent.state.fName} onChange={onChangeFirstName}
                   variant="outlined"/>
        <TextField id="lastName" label="Last Name" onChange={onChangeLastName} value={registerComponent.state.lName}
                   variant="outlined"/>

    </form>;
}

const FormTwo = (props) => {
    const classes = useStyles();
    const registerComponent = props.registerComponent;

    const onChangeEmail = (e) => {
        registerComponent.setState({
            email: e.target.value,
        });
    };

    const onChangePhone = (e) => {
        registerComponent.setState({
            phone: e.target.value,
        });
    };

    return <form className={classes.form} noValidate autoComplete="off">
        <TextField id="email" label="Email" onChange={onChangeEmail} value={registerComponent.state.email}
                   variant="outlined"/>
        <TextField id="phone" label="Phone Number" onChange={onChangePhone} value={registerComponent.state.phone}
                   type="number" variant="outlined"/>

    </form>;
}

const getStepContent = (step, registerComponent) => {
    switch (step) {
        case 0:
            return <FormOne registerComponent={registerComponent}/>;
        case 1:
            return <FormTwo registerComponent={registerComponent}/>;
        default:
            return 'Unknown step';
    }
}


const HorizontalLinearStepper = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();
    const registerComponent = props.registerComponent;
    const registerState = registerComponent.state;
    const [open, setOpen] = React.useState(false);
    const alertTitle = "Are You Sure?";
    const yesOptionTitle = "Yes";
    const noOptionTitle = "Cancel";

    const alertDescription = <div>
        <div>
            First Name: {registerState.fName}
        </div>
        <div>
            Last Name: {registerState.lName}
        </div>
        <div>
            Phone: {registerState.phone}
        </div>
        <div>
            Email: {registerState.email}
        </div>
    </div>


    const isStepOptional = (step) => {
        return false;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const slideAlertCallback = (isTrue) => {
        if (isTrue) {
            registerComponent.updateUser();
        } else {
        }
    }

    const askForConfirmation = () => {
        setOpen(true);
    }

    return (
        <div className={classes.root}>
            <AlertDialogSlide open={open} setOpen={setOpen} alertSlideCallback={slideAlertCallback} title={alertTitle}
                              description={alertDescription} yesOptionTitle={yesOptionTitle}
                              noOptionTitle={noOptionTitle}/>
            <Stepper activeStep={activeStep} orientation={"horizontal"}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            Double Check Your Information
                            <div id="doubleCheckInfo">
                                <div>
                                    First Name: {registerState.firstName}
                                </div>
                                <div>
                                    Last Name: {registerState.lastName}
                                </div>
                                <div>
                                    Phone: {registerState.phone}
                                </div>
                                <div>
                                    Email: {registerState.email}
                                </div>
                            </div>
                        </Typography>

                        <Button color="primary" onClick={() => registerComponent.updateUser()}
                                className={classes.button}>
                            Register
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography
                            className={classes.instructions}>{getStepContent(activeStep, registerComponent)}</Typography>
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>


                            <Button
                                variant="contained"
                                color="primary"
                                onClick={activeStep === steps.length - 1 ? askForConfirmation : handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: "",
            fName: "",
            lName: "",
            phone: "",
            email: "",
        }
    }

    updateUser = async () => {
        let URL = "http://localhost:3000/users/" + this.props.user._id;
        // let URL = "http://localhost:3000/users/authenticate";


        const config = {
            "Authorization": `Bearer ${this.props.token}`
        };

        const response = await axios({
            method: 'put',
            url: URL,
            data: {
                phone: this.state.phone,
                fName: this.state.fName,
                lName: this.state.lName,
                email: this.state.email,
            },
            headers: config

        });


        const data = await response.data;
        const user = data.user;
        const msg = data.Message;

        if (msg === "Updated User successfully") {
            this.container.success(`Profile Updated`, `Success`, {
                closeButton: true,
            });
            this.props.setUser(user);
        } else {
            console.log("unsuccessfully updated user");
        }

    }


    componentDidMount() {
        this.setState({
            fName: this.props.user.fName,
            lName: this.props.user.lName,
            phone: this.props.user.phone,
            email: this.props.user.email,
        })
    }

    render() {
        return <div id="registerContainer">
            <ToastContainer
                ref={ref => this.container = ref}
                className="toast-bottom-right"
            />
            <HorizontalLinearStepper registerComponent={this}/>
        </div>;
    }
}

export default EditProfile;