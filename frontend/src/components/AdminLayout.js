import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../components/SidebarAdmin/SidebarAdmin';
import './AdminLayout.scss';


function AdminLayout() {
  return (
    <div className="admin-layout">
      <div className="sidebar-wrapper">
        <SidebarAdmin />
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;