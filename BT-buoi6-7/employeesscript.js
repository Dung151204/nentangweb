document.addEventListener("DOMContentLoaded", function () {
  const tbody = document.querySelector("tbody");
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const addressInput = document.getElementById("address");
  const phoneInput = document.getElementById("phone");

  function renderTable(data) {
    tbody.innerHTML = "";
    data.forEach((emp, index) => {
      const row = `
        <tr>
          <td><input type="checkbox" /></td>
          <td>${emp.name}</td>
          <td>${emp.email}</td>
          <td>${emp.address}</td>
          <td>${emp.phone}</td>
          <td>
            <button class="btn btn-sm btn-edit me-1"><i class="fas fa-pen"></i></button>
            <button class="btn btn-sm btn-remove"><i class="fas fa-trash"></i></button>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  }

  renderTable(employeeData);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const address = addressInput.value.trim();
    const phone = phoneInput.value.trim();


    if (!name || !email || !address || !phone) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại phải có 10 chữ số và bắt đầu bằng 0.");
      return;
    }

    const newEmp = { name, email, address, phone };
    employeeData.push(newEmp);
    renderTable(employeeData);
    form.reset();
    alert("Thêm nhân viên thành công!");
  });
});
