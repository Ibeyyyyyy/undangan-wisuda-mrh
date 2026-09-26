UNDANGAN WISUDA — STIKes Mitra Ria Husada
==========================================

Struktur folder:
- index.html      -> halaman utama undangan
- css/style.css    -> semua styling (tema navy + aksen cyan/violet, gaya Gen Z)
- js/script.js     -> interaksi tombol Audio & tombol "Gas, Buka Undangan"
- assets/          -> taruh logo kampus & file musik di sini

Cara pakai:
1. Ganti isi teks di index.html sesuai kebutuhan (nama tamu, angkatan, dsb).
2. Taruh logo asli STIKes Mitra Ria Husada di folder assets/, lalu ganti
   <div class="badge badge-a">STIKes<br>MRH</div>
   menjadi <img src="assets/logo.png" ...> jika ingin pakai logo asli.
3. Untuk musik latar: taruh file mp3 di assets/, lalu buka komentar
   <source src="assets/musik.mp3" type="audio/mpeg"> di index.html.
4. Tombol "Gas, Buka Undangan" masih berupa alert placeholder — arahkan ke
   halaman detail acara (jadwal, lokasi, galeri) sesuai kebutuhanmu di js/script.js.
5. Untuk hosting gratis: upload folder ini ke Vercel, Netlify, atau GitHub Pages.

Angka "315 Wisudawan/i" sudah ditulis di dua tempat (badge & chip) —
tinggal disesuaikan kalau jumlahnya berubah.
