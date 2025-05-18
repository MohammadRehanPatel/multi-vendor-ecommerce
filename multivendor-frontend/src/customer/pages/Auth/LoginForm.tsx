// import React from "react";
// import { useFormik } from "formik";
// import { Button, CircularProgress, TextField } from "@mui/material";
// import { sendLoginSignupOtp, signin } from "../../../State/AuthSlice";
// import * as Yup from "yup";
// import { useAppDispatch, useAppSelecter } from "../../../State/Store";

// const LoginForm = () => {
//   const dispatch = useAppDispatch();
//   const { otpSent, loading } = useAppSelecter((s) => s.auth);

//   const formik = useFormik({
//     initialValues: { email: "", otp: "" },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email("Invalid email format")
//         .required("Email is required"),
//       otp: Yup.string().required("OTP is required"),
//     }),
//     onSubmit: (values) => {
//       // only dispatch signin if we've already sent an OTP
//       if (otpSent) {
//         dispatch(signin(values));
//       }
//     },
//   });

//   const handleSendOtp = () => {
//     if (formik.values.email && !formik.errors.email) {
//       dispatch(sendLoginSignupOtp({ email: formik.values.email }));
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-center text-primary-color font-bold text-xl pb-8">
//         Login
//       </h1>
//       <form onSubmit={formik.handleSubmit}>
//         <div className="space-y-5">
//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             type="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={!!(formik.touched.email && formik.errors.email)}
//             helperText={formik.touched.email && formik.errors.email}
//           />

//           {/* only show OTP field after we've successfully sent it */}
//           {otpSent && (
//             <TextField
//               fullWidth
//               label="OTP"
//               name="otp"
//               value={formik.values.otp}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={!!(formik.touched.otp && formik.errors.otp)}
//               helperText={formik.touched.otp && formik.errors.otp}
//             />
//           )}

//           {/* If OTP not yet sent, show Send OTP button */}
//           {!otpSent ? (
//             <Button
//               fullWidth
//               variant="contained"
//               onClick={handleSendOtp}
//               disabled={
//                 loading || !formik.values.email || !!formik.errors.email
//               }
//               sx={{ py: "11px" }}
//             >
//               {loading ? <CircularProgress size={24} /> : "Send OTP"}
//             </Button>
//           ) : (
//             // {/* Once OTP is sent, switch to a Submit/Login button */}
//             <Button
//               fullWidth
//               type="submit"
//               variant="contained"
//               disabled={loading || !formik.values.otp}
//               sx={{ py: "11px" }}
//             >
//               {loading ? <CircularProgress size={24} /> : "Login"}
//             </Button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
import React from "react";
import { useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@mui/material";
import { sendLoginSignupOtp, signin } from "../../../State/AuthSlice";
import * as Yup from "yup";
import { useAppDispatch, useAppSelecter } from "../../../State/Store";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { otpSent, loading } = useAppSelecter((s) => s.auth); // fixed hook name

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      // otp: Yup.string().when("otpSent", {
      //   is: true,
      //   then: Yup.string().required("OTP is required"),
      // }),
    }),
    onSubmit: (values) => {
      if (otpSent) {
        dispatch(signin(values));
      }
    },
  });

  const handleSendOtp = () => {
    if (formik.values.email && !formik.errors.email) {
      dispatch(sendLoginSignupOtp({ email: formik.values.email }));
    }
  };

  return (
    <div>
      <h1 className="text-center text-primary-color font-bold text-xl pb-8">
        Login
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-5">
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          {otpSent && (
            <TextField
              fullWidth
              label="OTP"
              name="otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.otp && formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />
          )}

          {!otpSent ? (
            <Button
              fullWidth
              type="button" // ← prevent form submit
              variant="contained"
              onClick={handleSendOtp}
              // disabled={
              //   loading || !formik.values.email || !!formik.errors.email
              // }
              sx={{ py: "11px" }}
            >
              {loading ? <CircularProgress size={24} /> : "Send OTP"}
            </Button>
          ) : (
            <Button
              fullWidth
              type="submit" // ← now submits the OTP
              variant="contained"
              disabled={loading || !formik.values.otp}
              sx={{ py: "11px" }}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
