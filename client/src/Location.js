import React from 'react'

function Location(){
    return (
        <div class="location">
        <input type="text" placeholder="Enter your delivery location" maxlength="50"/>
        <span>Locate Me</span>
        <button class="findfood">Find Food</button>
    </div>
    )
}

export default Location