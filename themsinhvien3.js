document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const genderInputs = document.getElementsByName("gender");
  const dobInput = document.getElementById("dob");
  const tableBody = document.querySelector("tbody");

  let studentList = [];
  let editingIndex = -1;

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .filter(word => word.trim() !== "")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function renderTable() {
    tableBody.innerHTML = "";
    studentList.forEach((sv, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>SV${(index + 1).toString().padStart(3, "0")}</td>
        <td>${sv.name}</td>
        <td>${sv.email}</td>
        <td>${sv.gender}</td>
        <td>${sv.dob}</td>
        <td>
          <button class="btn btn-sm btn-warning edit me-1" data-index="${index}">
            <i class="fas fa-edit"></i> Sửa
          </button>
          <button class="btn btn-sm btn-danger delete" data-index="${index}">
            <i class="fas fa-trash-alt"></i> Xoá
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Lưu vào localStorage để không mất khi F5
    localStorage.setItem("students", JSON.stringify(studentList));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const gender = [...genderInputs].find(r => r.checked)?.value || "";
    const dob = dobInput.value;

    const nameRegex = /^[\p{L}\s]+$/u;
    const year = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();

    if (!name || !email || !gender || !dob) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (!nameRegex.test(name)) {
      alert("Họ tên chỉ được chứa chữ cái và khoảng trắng.");
      return;
    }

    if (year < 1900 || year > currentYear) {
      alert("Năm sinh không hợp lệ.");
      return;
    }

    name = toTitleCase(name);

    const newStudent = { name, email, gender, dob };

    if (editingIndex === -1) {
      studentList.push(newStudent);
    } else {
      studentList[editingIndex] = newStudent;
      editingIndex = -1;
    }

    renderTable();
    form.reset();
  });

  tableBody.addEventListener("click", function (e) {
    const target = e.target.closest("button");
    if (!target) return;
    const index = parseInt(target.dataset.index);

    if (target.classList.contains("edit")) {
      const sv = studentList[index];
      nameInput.value = sv.name;
      emailInput.value = sv.email;
      dobInput.value = sv.dob;
      genderInputs.forEach(r => r.checked = r.value === sv.gender);
      editingIndex = index;
    }

    if (target.classList.contains("delete")) {
      if (confirm("Bạn có chắc chắn muốn xoá sinh viên này?")) {
        studentList.splice(index, 1);
        renderTable();
      }
    }
  });

  // Tải dữ liệu từ localStorage nếu có
  const saved = localStorage.getItem("students");
  if (saved) {
    studentList = JSON.parse(saved);
  } else {
    // Nếu không có, khởi tạo mặc định
    studentList = [
      { name: "Nguyễn Văn A", email: "vana@gmail.com", gender: "Nam", dob: "2002-01-15" },
      { name: "Trần Thị B", email: "thib@gmail.com", gender: "Nữ", dob: "2003-05-20" }
    ];
  }

  renderTable();
});
