document.addEventListener("DOMContentLoaded", function () {
  const tbody = document.getElementById("data-body");
  const form = document.getElementById("formAdd");

  const customerInput = document.getElementById("customer");
  const staffInput = document.getElementById("staff");
  const amountInput = document.getElementById("amount");

  const errorCustomer = document.getElementById("error-customer");
  const errorStaff = document.getElementById("error-staff");
  const errorAmount = document.getElementById("error-amount");

  function clearErrors() {
    errorCustomer.textContent = "";
    errorStaff.textContent = "";
    errorAmount.textContent = "";

    customerInput.classList.remove("is-invalid");
    staffInput.classList.remove("is-invalid");
    amountInput.classList.remove("is-invalid");
  }

  // Gợi ý realtime
  [customerInput, staffInput, amountInput].forEach(input => {
    input.addEventListener("input", () => {
      input.classList.remove("is-invalid");
      const errorDiv = document.getElementById(`error-${input.id}`);
      if (errorDiv) errorDiv.textContent = "";
    });
  });

  function renderTable() {
    tbody.innerHTML = "";
    data.forEach((item, index) => {
      tbody.innerHTML += `
        <tr>
          <td><button class="btn btn-sm btn-danger btn-remove-row" data-index="${index}">x</button></td>
          <td>
            <button class="btn btn-sm btn-view me-1"><i class="fas fa-eye"></i></button>
            <button class="btn btn-sm btn-edit me-1"><i class="fas fa-pen"></i></button>
            <button class="btn btn-sm btn-delete"><i class="fas fa-trash"></i></button>
          </td>
          <td>${item.id}</td>
          <td>${item.customer}</td>
          <td>${item.staff}</td>
          <td>${parseInt(item.amount).toLocaleString("vi-VN")}</td>
          <td>${item.date}</td>
        </tr>
      `;
    });

    document.querySelectorAll(".btn-remove-row").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.dataset.index;
        if (confirm("Bạn có chắc muốn xóa dòng này?")) {
          data.splice(index, 1);
          renderTable();
        }
      });
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const customer = customerInput.value.trim();
    const staff = staffInput.value.trim();
    const amount = amountInput.value.trim();
    let isValid = true;

    // Kiểm tra khách hàng
    if (!customer) {
      errorCustomer.textContent = "Vui lòng nhập tên khách hàng.";
      customerInput.classList.add("is-invalid");
      isValid = false;
    } else if (customer.length > 30) {
      errorCustomer.textContent = "Tên khách hàng không được quá 30 ký tự.";
      customerInput.classList.add("is-invalid");
      isValid = false;
    }

    // Kiểm tra nhân viên
    if (!staff) {
      errorStaff.textContent = "Vui lòng nhập tên nhân viên.";
      staffInput.classList.add("is-invalid");
      isValid = false;
    } else if (staff.length > 30) {
      errorStaff.textContent = "Tên nhân viên không được quá 30 ký tự.";
      staffInput.classList.add("is-invalid");
      isValid = false;
    }

    // Kiểm tra số tiền
    const parsedAmount = parseFloat(amount);
    if (!amount) {
      errorAmount.textContent = "Vui lòng nhập số tiền.";
      amountInput.classList.add("is-invalid");
      isValid = false;
    } else if (isNaN(parsedAmount) || parsedAmount <= 0) {
      errorAmount.textContent = "Số tiền phải là số dương hợp lệ.";
      amountInput.classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) return;

    const date = new Date().toLocaleString("vi-VN");
    const newItem = {
      id: Math.floor(Math.random() * 10000),
      customer,
      staff,
      amount: parsedAmount,
      date
    };

    data.push(newItem);
    renderTable();
    form.reset();
    bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
    alert("Thêm giao dịch thành công!");
  });

  renderTable();
});
