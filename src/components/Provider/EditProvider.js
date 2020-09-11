import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './ProviderRegister.css';
import AutoCompleteInput from "../GooglePlacesApi/AutoCompleteInput";
import {Redirect} from "react-router-dom";
import axios from "axios";
import AlertDialogSlide from "../AlertDialogSlide";
import {ToastContainer} from "react-toastr";
import {Steps} from "intro.js-react";
import StepButton from "@material-ui/core/StepButton";



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
    return ['Contact Info', 'Location Info', 'Inventory Info'];
}

const FormOne = (props) => {
    const classes = useStyles();
    const registerComponent = props.registerComponent;

    const onChangeName = (e) => {
        registerComponent.setState({
            name: e.target.value,
        });
    };

    const onChangeEmail = (e) => {
        registerComponent.setState({
            email: e.target.value,
        });
    };

    const onChangeTitle = (e) => {
        registerComponent.setState({
            title: e.target.value,
        });
    };

    const onChangePhone = (e) => {
        registerComponent.setState({
            phone: e.target.value,
        });
    };
       return <form className={classes.form} noValidate autoComplete="off">
            <TextField id="name" label="Name" onChange={onChangeName} value={registerComponent.state.name}
                       variant="outlined"/>
            <TextField id="title" label="Title" value={registerComponent.state.title} onChange={onChangeTitle}
                       variant="outlined"/>
            <TextField id="phone" label="Phone Number" onChange={onChangePhone} value={registerComponent.state.phone}
                       type="number" variant="outlined"/>
            <TextField id="email" label="Email" onChange={onChangeEmail} value={registerComponent.state.email}
                       variant="outlined"/>
        </form>;
}

const FormTwo = (props) => {
    const classes = useStyles();
    const registerComponent = props.registerComponent;

    //todo: completely remove coords or keep?
    // const onChangeLatitude = (e) => {
    //     registerComponent.setState({
    //         lat: e.target.value,
    //     });
    // };
    //
    // const onChangeLongitude = (e) => {
    //     registerComponent.setState({
    //         long: e.target.value,
    //     });
    // };
    // ;

    const onChangeAddress = (e) => {
        registerComponent.setState({
            address: e.target.value,
        });
    };

    const onChangeZip = (e) => {
        registerComponent.setState({
            zip: e.target.value,
        });
    };
      return  <form className={classes.form} noValidate autoComplete="off">
            {/*<TextField id="latitude" label="Latitude" onChange={onChangeLatitude} value={registerComponent.state.lat}*/}
            {/*           variant="outlined"/>*/}
            {/*<TextField id="longitude" label="Longitude" onChange={onChangeLongitude} value={registerComponent.state.long}*/}
            {/*           variant="outlined"/>*/}
            <TextField id="address" label="Address" onChange={onChangeAddress} value={registerComponent.state.address}
                       variant="outlined"/>
            <TextField id="zip" label="Zip" onChange={onChangeZip} value={registerComponent.state.zip}
                       variant="outlined"/>
        </form>;
}


const FormThree = (props) => {
    const classes = useStyles();
    const registerComponent = props.registerComponent;


    const onChangeTotalBeds = (e) => {
        registerComponent.setState({
            totalBeds: e.target.value,
        });
    };

    const onChangeUsedBeds = (e) => {
        registerComponent.setState({
            bedsUsed: e.target.value,
        });
    };
      return  <form className={classes.form} noValidate autoComplete="off">
            <TextField id="totalBeds" label="Total Beds" onChange={onChangeTotalBeds}
                       value={registerComponent.state.totalBeds} variant="outlined"/>
            <TextField id="bedsUsed" label="Used Beds" onChange={onChangeUsedBeds}
                       value={registerComponent.state.bedsUsed}
                       variant="outlined"/>
        </form>;
}

const getStepContent = (step, registerComponent) => {
    switch (step) {
        case 0:
            return <FormOne registerComponent={registerComponent}/>;
        case 1:
            return <FormTwo registerComponent={registerComponent}/>;
        case 2:
            return <FormThree registerComponent={registerComponent}/>;
        default:
            return 'Unknown step';
    }
}


const HorizontalLinearStepper = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [open, setOpen] = React.useState(false);
    const steps = getSteps();
    const registerComponent = props.registerComponent;
    const registerState = registerComponent.state;
    const alertTitle = "Are You Sure?";
    const yesOptionTitle = "Yes";
    const noOptionTitle = "Cancel";

    const alertDescription = <div>
        <div>
            Name: {registerState.name}
        </div>
        <div>
            Phone: {registerState.phone}
        </div>
        <div>
            Email: {registerState.email}
        </div>
        <div>
            Address: {registerState.address}
        </div>
    </div>;

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

    const slideAlertCallback = (isTrue) => {
        if (isTrue) {
            registerComponent.updateProvider();
        } else {
            console.log("is false");
        }
    }

    const askForConfirmation = () => {
        setOpen(true);
    }


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
    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    return (
        <div className={classes.root}>
            <AlertDialogSlide open={open} setOpen={setOpen} alertSlideCallback={slideAlertCallback} title={alertTitle}
                              description={alertDescription} yesOptionTitle={yesOptionTitle}
                              noOptionTitle={noOptionTitle}/>
                <Stepper activeStep={activeStep} nonLinear orientation={"horizontal"}>
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
                                {/*<StepLabel {...labelProps}>{label}</StepLabel>*/}
                                <StepButton onClick={handleStep(index)} >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
            <div>
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
                {/*// )}*/}
            </div>
        </div>
    );
}

