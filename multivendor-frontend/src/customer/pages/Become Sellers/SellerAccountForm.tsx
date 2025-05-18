import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import SellerLoginForm from "./SellerLoginForm";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";

const step = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gstin: "",
      pickupAddress: {
        name: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        locality: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: "",
    },
    // validationSchema: Yup.object().shape({
    //   mobile: Yup.string()
    //   .required("Required"),
    //   otp: Yup.string()
    //   .required("Required"),
    // }),
    onSubmit: (values) => {
      console.log(values + " formik Submited");
      console.log(activeStep + " active Step");
    },
  });

  const handleStep = (value: number) => {
    if (activeStep < step.length - 1 || (activeStep > 0 && value == -1)) {
      setActiveStep(activeStep + value);
    }
    activeStep == step.length - 1 && handleCreateAccount();
  };

  const handleCreateAccount = () => {
    console.log("Account Created");
  };

  return (
    <div className="">
      <Stepper className="pb-4" activeStep={activeStep} alternativeLabel>
        {step.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <section>
        <div className="">
          {activeStep == 0 ? (
            <BecomeSellerFormStep1 formik={formik} />
          ) : activeStep == 1 ? (
            <BecomeSellerFormStep2 formik={formik} />
          ) : activeStep == 2 ? (
            <BecomeSellerFormStep3 formik={formik} />
          ) : (
            <BecomeSellerFormStep4 formik={formik} />
          )}
        </div>
      </section>
      <div className="flex mt-4 items-center justify-between">
        <Button
          className=""
          variant="contained"
          onClick={() => handleStep(-1)}
          disabled={activeStep == 0}
        >
          Back
        </Button>
        <Button className="" variant="contained" onClick={() => handleStep(1)}>
          {activeStep == step.length - 1 ? "Create Account" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default SellerAccountForm;
