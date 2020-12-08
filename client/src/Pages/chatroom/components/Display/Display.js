import React from 'react'


import './Display.css'

const Display = ({users}) => {
    let display  = <p>No user</p>

    if (users) {
        display = users.map((array) => {
        return (<p>{array.name}</p>)
        })
    }

    return (
        <div className='displaydiv'>
            <section className='displaycontainer'>
                <p>User in this room</p>
                {display}
            </section>
        </div>


    )


}


export default Display;