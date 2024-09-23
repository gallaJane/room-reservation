import React from 'react'

import Title from '@/components/ui/title';
import UserList from '@/components/user/user-list';

import { getUsers } from "@/actions/get-users";


const Users = async () => {
    const users = await getUsers();

    if (!users) return <>No users found!</>
    return (
        <div>
            <Title as='h5'> All users</Title>
            <UserList users={users} />
        </div>
    )
}

export default Users;