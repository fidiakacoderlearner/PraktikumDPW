//create-page 
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formPengajuan");

    const namaInput = document.getElementById("namaPengusul");
    const lamaInput = document.getElementById("lamaPelaksanaan");
    const perihalInput = document.getElementById("perihal");
    const berkasInput = document.getElementById("berkasPendukung");

    const errorNama = document.getElementById("errorNama");
    const errorLama = document.getElementById("errorLama");
    const errorPerihal = document.getElementById("errorPerihal");
    const errorBerkas = document.getElementById("errorBerkas");

    /* validasi nama */
    function validasiNama() {
        const value = namaInput.value.trim();
        const adaAngka = /\d/.test(value);

        if (value === "") {
            errorNama.textContent = "Nama pengusul wajib diisi";
            namaInput.classList.add("input-error");
            return false;
        }

        if (adaAngka) {
            errorNama.textContent = "Nama tidak boleh mengandung angka";
            namaInput.classList.add("input-error");
            return false;
        }

        errorNama.textContent = "";
        namaInput.classList.remove("input-error");
        return true;
    }

    /* validasi lama pelaksanaan */
    function validasiLama() {
        const value = Number(lamaInput.value);

        if (lamaInput.value === "") {
            errorLama.textContent = "Lama pelaksanaan wajib diisi";
            lamaInput.classList.add("input-error");
            return false;
        }

        if (value <= 0) {
            errorLama.textContent = "Minimal 1 hari";
            lamaInput.classList.add("input-error");
            return false;
        }

        errorLama.textContent = "";
        lamaInput.classList.remove("input-error");
        return true;
    }

    /* validasi perihal */
    function validasiPerihal() {
        const value = perihalInput.value.trim();

        if (value === "") {
            errorPerihal.textContent = "Perihal wajib diisi";
            perihalInput.classList.add("input-error");
            return false;
        }

        errorPerihal.textContent = "";
        perihalInput.classList.remove("input-error");
        return true;
    }

    /* validasi berkas */
    function validasiBerkas() {

        if (berkasInput.files.length === 0) {
            errorBerkas.textContent = "Berkas pendukung wajib diupload";
            berkasInput.classList.add("input-error");
            return false;
        }

        errorBerkas.textContent = "";
        berkasInput.classList.remove("input-error");
        return true;
    }

    /* validasi realtime validation */
    namaInput.addEventListener("input", validasiNama);
    lamaInput.addEventListener("input", validasiLama);
    perihalInput.addEventListener("input", validasiPerihal);
    berkasInput.addEventListener("change", validasiBerkas);

    /* validasi saat ajukan surat */
    form.addEventListener("submit", function (e) {

        const namaValid = validasiNama();
        const lamaValid = validasiLama();
        const perihalValid = validasiPerihal();
        const berkasValid = validasiBerkas();

        // cek semua field
        if (!namaValid || !lamaValid || !perihalValid || !berkasValid) {
            e.preventDefault();
            return;
        }

        // popup konfirmasi
        const konfirmasi = confirm(
            "Apakah Anda yakin ingin mengajukan surat tugas?"
        );

        if (!konfirmasi) {
            e.preventDefault();
        }

    });

});

//tyo punya hal
function handleDelete(id) {
    // Validasi konfirmasi pengguna
    const yakin = confirm("Apakah Anda yakin ingin menghapus data nomor " + id + "?");

    if (yakin) {
        // Mencari baris (tr) tempat tombol tersebut berada
        const tombol = event.target;
        const baris = tombol.closest("tr"); 

        if (baris) {
            baris.remove();
            alert("Data berhasil dihapus dari tampilan.");
        }
    }
}

function handleEdit(id) {
    //Tampilkan konfirmasi kepada pengguna
    const konfirmasi = confirm("Apakah Anda yakin ingin mengubah data pengajuan nomor " + id + "?");

    //Jika pengguna menekan 'Cancel', cegah perpindahan halaman
    if (!konfirmasi) {
        event.preventDefault(); 
        return false;
    }

    // Jika 'OK', browser akan melanjutkan navigasi ke link yang ada di href
    return true;
}

//fidi punya hal
function searchTable() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toLowerCase();
    const table = document.querySelector(".styled-table");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1]; // Kolom Pengusul
        if (td) {
            let txtValue = td.textContent || td.innerText;
            tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}