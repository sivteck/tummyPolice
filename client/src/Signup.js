import React from 'react'
import useForm from 'react-hook-form'

 const Signup = () => {
  const { register,errors, handleSubmit } = useForm({
    mode: "onBlur"

  })
  const onSubmit = (data, e) => {
    console.log('Submit event', e)
    alert(JSON.stringify(data))

    fetch("http://tummypolice.iyangi.com/api/v1/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(response => console.log(response))

  }
 
  return (
      <div className="signUpForm">
        <h1>Sign Up</h1>
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div>
      <label>Phone number</label>
      <input type="number" name="phone" ref={register({ required: true, pattern: /^\d{10}$/})}  placeholder="Phone number"  />
      {errors.phone && 'Enter valid phone number'}
      </div>

      <div>
      <label>Name</label>
      <input type="text" name="username" ref={register ({ required: true, maxLength: 20 })} placeholder="Name" />
      {errors.username && 'Enter your name'}
      </div>

      <div>
     <label>Email</label>
      <input type="email" name="email" ref={register({ required: true, maxLength: 30 })} placeholder="Email" />
      {errors.email && 'Invalid email address'}
      </div>

      <div>
      <label>Password</label>
      <input type="password" name="password" ref={register({ required: true,minLength:6, maxLength: 20 })} placeholder="Password" />
      {errors.password && 'Password should be min 6 chars'}
      </div>

      <input type="submit" />
    </form>
    </div>
  );
}

export default Signup