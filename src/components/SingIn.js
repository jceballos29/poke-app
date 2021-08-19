import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import "../css/SignIn.css";

function SingIn() {
  const auth = useAuth();

  const history = useHistory();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    auth.signIn(data);
    history.push("/pokedex");
  };

  return (
    <div className="SignIn">
      <h1>The adventure is about to start.</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>What's your name?</label>
        <input
          type="text"
          placeholder="name"
          {...register("name", { required: true })}
        />
        <label>Choose the gender of your avatar</label>
        <select {...register("gender", { required: true })}>
          <option value="">Select...</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button>Go!</button>
      </form>
    </div>
  );
}

export default SingIn;
