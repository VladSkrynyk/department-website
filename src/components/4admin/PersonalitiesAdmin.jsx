import React from 'react';
import { useGetUsersQuery } from "./../../redux/users/usersApiSlice"

function PersonalitiesAdmin() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetUsersQuery()

console.log(users)

  return <h1>PersonalitiesAdmin</h1>;
}

export default PersonalitiesAdmin;
