"use client"

import UserCurrentRole from "@/hooks/user-current-role"

const AdminPage = () => {

    const role = UserCurrentRole()
  return (
    <div>
        current Role : {role}
    </div>
  )
}

export default AdminPage