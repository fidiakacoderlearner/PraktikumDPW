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