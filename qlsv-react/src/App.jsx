import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  // Dữ liệu mẫu ban đầu
  const defaultStudents = [
    { name: "Nguyễn Văn A", email: "vana@example.com", gender: "Nam", dob: "2001-01-15" },
    { name: "Trần Thị B", email: "thib@example.com", gender: "Nữ", dob: "2002-02-20" },
    { name: "Lê Văn C", email: "vanc@example.com", gender: "Nam", dob: "2000-03-10" },
    { name: "Phạm Thị D", email: "thid@example.com", gender: "Nữ", dob: "2001-04-25" },
    { name: "Hoàng Văn E", email: "vane@example.com", gender: "Nam", dob: "1999-05-30" },
  ];

  // Lấy dữ liệu từ localStorage hoặc gán dữ liệu mẫu
  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) {
      setStudents(JSON.parse(saved));
    } else {
      setStudents(defaultStudents); // nếu chưa có dữ liệu → dùng dữ liệu mẫu
    }
  }, []);

  // Lưu dữ liệu vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addOrUpdateStudent = (student) => {
    const updated = [...students];
    if (editingIndex === -1) {
      updated.push(student);
    } else {
      updated[editingIndex] = student;
      setEditingIndex(-1);
    }
    setStudents(updated);
  };

  const deleteStudent = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
  };

  const editStudent = (index) => {
    setEditingIndex(index);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Đăng ký & Danh sách sinh viên</h1>
      <div className="d-flex flex-wrap gap-4 justify-content-between">
        <StudentForm onSubmit={addOrUpdateStudent} student={students[editingIndex]} />
        <StudentTable students={students} onEdit={editStudent} onDelete={deleteStudent} />
      </div>
    </div>
  );
}

export default App;
