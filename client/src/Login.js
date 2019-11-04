import React from 'react'
import useForm from 'react-hook-form'

 const Login = () => {
  const { register,errors, handleSubmit } = useForm({
    mode: "onBlur"

  })
  const onSubmit = (data, e) => {
    console.log('Submit event', e)
    alert(JSON.stringify(data))

    fetch("http://tummypolice.iyangi.com/api/v1/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(response => console.log(response.status))
  }
 
  return (
      <div className="loginForm">
        <h1>Login</h1>
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div>
      <label>Phone number</label>
      <input type="number" name="phone" ref={register({ required: true, pattern: /^\d{10}$/})}  placeholder="Phone number"  />
      {errors.phone && 'Enter valid phone number'}
      </div>

      <input type="submit" />
    </form>
    </div>
  );
}

export default Login