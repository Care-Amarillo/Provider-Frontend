import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AutoCompleteInput from "../GooglePlacesApi/AutoCompleteInput";
import axios from "axios";
import AlertDialogSlide from "../AlertDialogSlide";
import {ToastContainer} from "react-toastr";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";
import StepButton from "@material-ui/core/StepButton";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#132C3C",
        },
        secondary: {
            main: "#132C3C",
        },
    },
});


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
    return ['Contact Info', 'Location Info', 'Inventory Info', 'Status'];
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
    return <ThemeProvider theme={theme}>
        <form className={classes.form} noValidate autoComplete="off">
            <TextField id="name" label="Name" onChange={onChangeName} value={registerComponent.state.name}
                       variant="outlined"/>
            <TextField id="title" label="Title" value={registerComponent.state.title} onChange={onChangeTitle}
                       variant="outlined"/>
            <TextField id="phone" label="Phone Number" onChange={onChangePhone} value={registerComponent.state.phone}
                       type="number" variant="outlined"/>
            <TextField id="email" label="Email" onChange={onChangeEmail} value={registerComponent.state.email}
                       variant="outlined"/>
        </form>
    </ThemeProvider>;
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
    return <ThemeProvider theme={theme}>
        <form className={classes.form} noValidate autoComplete="off">
            {/*<TextField id="latitude" label="Latitude" onChange={onChangeLatitude} value={registerComponent.state.lat}*/}
            {/*           variant="outlined"/>*/}
            {/*<TextField id="longitude" label="Longitude" onChange={onChangeLongitude} value={registerComponent.state.long}*/}
            {/*           variant="outlined"/>*/}
            <TextField id="address" label="Address" onChange={onChangeAddress} value={registerComponent.state.address}
                       variant="outlined"/>
            <TextField id="zip" label="Zip" onChange={onChangeZip} value={registerComponent.state.zip}
                       variant="outlined"/>
        </form>
    </ThemeProvider>;
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
    return <ThemeProvider theme={theme}>
        <form className={classes.form} noValidate autoComplete="off">
            <TextField id="totalBeds" label="Total Beds" onChange={onChangeTotalBeds}
                       value={registerComponent.state.totalBeds} variant="outlined"/>
            <TextField id="bedsUsed" label="Used Beds" onChange={onChangeUsedBeds}
                       value={registerComponent.state.bedsUsed}
                       variant="outlined"/>
        </form>
    </ThemeProvider>;
}


const FormFour = (props) => {
    const classes = useStyles();
    const registerComponent = props.registerComponent;


    const handleActiveChange = (e) => {
        console.log("active" + e.target.checked);
        registerComponent.setState({
            active: e.target.checked,
        });
    };
    return <ThemeProvider theme={theme}>
        <form className={classes.form} noValidate autoComplete="off">
            <FormControlLabel
                control={
                    <Switch
                        checked={registerComponent.state.active}
                        onChange={handleActiveChange}
                        name="active"
                        color="primary"
                    />
                }
                label="Active"
            />
        </form>
    </ThemeProvider>;
}

const getStepContent = (step, registerComponent) => {
    switch (step) {
        case 0:
            return <FormOne registerComponent={registerComponent}/>;
        case 1:
            return <FormTwo registerComponent={registerComponent}/>;
        case 2:
            return <FormThree registerComponent={registerComponent}/>;
        case 3:
            return <FormFour registerComponent={registerComponent}/>;
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
            console.log("is true");
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
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
            <div>
                <div>
                    <Typography
                        className={classes.instructions}>{getStepContent(activeStep, registerComponent)}</Typography>
                    <div>
                        <ThemeProvider theme={theme}>
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
                        </ThemeProvider>
                    </div>
                </div>
                {/*// )}*/}
            </div>
        </div>
    );
}


class SuperAdminEditProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: "",
            providerId: "",
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
        }
    }


    gotPlace = (place) => {
        console.log("gotPlace")
        console.log("got place: " + JSON.stringify(place));

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
            console.log("address: " + JSON.stringify(address));
            let types = address.types;

            types.forEach((type) => {
                console.log("type: " + JSON.stringify(type));

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

        console.log("geo is " + geometry);
        console.log("location is " + location);
        console.log("latitude is " + latitude);
        console.log("long is " + longitude);
        console.log("phone is " + phone);
        console.log("postalCode is " + postalCode);

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
        let URL = "https://careamabrain.cmcoffee91.dev/providers/" + this.state.providerId;
        // let URL = "http://localhost:3000/users/authenticate";


        console.log("state " + JSON.stringify(this.state));

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
        console.log("data " + JSON.stringify(data));
        const msg = data.Message;
        const provider = data.provider;
        console.log("msg " + msg);

        if (msg === "Updated Provider successfully") {
            console.log("successfully created provider");
            this.container.success(`Provider Updated`, `Success`, {
                closeButton: true,
            });
        } else {
            console.log("unsuccessfully created provider");
        }

    }


    componentDidMount() {
        const id = this.props.match.params.id;
        console.log("provider id : " + id);
        this.setState({
            // data: this.props.location.state.data,
            providerId: id
        }, () => {
            this.loadData();
        });
    }

    loadData = async () => {

        let URL = "https://careamabrain.cmcoffee91.dev/providers/" + this.state.providerId;


        const response = await axios({
            method: 'get',
            url: URL,
        });

        const data = await response.data;
        console.log("data " + JSON.stringify(data));
        console.log("data length:" + data.length);
        let provider = data;
        console.log("provider title is " + provider.title);
        this.setState({
            name: provider.name,
            title: provider.title,
            phone: provider.phone,
            email: provider.email,
            address: provider.address,
            place_id: provider.place_id,
            zip: provider.zip,
            totalBeds: provider.totalBeds,
            lat: provider.lat,
            long: provider.long,
            active: provider.active,
            bedsUsed: provider.bedsUsed,
            providerId: provider._id,
        });


    }

    render() {
        return <div id="registerContainer">
            <ToastContainer
                ref={ref => this.container = ref}
                className="toast-bottom-right"
            />
            <HorizontalLinearStepper registerComponent={this}/>
            <AutoCompleteInput onChange={this.gotPlace}/>
        </div>;
    }
}

export default SuperAdminEditProvider;