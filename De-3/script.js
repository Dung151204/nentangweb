window.onload = function () {
  const tbody = document.getElementById("data-body");

  // Hàm render bảng
  function renderTable() {
    tbody.innerHTML = "";
    nhanVienData.forEach((nv) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <button class="btn btn-outline-dark btn-sm rounded-1 px-2 py-1 me-3">
            <i class="bi bi-caret-down-fill"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-sm btn-primary"><i class="fas fa-eye"></i></button>
          <button class="btn btn-sm btn-warning mx-1"><i class="fas fa-pen"></i></button>
          <button class="btn btn-sm btn-danger"><i class="fas fa-times"></i></button>
        </td>
        <td>${nv.stt}</td>
        <td>${nv.ten}</td>
        <td>${nv.hodem}</td>
        <td>${nv.diachi}</td>
        <td>
          <div class="border border-1 border-secondary border-dashed rounded py-1">
            <i class="bi ${nv.hoatdong ? 'bi-check-lg text-success' : 'bi-x-lg text-danger'} fs-5"></i>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderTable();

  // Xử lý thêm mới nhân viên
  const form = document.getElementById("formAdd");
  form.onsubmit = function (e) {
    e.preventDefault();

    const ten = document.getElementById("ten").value.trim();
    const hodem = document.getElementById("hodem").value.trim();
    const diachi = document.getElementById("diachi").value.trim();

    let isValid = true;

    // Xóa thông báo cũ
    document.getElementById("err-ten").innerText = "";
    document.getElementById("err-hodem").innerText = "";
    document.getElementById("err-diachi").innerText = "";

    if (!ten) {
      document.getElementById("err-ten").innerText = "Tên không được để trống!";
      isValid = false;
    } else if (ten.length > 15) {
      document.getElementById("err-ten").innerText = "Tên không vượt quá 15 ký tự!";
      isValid = false;
    }

    if (!hodem) {
      document.getElementById("err-hodem").innerText = "Họ đệm không được để trống!";
      isValid = false;
    } else if (hodem.length > 20) {
      document.getElementById("err-hodem").innerText = "Họ đệm không vượt quá 20 ký tự!";
      isValid = false;
    }

    if (!diachi) {
      document.getElementById("err-diachi").innerText = "Địa chỉ không được để trống!";
      isValid = false;
    } else if (diachi.length > 50) {
      document.getElementById("err-diachi").innerText = "Địa chỉ không vượt quá 50 ký tự!";
      isValid = false;
    }

    if (!isValid) return;

    const newNV = {
      stt: nhanVienData.length + 1,
      ten,
      hodem,
      diachi,
      hoatdong: false
    };

    nhanVienData.push(newNV);
    renderTable();

    // Đóng modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("addModal"));
    modal.hide();
    form.reset();
  };
};
