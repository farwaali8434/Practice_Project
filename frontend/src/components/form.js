import React, { Component } from "react";
import Joi from "@hapi/joi";
// import Button from "@material-ui/core/Button";
import InputForm from "./inputForm";
import Button from '@material/react-button';
export class Form extends Component {
         state = {
           user: {
             id: "",
             username: "",
             password: "",
             email: "",
             read_book: "",
             delete_book: "",
             update_book: ""
           },
           errors: {}
         };

         validate = () => {
           const options = { abortEarly: false };
           const { error } = Joi.validate(
             this.state.user,
             this.schema,
             options
           );
          
           // const { error } = this.schema.validate(this.state.user, options);
           if (!error) return null;
           const errors = {};
           for (let item of error.details) errors[item.path[0]] = item.message;
           return errors;
         };
         validateProperty = ({ name, value }) => {
           const obj = { [name]: value };
           const schema = { [name]: this.schema[name] };
           const { error } = Joi.validate(obj, schema);
          
           return error ? error.details[0].message : null;
           
         };

         handleSubmit = e => {
           const errors = this.validate();
           this.setState({ errors: errors || {} });
           if (errors) return;
           this.doSubmit();
         };
         
         handleChange = ({ currentTarget: input }) => {
           const errors = { ...this.state.errors };
           const errorMessage = this.validateProperty(input);
           if (errorMessage) errors[input.name] = errorMessage;
           else delete errors[input.name];

           const user = { ...this.state.user };
           user[input.name] = input.value;

           this.setState({ user, errors });
         };
         renderButton(label) {
           return (
             <Button
               onClick={this.handleSubmit}
               variant="contained"
               color="primary"
               disabled={this.validate()}
             >
               {label}
             </Button>

           );
         }
         renderInput(name, label, type) {
           const { user, errors } = this.state;
           
           return (
             <InputForm
               name={name}
               value={user[name]}
               label={label}
               type={type}
               error={errors[name]}
               onChange={this.handleChange}
             />
           );
         }
       }

export default Form;
