import React, { useState, useEffect } from "react";

function StudentForm({ onSubmit, student }) {
  const [form, setForm] = useState({ name: "", email: "", gender: "", dob: "" });

  useEffect(() => {
    if (student) setForm(student);
    else setForm({ name: "", email: "", gender: "", dob: "" });
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.gender || !form.dob) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    onSubmit(form);
    setForm({ name: "", email: "", gender: "", dob: "" });
  };

  return (
    <form className="flex-fill" style={{ minWidth: "320px", maxWidth: "500px" }} onSubmit={handleSubmit}>
      <fieldset>
        <legend>Thông tin sinh viên</legend>

        <div className="mb-3">
          <label className="form-label">Họ tên:</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Giới tính:</label><br />
          <div className="form-check form-check-inline">
            <input type="radio" name="gender" value="Nam" className="form-check-input" checked={form.gender === "Nam"} onChange={handleChange} />
            <label className="form-check-label">Nam</label>
          </div>
          <div className="form-check form-check-inline">
            <input type="radio" name="gender" value="Nữ" className="form-check-input" checked={form.gender === "Nữ"} onChange={handleChange} />
            <label className="form-check-label">Nữ</label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Ngày sinh:</label>
          <input type="date" name="dob" className="form-control" value={form.dob} onChange={handleChange} />
        </div>

        <button type="submit" className="btn">Gửi</button>
      </fieldset>
    </form>
  );
}

export default StudentForm;
