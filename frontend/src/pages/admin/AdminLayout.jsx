/*
import { Outlet, NavLink } from "react-router-dom";


const LinkItem = ({ to, children }) => (
  <NavLink to={to} className={({isActive})=>`px-3 py-2 rounded ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}>{children}</NavLink>
);

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-72 p-4 bg-white border-r space-y-1">
        <h2 className="font-semibold mb-3">Admin</h2>
        <LinkItem to="/admin/admissions">Admissions</LinkItem>
        <LinkItem to="/admin/applicants">Applicants</LinkItem>

        <LinkItem to="/admin/departments">Departments</LinkItem>
        <LinkItem to="/admin/courses">Courses</LinkItem>
        <LinkItem to="/admin/timetables">Timetables</LinkItem>
        <LinkItem to="/admin/results">Results</LinkItem>
        <LinkItem to="/admin/library">Library</LinkItem>
        <LinkItem to="/admin/projects">Projects</LinkItem>
        <LinkItem to="/admin/committees">Committees</LinkItem>
        <LinkItem to="/admin/finance">Finance</LinkItem>
      </aside>
      <main className="flex-1 p-6 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
   
  );
}

*/


import { Container, Nav } from "react-bootstrap";

import { Outlet, NavLink } from "react-router-dom";


const LinkItem = ({ to, children }) => (
  <NavLink to={to} className={({isActive})=>`px-3 py-2 rounded ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}>{children}</NavLink>
);


export default function AdminLayout() {
  return (
    <Container className="py-3">
      <h2 className="text-primary fw-bold mb-4">Admin</h2>

      <Nav variant="tabs" className="mb-3">
        <LinkItem to="/admin/admissions">Admissions</LinkItem>
        <LinkItem to="/admin/applicants">Applicants</LinkItem>

        <LinkItem to="/admin/departments">Departments</LinkItem>
        <LinkItem to="/admin/courses">Courses</LinkItem>
        <LinkItem to="/admin/timetables">Timetables</LinkItem>
        <LinkItem to="/admin/results">Results</LinkItem>
        <LinkItem to="/admin/library">Library</LinkItem>
        <LinkItem to="/admin/projects">Projects</LinkItem>
        <LinkItem to="/admin/committees">Committees</LinkItem>
        <LinkItem to="/admin/finance">Finance</LinkItem>
        
        
      </Nav>

      <Outlet />
    </Container>
  );
}
