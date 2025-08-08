import React from "react";

function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="flex-fill table-responsive" style={{ minWidth: "400px" }}>
      <table className="table table-bordered table-hover">
        <caption><strong>Danh sách sinh viên</strong></caption>
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((sv, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{sv.name}</td>
              <td>{sv.email}</td>
              <td>{sv.gender}</td>
              <td>{sv.dob}</td>
              <td>
                <button className="btn btn-sm btn-warning me-1" onClick={() => onEdit(index)}>Sửa</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(index)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