const TutorialButton = (props) => {
    const handleClick = () => {
        props.toggleSteps();
    }

    return <Button variant="contained"
                   id="tutorialButton"
                   color="primary"
                   onClick={handleClick}
    >
        Help
    </Button>;
}


class EditProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: "",
            name: "",
            title: "",
            phone: "",
            email: "",
            address: "",
            place_id: "",
            zip: "",
            totalBeds: "0",
            lat: "",
            long: "",
            bedsUsed: "0",
            createProvider: false,
            active: false,
            isCreated: false,
            stepsEnabled: false,
            initialStep: 0,
            steps: [
                {
                    element: "#placesAuto",
                    intro: "Search for your entity here. It will fill in most of the information for you!"
                },
                {
                    element: "#backButton",
                    intro: "Use this to go back between info"
                },
                {
                    element: "#nextButton",
                    intro: "Use this button to move forward with the info"
                },
                {
                    element: "#tutorialButton",
                    intro: "Use this button to view this tutorial again"
                },
            ],
            hintsEnabled: true,
            hints: [
                {
                    element: ".hello",
                    hint: "Hello hint",
                    hintPosition: "middle-right"
                }
            ]
        }
    }


    gotPlace = (place) => {

        let name = place.name;
        let phone = place.formatted_phone_number;
        let formattedAddress = place.formatted_address;

        let geometry = place.geometry;
        let location = geometry.location;
        let latitude = location.lat();
        let longitude = location.lng();
        let place_id = place.place_id;
        let postalCode = "";
        let streetnumber = "";
        let route = "";
        let city = "";
        let state = "";
        let country = "";
        let county = "";

        let addressComponents = place.address_components;

        addressComponents.forEach((address) => {
            let types = address.types;

            types.forEach((type) => {

                //todo: change to switch
                if (type === "postal_code") {
                    postalCode = address["long_name"];
                } else if (type === "locality") {
                    city = address["short_name"];
                } else if (type === "administrative_area_level_1") {
                    state = address["short_name"];
                } else if (type === "street_number") {
                    streetnumber = address["short_name"];
                } else if (type === "route") {
                    route = address["short_name"];
                } else if (type === "country") {
                    country = address["short_name"];
                } else if (type === "administrative_area_level_2") {
                    county = address["short_name"];
                }


            });

        });


        phone = phone.replace(" ", "");
        phone = phone.replace("(", "");
        phone = phone.replace(")", "");
        phone = phone.replace("-", "");


        this.setState({
            name: name,
            phone: phone,
            lat: latitude,
            long: longitude,
            place_id: place_id,
            zip: postalCode,
            address: formattedAddress,
        });
    }

    updateProvider = async () => {
        let URL = "http://localhost:3000/providers/" + this.state.providerId;



        const config = {
            "Authorization": `Bearer ${this.props.token}`
        };

        const response = await axios({
            method: 'put',
            url: URL,
            data: {
                name: this.state.name,
                title: this.state.title,
                phone: this.state.phone,
                email: this.state.email,
                address: this.state.address,
                place_id: this.state.place_id,
                zip: this.state.zip,
                lat: this.state.lat.toString(),
                long: this.state.long.toString(),
                type: 1,
                active: this.state.active,
                totalBeds: parseInt(this.state.totalBeds),
                bedsUsed: parseInt(this.state.bedsUsed),
            },
            headers: config
        });


        const data = await response.data;
        const msg = data.Message;
        const provider = data.provider;

        if (msg === "Updated Provider successfully") {
            this.container.success(`Provider Updated`, `Success`, {
                closeButton: true,
            });
            this.props.setProvider(provider);
        } else {
            console.log("unsuccessfully updated provider");
        }

    }


    componentDidMount() {
        this.loadData();
    }

    toggleSteps = () => {
        this.setState(prevState => ({stepsEnabled: !prevState.stepsEnabled}));
    };


    onExit = () => {
        this.setState(() => ({stepsEnabled: false}));
    };

    loadData = async () => {

        let URL = "http://localhost:3000/managingUsers/user/" + this.props.user._id;

        const config = {
            "Authorization": `Bearer ${this.props.token}`
        };

        const response = await axios({
            method: 'get',
            url: URL,
            headers: config
        });

        const data = await response.data;
        if (data.length > 0) {
            let provider = data[0].provider;
            this.setState({
                name: provider.name,
                title: provider.title,
                phone: provider.phone,
                email: provider.email,
                address: provider.address,
                place_id: provider.place_id,
                zip: provider.zip,
                totalBeds: provider.totalBeds,
                active: provider.active,
                lat: provider.lat,
                long: provider.long,
                bedsUsed: provider.bedsUsed,
                providerId: provider._id,
            });
        }


    }

    render() {
        return <div id="registerContainer">
            <ToastContainer
                ref={ref => this.container = ref}
                className="toast-bottom-right"
            />
            <Steps
                enabled={this.state.stepsEnabled}
                steps={this.state.steps}
                initialStep={this.state.initialStep}
                onExit={this.onExit}
            />
            <HorizontalLinearStepper registerComponent={this}/>
            <AutoCompleteInput onChange={this.gotPlace}/>
            <TutorialButton toggleSteps={this.toggleSteps}/>
        </div>;
    }
}

export default EditProvider;