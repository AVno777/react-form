import { useState } from "react";
import style from "./RegisterForm.module.css";
import clsx from "clsx";
import { useRegisterFormValidator } from "./hooks/useRegisterFormValidator";

const RegisterForm = props => {
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { errors, validateForm, onBlurField } = useRegisterFormValidator(form);

    const onUpdateField = e => {
        const field = e.target.name;
        const nextFormState = {...form, [field]: e.target.value,};
        setForm(nextFormState);

        if (errors[field].dirty)
            validateForm({
                form: nextFormState,
                errors,
                field,
            });
    }

    const onSubmitForm = e => {
        e.preventDefault();
        const {isValid} = validateForm({form, errors, forceTouchErrors: true})
        if (!isValid) return;
        alert(JSON.stringify(form, null, 2));
    };

    return (
        <form className={style.form} onSubmit={onSubmitForm}>
            <div className={style.formGroup}>
                <label className={style.formLabel}>Fullname:</label>
                <input 
                    type="text"
                    className={clsx(
                        style.formField,
                        errors.fullname.dirty && errors.fullname.error && style.formFieldError
                    )}
                    name="fullname"
                    value={form.fullname}
                    onChange={onUpdateField}
                    onBlur={onBlurField}
                    placeholder="Enter your fullname" 
                />
                {errors.fullname.dirty && errors.fullname.error ? (
                    <p className={style.formFieldErrorMessage}>{errors.fullname.message}</p>
                ) : null}
            </div>

            <div className={style.formGroup}>
                <label className={style.formLabel}>Email:</label>
                <input 
                    type="text"
                    className={clsx(
                        style.formField,
                        errors.email.dirty && errors.email.error && style.formFieldError
                    )}
                    name="email"
                    value={form.email}
                    onChange={onUpdateField}
                    onBlur={onBlurField}
                    placeholder="Enter your email" 
                />
                {errors.email.dirty && errors.email.error ? (
                    <p className={style.formFieldErrorMessage}>{errors.email.message}</p>
                ) : null}
            </div>

            <div className={style.formGroup}>
                <label className={style.formLabel}>Password:</label>
                <input 
                    type="text"
                    className={clsx(
                        style.formField,
                        errors.password.dirty && errors.password.error && style.formFieldError
                    )}
                    name="password"
                    value={form.password}
                    onChange={onUpdateField}
                    onBlur={onBlurField}
                    placeholder="Enter your password" 
                />
                {errors.password.dirty && errors.password.error ? (
                    <p className={style.formFieldErrorMessage}>{errors.password.message}</p>
                ) : null}
            </div>

            <div className={style.formGroup}>
                <label className={style.formLabel}>Confirm Password:</label>
                <input 
                    type="text"
                    className={clsx(
                        style.formField,
                        errors.confirmPassword.dirty && errors.confirmPassword.error && style.formFieldError
                    )}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={onUpdateField}
                    onBlur={onBlurField}
                    placeholder="Please confirm your password" 
                />
                {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
                    <p className={style.formFieldErrorMessage}>{errors.confirmPassword.message}</p>
                ) : null}
            </div>

            <div className={style.formActions}>
                <button className={style.formSubmitBtn} type="submit">
                    Register
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;