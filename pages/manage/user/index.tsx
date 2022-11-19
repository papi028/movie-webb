import { Table } from "components/Table";
import { LayoutDashboard } from "layouts/LayoutDashboard";

const UserManagePage = () => {
  return (
    <LayoutDashboard title="Manage User" desc="Manage your user">
      <Table>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Sex</th>
              <th>Status</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Nguyen Hoang Lam</td>
              <td>hoanglam@gmail.com</td>
              <td>Nam</td>
              <td>Active</td>
              <td>User</td>
              <td>Delete</td>
            </tr>
          </tbody>
        </table>
      </Table>
    </LayoutDashboard>
  );
};

export default UserManagePage;
