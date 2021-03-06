import React from 'react'

export default function Display({user=[]}) {
  return (
    <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
    </div>
)
}
