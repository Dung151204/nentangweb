import React, { useState, useEffect } from "react";

function StudentForm({ onSubmit, student }) {
  const [form, setForm] = useState({ name: "", email: "", gender: "", dob: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) setForm(student);
    else setForm({ name: "", email: "", gender: "", dob: "" });
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    const nameRegex = /^[\p{L}\s]+$/u;
    const year = new Date(form.dob).getFullYear();
    const currentYear = new Date().getFullYear();

    if (!form.name) newErrors.name = "Vui lòng nhập tên";
    else if (!nameRegex.test(form.name)) newErrors.name = "Tên chỉ chứa chữ cái và khoảng trắng";

    if (!form.email) newErrors.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email không hợp lệ";

    if (!form.gender) newErrors.gender = "Vui lòng chọn giới tính";

    if (!form.dob) newErrors.dob = "Vui lòng chọn ngày sinh";
    else if (year < 1900 || year > currentYear) newErrors.dob = "Năm sinh không hợp lệ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
      setForm({ name: "", email: "", gender: "", dob: "" });
      setErrors({});
    }
  };

  return (
    <form
      className="flex-fill"
      style={{ minWidth: "320px", maxWidth: "500px" }}
      onSubmit={handleSubmit}
    >
      <fieldset>
        <legend>Thông tin sinh viên</legend>

        <div className="mb-3">
          <label className="form-label">Họ tên:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Giới tính:</label><br />
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="gender"
              value="Nam"
              className="form-check-input"
              checked={form.gender === "Nam"}
              onChange={handleChange}
            />
            <label className="form-check-label">Nam</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="gender"
              value="Nữ"
              className="form-check-input"
              checked={form.gender === "Nữ"}
              onChange={handleChange}
            />
            <label className="form-check-label">Nữ</label>
          </div>
          {errors.gender && <small className="text-danger d-block">{errors.gender}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Ngày sinh:</label>
          <input
            type="date"
            name="dob"
            className="form-control"
            value={form.dob}
            onChange={handleChange}
          />
          {errors.dob && <small className="text-danger">{errors.dob}</small>}
        </div>

        <button type="submit" className="btn">Gửi</button>
      </fieldset>
    </form>
  );
}

export default StudentForm;
