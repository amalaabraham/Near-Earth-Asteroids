import React, { useState, useRef, useEffect } from "react";
import { navigate, A } from "hookrouter";


export default function Register() {
 /*   const textInput = useRef(null);
    const dispatch = useDispatch();
    const initForm = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        type: user.type,
    };
    const initError = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        type: user.type,
    };

    const [formLoading, setFormLoading] = useState(false);
    const [form, setForm] = useState(initForm);
    const [error, setError] = useState(initError);
    const [formError, setFormError] = useState(false);
    useEffect(() => {
        textInput.current && textInput.current.focus();
    }, []);
    const handleChange = (e) => {
        const { value, name } = e.target;
        const fieldValue = { ...form };

        // error handling needed

        fieldValue[name] = name === "email" ? value.toLowerCase() : value;

        setForm(fieldValue);
    };
    const links = ["user-register", "facilitator-register"];

    function validInputs() {
        let formValid = true;
        let err = Object.assign({}, initError);
        const { password, confirm, email } = form;

        Object.keys(form).forEach((key) => {
            if (form[key] === "") {
                formValid = false;
                err[key] = "This field is required";
            }
        });
        if (password !== confirm) {
            err["confirm"] = "Passwords do not match";
            formValid = false;
        }
        if (!validateEmailAddress(email)) {
            err["email"] = "Enter a valid email";
            formValid = false;
        }
        if (password.length < 8) {
            err["password"] = "Must be atleast 8 characters";
            formValid = false;
        } else if (password.length > 49) {
            err["password"] = "Maximum 49 characters";
            formValid = false;
        } else if (!validatePassword(password)) {
            err["password"] = (
                <div className="flex md:block">
                    <div>Should contain one uppercase,&nbsp;</div>
                    <div>lowercase digit and a symbol</div>
                </div>
            );
            formValid = false;
        }

        setError(err);
        return formValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validInputs() && !formLoading) {
            setFormLoading(true);
            dispatch(postRegister(form))
                .then((resp) => {
                    const { status: statusCode } = resp;
                    const { data: res } = resp;

                    // set captha logic needed
                    if (res && statusCode === 201 && res.success === true) {
                        Notficiation.Success({
                            msg: "Account created, now login",
                        });
                        navigate("/login");
                    }

                    let formErr = "Some problem occurred";
                    // error exists show error
                    if (res && res.success === false && res.data) {
                        formErr = Object.values(res.data)[0];
                    }
                    const errorMessages = resp.response
                        ? resp.response.data
                            ? resp.response.data.message
                            : null
                        : null;
                    if (errorMessages) {
                        let err = initError;
                        errorMessages.forEach((msgObj) => {
                            err[msgObj.property] = Object.values(
                                msgObj.constraints
                            ).map((val, i) => <p key={i.toString()}>{val}</p>);
                        });
                        setError(err);
                    }
                    setFormError(formErr);
                    setFormLoading(false);
                })
                .catch((err) => {
                    Notficiation.Error({
                        msg: "Something went wrong, please try again",
                    });
                });
        }
    };*/

    return (
        <div className="lg:min-h-full flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
            <h1>register</h1>
        </div>
    );
}
