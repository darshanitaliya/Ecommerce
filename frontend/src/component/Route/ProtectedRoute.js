import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user)
  return (
    <>
      {loading === false &&
        (isAuthenticated === false ||
        (isAdmin === true && user.role !== 'admin') ? (
          <Navigate to="/login" />
        ) : (
          <Outlet />
        ))}
    </>
  )
}

export default ProtectedRoute
