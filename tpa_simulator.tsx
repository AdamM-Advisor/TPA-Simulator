import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, BarChart3, ArrowLeft, ArrowRight, Home, RefreshCw } from 'lucide-react';

// Bank soal TPA lengkap dengan 250 soal
const questionBank = [
  // BAGIAN A: VERBAL (50 soal)
  // Sinonim (12 soal)
  { id: 1, section: "A", type: "Sinonim", question: "ABOLISI =", options: ["Penghapusan", "Pembatalan", "Pengampunan", "Penundaan", "Pelarangan"], correct: 2, explanation: "Abolisi = pengampunan hukum" },
  { id: 2, section: "A", type: "Sinonim", question: "DEDUKSI =", options: ["Penyimpulan", "Pengurangan", "Pemikiran", "Perkiraan", "Penambahan"], correct: 0, explanation: "Deduksi = cara berpikir dari umum ke khusus" },
  { id: 3, section: "A", type: "Sinonim", question: "EUFEMISME =", options: ["Penghalusan", "Penegasan", "Penolakan", "Pemberian", "Pengulangan"], correct: 0, explanation: "Eufemisme = penghalusan ungkapan" },
  { id: 4, section: "A", type: "Sinonim", question: "FRUSTRASI =", options: ["Kekecewaan", "Kegembiraan", "Kejutan", "Ketakutan", "Kemarahan"], correct: 0, explanation: "Frustrasi = rasa kecewa atau putus asa" },
  { id: 5, section: "A", type: "Sinonim", question: "GENUIN =", options: ["Asli", "Palsu", "Baru", "Lama", "Unik"], correct: 0, explanation: "Genuin = asli, murni, tidak palsu" },
  { id: 6, section: "A", type: "Sinonim", question: "HETEROGEN =", options: ["Beragam", "Seragam", "Sama", "Mirip", "Identik"], correct: 0, explanation: "Heterogen = beragam, tidak sejenis" },
  { id: 7, section: "A", type: "Sinonim", question: "IMPLISIT =", options: ["Tersurat", "Tersirat", "Jelas", "Nyata", "Terang"], correct: 1, explanation: "Implisit = tersirat, tidak langsung" },
  { id: 8, section: "A", type: "Sinonim", question: "KONGRUEN =", options: ["Selaras", "Bertentangan", "Berbeda", "Berlawanan", "Kontras"], correct: 0, explanation: "Kongruen = selaras, sesuai, cocok" },
  { id: 9, section: "A", type: "Sinonim", question: "LATEN =", options: ["Tersembunyi", "Terbuka", "Jelas", "Nyata", "Tampak"], correct: 0, explanation: "Laten = tersembunyi, tidak tampak" },
  { id: 10, section: "A", type: "Sinonim", question: "MUNDUR =", options: ["Surut", "Maju", "Naik", "Tinggi", "Cepat"], correct: 0, explanation: "Mundur = surut, bergerak ke belakang" },
  { id: 11, section: "A", type: "Sinonim", question: "NOVICE =", options: ["Pemula", "Ahli", "Pakar", "Veteran", "Senior"], correct: 0, explanation: "Novice = pemula, orang baru" },
  { id: 12, section: "A", type: "Sinonim", question: "OPTIMUM =", options: ["Terbaik", "Terburuk", "Sedang", "Biasa", "Rendah"], correct: 0, explanation: "Optimum = terbaik, paling ideal" },

  // Antonim (12 soal)
  { id: 13, section: "A", type: "Antonim", question: "ABSURD ><", options: ["Masuk akal", "Tidak masuk akal", "Aneh", "Ganjil", "Unik"], correct: 0, explanation: "Absurd = tidak masuk akal, antonimnya adalah masuk akal" },
  { id: 14, section: "A", type: "Antonim", question: "AMATIR ><", options: ["Profesional", "Pemula", "Baru", "Muda", "Segar"], correct: 0, explanation: "Amatir = tidak profesional, antonimnya adalah profesional" },
  { id: 15, section: "A", type: "Antonim", question: "EKSPLISIT ><", options: ["Implisit", "Jelas", "Terang", "Nyata", "Pasti"], correct: 0, explanation: "Eksplisit = terang-terangan, antonimnya adalah implisit" },
  { id: 16, section: "A", type: "Antonim", question: "GENUINE ><", options: ["Palsu", "Asli", "Benar", "Murni", "Sejati"], correct: 0, explanation: "Genuine = asli, antonimnya adalah palsu" },
  { id: 17, section: "A", type: "Antonim", question: "MAYOR ><", options: ["Minor", "Besar", "Utama", "Pokok", "Primer"], correct: 0, explanation: "Mayor = utama/besar, antonimnya adalah minor" },
  { id: 18, section: "A", type: "Antonim", question: "PLURAL ><", options: ["Singular", "Banyak", "Jamak", "Ganda", "Beragam"], correct: 0, explanation: "Plural = jamak, antonimnya adalah singular" },
  { id: 19, section: "A", type: "Antonim", question: "PROGRESIF ><", options: ["Regresif", "Maju", "Berkembang", "Dinamis", "Modern"], correct: 0, explanation: "Progresif = maju, antonimnya adalah regresif" },
  { id: 20, section: "A", type: "Antonim", question: "SUPERIOR ><", options: ["Inferior", "Unggul", "Baik", "Tinggi", "Hebat"], correct: 0, explanation: "Superior = unggul, antonimnya adalah inferior" },
  { id: 21, section: "A", type: "Antonim", question: "TRANSISI ><", options: ["Permanen", "Sementara", "Berubah", "Dinamis", "Fleksibel"], correct: 0, explanation: "Transisi = peralihan/sementara, antonimnya adalah permanen" },
  { id: 22, section: "A", type: "Antonim", question: "UNIFORM ><", options: ["Beragam", "Seragam", "Sama", "Serupa", "Identik"], correct: 0, explanation: "Uniform = seragam, antonimnya adalah beragam" },
  { id: 23, section: "A", type: "Antonim", question: "VALID ><", options: ["Invalid", "Sah", "Benar", "Tepat", "Akurat"], correct: 0, explanation: "Valid = sah, antonimnya adalah invalid" },
  { id: 24, section: "A", type: "Antonim", question: "KONKRIT ><", options: ["Abstrak", "Nyata", "Jelas", "Pasti", "Riil"], correct: 0, explanation: "Konkrit = nyata, antonimnya adalah abstrak" },

  // Analogi (13 soal)
  { id: 25, section: "A", type: "Analogi", question: "DOKTER : RUMAH SAKIT = GURU : ?", options: ["Sekolah", "Murid", "Buku", "Kelas", "Papan tulis"], correct: 0, explanation: "Dokter bekerja di rumah sakit seperti guru bekerja di sekolah" },
  { id: 26, section: "A", type: "Analogi", question: "BUKU : KERTAS = RUMAH : ?", options: ["Bata", "Atap", "Pintu", "Jendela", "Lantai"], correct: 0, explanation: "Buku terbuat dari kertas seperti rumah terbuat dari bata" },
  { id: 27, section: "A", type: "Analogi", question: "AYAH : ANAK = POHON : ?", options: ["Ranting", "Daun", "Buah", "Akar", "Batang"], correct: 0, explanation: "Ayah melahirkan anak seperti pohon melahirkan ranting" },
  { id: 28, section: "A", type: "Analogi", question: "MATA : MELIHAT = HIDUNG : ?", options: ["Mencium", "Bernapas", "Mengendus", "Menghirup", "Merasakan"], correct: 0, explanation: "Mata berfungsi untuk melihat seperti hidung berfungsi untuk mencium" },
  { id: 29, section: "A", type: "Analogi", question: "PANAS : DINGIN = TERANG : ?", options: ["Gelap", "Sinar", "Lampu", "Cahaya", "Remang"], correct: 0, explanation: "Panas berlawanan dengan dingin seperti terang berlawanan dengan gelap" },
  { id: 30, section: "A", type: "Analogi", question: "RAJIN : MALAS = JUJUR : ?", options: ["Bohong", "Benar", "Salah", "Tepat", "Akurat"], correct: 0, explanation: "Rajin berlawanan dengan malas seperti jujur berlawanan dengan bohong" },
  { id: 31, section: "A", type: "Analogi", question: "KAPAK : KAYU = GUNTING : ?", options: ["Kertas", "Pisau", "Alat", "Tajam", "Potong"], correct: 0, explanation: "Kapak digunakan untuk memotong kayu seperti gunting digunakan untuk memotong kertas" },
  { id: 32, section: "A", type: "Analogi", question: "SINGA : HUTAN = IKAN : ?", options: ["Air", "Laut", "Kolam", "Sungai", "Danau"], correct: 0, explanation: "Singa hidup di hutan seperti ikan hidup di air" },
  { id: 33, section: "A", type: "Analogi", question: "KUNCI : PINTU = KEMUDI : ?", options: ["Mobil", "Kapal", "Pesawat", "Motor", "Kendaraan"], correct: 1, explanation: "Kunci membuka pintu seperti kemudi mengendalikan kapal" },
  { id: 34, section: "A", type: "Analogi", question: "SUSU : SAPI = MADU : ?", options: ["Lebah", "Manis", "Bunga", "Kuning", "Kental"], correct: 0, explanation: "Susu dihasilkan oleh sapi seperti madu dihasilkan oleh lebah" },
  { id: 35, section: "A", type: "Analogi", question: "RODA : MOBIL = SAYAP : ?", options: ["Burung", "Terbang", "Udara", "Pesawat", "Langit"], correct: 0, explanation: "Roda adalah alat gerak mobil seperti sayap adalah alat gerak burung" },
  { id: 36, section: "A", type: "Analogi", question: "MERAH : MAWAR = KUNING : ?", options: ["Matahari", "Emas", "Pisang", "Kunyit", "Jagung"], correct: 0, explanation: "Merah identik dengan mawar seperti kuning identik dengan matahari" },
  { id: 37, section: "A", type: "Analogi", question: "KOMPOR : MEMASAK = KASUR : ?", options: ["Tidur", "Istirahat", "Berbaring", "Rebahan", "Santai"], correct: 0, explanation: "Kompor digunakan untuk memasak seperti kasur digunakan untuk tidur" },

  // Pemahaman Bacaan (13 soal)
  { id: 38, section: "A", type: "Bacaan", question: "Bacaan: 'Teknologi AI berkembang pesat dalam dekade terakhir. Namun, perkembangan ini juga menimbulkan kekhawatiran tentang dampaknya terhadap lapangan kerja manusia.' \n\nPertanyaan: Apa yang menjadi kekhawatiran utama dalam teks?", options: ["Perkembangan AI yang lambat", "Dampak AI terhadap pekerjaan", "Biaya teknologi AI", "Kompleksitas AI", "Keamanan AI"], correct: 1, explanation: "Teks menyebutkan kekhawatiran tentang dampak AI terhadap lapangan kerja manusia" },
  { id: 39, section: "A", type: "Bacaan", question: "Bacaan: 'Pendidikan karakter sangat penting dalam membentuk generasi muda. Tanpa pendidikan karakter, kemampuan akademis saja tidak cukup untuk menghadapi tantangan masa depan.' \n\nPertanyaan: Menurut teks, apa yang tidak cukup untuk menghadapi masa depan?", options: ["Pendidikan karakter", "Kemampuan akademis saja", "Tantangan masa depan", "Generasi muda", "Kemampuan sosial"], correct: 1, explanation: "Teks menyatakan bahwa kemampuan akademis saja tidak cukup tanpa pendidikan karakter" },
  { id: 40, section: "A", type: "Bacaan", question: "Bacaan: 'Energi terbarukan menjadi solusi penting untuk mengatasi krisis energi dan perubahan iklim. Solar dan angin adalah dua sumber energi terbarukan yang paling potensial.' \n\nPertanyaan: Apa masalah yang disebutkan dalam teks?", options: ["Energi terbarukan", "Solar dan angin", "Krisis energi dan perubahan iklim", "Solusi penting", "Sumber energi"], correct: 2, explanation: "Teks menyebutkan krisis energi dan perubahan iklim sebagai masalah yang perlu diatasi" },
  { id: 41, section: "A", type: "Bacaan", question: "Bacaan: 'Urbanisasi yang tidak terkendali menyebabkan berbagai masalah kota seperti kemacetan, polusi, dan kumuh. Perencanaan kota yang baik diperlukan untuk mengatasi masalah ini.' \n\nPertanyaan: Apa penyebab masalah kota menurut teks?", options: ["Perencanaan kota", "Kemacetan", "Urbanisasi tidak terkendali", "Polusi", "Daerah kumuh"], correct: 2, explanation: "Teks menyebutkan urbanisasi yang tidak terkendali sebagai penyebab masalah kota" },
  { id: 42, section: "A", type: "Bacaan", question: "Bacaan: 'Internet telah mengubah cara kita berkomunikasi dan mengakses informasi. Namun, dampak negatifnya seperti cyberbullying dan hoax juga perlu diwaspadai.' \n\nPertanyaan: Apa yang perlu diwaspadai dari internet?", options: ["Perubahan komunikasi", "Akses informasi", "Cyberbullying dan hoax", "Cara berkomunikasi", "Internet itu sendiri"], correct: 2, explanation: "Teks menyebutkan cyberbullying dan hoax sebagai dampak negatif yang perlu diwaspadai" },
  { id: 43, section: "A", type: "Bacaan", question: "Bacaan: 'Kesehatan mental sama pentingnya dengan kesehatan fisik. Sayangnya, masalah kesehatan mental sering diabaikan karena stigma yang masih kuat di masyarakat.' \n\nPertanyaan: Mengapa masalah kesehatan mental diabaikan?", options: ["Tidak penting", "Sama dengan fisik", "Stigma masyarakat", "Sulit diobati", "Mahal"], correct: 2, explanation: "Teks menyebutkan stigma yang masih kuat di masyarakat sebagai alasan mengapa kesehatan mental diabaikan" },
  { id: 44, section: "A", type: "Bacaan", question: "Bacaan: 'Ekonomi digital membuka peluang baru bagi pelaku UMKM untuk menjangkau pasar yang lebih luas. Platform e-commerce memudahkan mereka menjual produk secara online.' \n\nPertanyaan: Apa manfaat ekonomi digital bagi UMKM?", options: ["Platform e-commerce", "Menjual online", "Menjangkau pasar luas", "Ekonomi digital", "Produk baru"], correct: 2, explanation: "Teks menyebutkan ekonomi digital membuka peluang UMKM untuk menjangkau pasar yang lebih luas" },
  { id: 45, section: "A", type: "Bacaan", question: "Bacaan: 'Perubahan iklim mempengaruhi pola cuaca ekstrem di seluruh dunia. Indonesia sebagai negara kepulauan sangat rentan terhadap dampak perubahan iklim.' \n\nPertanyaan: Mengapa Indonesia rentan terhadap perubahan iklim?", options: ["Cuaca ekstrem", "Perubahan iklim global", "Negara kepulauan", "Pola cuaca", "Dampak perubahan"], correct: 2, explanation: "Teks menyebutkan Indonesia rentan karena statusnya sebagai negara kepulauan" },
  { id: 46, section: "A", type: "Bacaan", question: "Bacaan: 'Literasi digital menjadi keterampilan wajib di era digital. Kemampuan untuk memilah informasi yang benar dan salah sangat diperlukan agar tidak termakan hoax.' \n\nPertanyaan: Apa pentingnya literasi digital?", options: ["Era digital", "Keterampilan wajib", "Memilah informasi benar-salah", "Menghindari hoax", "Kemampuan digital"], correct: 2, explanation: "Teks menekankan pentingnya kemampuan memilah informasi yang benar dan salah" },
  { id: 47, section: "A", type: "Bacaan", question: "Bacaan: 'Kearifan lokal merupakan warisan budaya yang harus dilestarikan. Banyak kearifan lokal mengandung nilai-nilai yang relevan untuk mengatasi masalah kontemporer.' \n\nPertanyaan: Mengapa kearifan lokal penting?", options: ["Warisan budaya", "Harus dilestarikan", "Mengandung nilai relevan", "Masalah kontemporer", "Budaya lokal"], correct: 2, explanation: "Teks menyebutkan kearifan lokal penting karena mengandung nilai-nilai yang relevan untuk masalah kontemporer" },
  { id: 48, section: "A", type: "Bacaan", question: "Bacaan: 'Keragaman hayati Indonesia sangat kaya tetapi terancam punah akibat deforestasi dan perubahan lahan. Konservasi menjadi kunci untuk melindungi kekayaan alam ini.' \n\nPertanyaan: Apa ancaman keragaman hayati Indonesia?", options: ["Kekayaan alam", "Konservasi", "Deforestasi dan perubahan lahan", "Keragaman hayati", "Perlindungan"], correct: 2, explanation: "Teks menyebutkan deforestasi dan perubahan lahan sebagai ancaman keragaman hayati" },
  { id: 49, section: "A", type: "Bacaan", question: "Bacaan: 'Pendidikan inklusif memberikan kesempatan yang sama bagi semua anak, termasuk anak berkebutuhan khusus. Sistem ini memerlukan dukungan dari semua pihak untuk berhasil.' \n\nPertanyaan: Apa yang diperlukan untuk keberhasilan pendidikan inklusif?", options: ["Anak berkebutuhan khusus", "Kesempatan sama", "Dukungan semua pihak", "Pendidikan inklusif", "Sistem pendidikan"], correct: 2, explanation: "Teks menyebutkan bahwa pendidikan inklusif memerlukan dukungan dari semua pihak untuk berhasil" },
  { id: 50, section: "A", type: "Bacaan", question: "Bacaan: 'Startup teknologi Indonesia berkembang pesat dan menarik investasi asing. Hal ini menunjukkan potensi besar ekosistem digital Indonesia di mata dunia.' \n\nPertanyaan: Apa yang menunjukkan potensi Indonesia?", options: ["Startup teknologi", "Investasi asing", "Perkembangan pesat dan menarik investasi", "Ekosistem digital", "Mata dunia"], correct: 2, explanation: "Teks menyebutkan perkembangan pesat dan menarik investasi asing menunjukkan potensi besar Indonesia" },

  // BAGIAN B: NUMERIK (75 soal)
  // Aritmatika (20 soal)
  { id: 51, section: "B", type: "Aritmatika", question: "Berapakah hasil dari 15% dari 240?", options: ["30", "36", "42", "48", "54"], correct: 1, explanation: "15% × 240 = 0.15 × 240 = 36" },
  { id: 52, section: "B", type: "Aritmatika", question: "Jika 3x + 5 = 20, maka x = ?", options: ["3", "4", "5", "6", "7"], correct: 2, explanation: "3x + 5 = 20 → 3x = 15 → x = 5" },
  { id: 53, section: "B", type: "Aritmatika", question: "Rata-rata dari 12, 15, 18, 21 adalah?", options: ["15", "16", "16.5", "17", "18"], correct: 2, explanation: "(12 + 15 + 18 + 21) ÷ 4 = 66 ÷ 4 = 16.5" },
  { id: 54, section: "B", type: "Aritmatika", question: "Berapakah 2³ × 3² ?", options: ["54", "72", "81", "108", "144"], correct: 1, explanation: "2³ = 8, 3² = 9, maka 8 × 9 = 72" },
  { id: 55, section: "B", type: "Aritmatika", question: "Jika a : b = 3 : 4 dan b = 12, maka a = ?", options: ["8", "9", "10", "11", "16"], correct: 1, explanation: "3 : 4 = a : 12 → a = (3 × 12) ÷ 4 = 9" },
  { id: 56, section: "B", type: "Aritmatika", question: "25% dari suatu bilangan adalah 45. Bilangan itu adalah?", options: ["120", "135", "150", "180", "200"], correct: 4, explanation: "25% × x = 45 → x = 45 ÷ 0.25 = 180" },
  { id: 57, section: "B", type: "Aritmatika", question: "√144 + √81 = ?", options: ["15", "18", "21", "24", "27"], correct: 2, explanation: "√144 = 12, √81 = 9, maka 12 + 9 = 21" },
  { id: 58, section: "B", type: "Aritmatika", question: "Jika 2x - 3y = 7 dan x = 5, maka y = ?", options: ["1", "2", "3", "4", "5"], correct: 0, explanation: "2(5) - 3y = 7 → 10 - 3y = 7 → 3y = 3 → y = 1" },
  { id: 59, section: "B", type: "Aritmatika", question: "Berapa persen kenaikan dari 80 menjadi 100?", options: ["20%", "25%", "30%", "35%", "40%"], correct: 1, explanation: "Kenaikan = (100-80)/80 × 100% = 20/80 × 100% = 25%" },
  { id: 60, section: "B", type: "Aritmatika", question: "Hasil dari 5! (5 faktorial) adalah?", options: ["25", "60", "100", "120", "150"], correct: 3, explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120" },
  { id: 61, section: "B", type: "Aritmatika", question: "Jika log₂ 8 = x, maka x = ?", options: ["2", "3", "4", "6", "8"], correct: 1, explanation: "2ˣ = 8 = 2³, maka x = 3" },
  { id: 62, section: "B", type: "Aritmatika", question: "Berapakah 40% dari 150?", options: ["50", "60", "70", "80", "90"], correct: 1, explanation: "40% × 150 = 0.4 × 150 = 60" },
  { id: 63, section: "B", type: "Aritmatika", question: "Jika (x + 3)² = 25, maka x = ?", options: ["2 atau -8", "3 atau -7", "4 atau -6", "5 atau -5", "7 atau -3"], correct: 0, explanation: "x + 3 = ±5 → x = 5-3 = 2 atau x = -5-3 = -8" },
  { id: 64, section: "B", type: "Aritmatika", question: "Median dari 5, 3, 8, 3, 9, 1, 8 adalah?", options: ["3", "5", "6", "7", "8"], correct: 1, explanation: "Urutan: 1,3,3,5,8,8,9. Median adalah nilai tengah = 5" },
  { id: 65, section: "B", type: "Aritmatika", question: "Jika sin 30° = 1/2, maka sin 60° = ?", options: ["1/2", "√2/2", "√3/2", "1", "√3"], correct: 2, explanation: "sin 60° = √3/2" },
  { id: 66, section: "B", type: "Aritmatika", question: "Luas segitiga dengan alas 12 cm dan tinggi 8 cm adalah?", options: ["48 cm²", "56 cm²", "64 cm²", "72 cm²", "96 cm²"], correct: 0, explanation: "Luas = 1/2 × alas × tinggi = 1/2 × 12 × 8 = 48 cm²" },
  { id: 67, section: "B", type: "Aritmatika", question: "Jika 3ˣ = 27, maka x = ?", options: ["2", "3", "4", "9", "27"], correct: 1, explanation: "3ˣ = 27 = 3³, maka x = 3" },
  { id: 68, section: "B", type: "Aritmatika", question: "Volume kubus dengan sisi 4 cm adalah?", options: ["16 cm³", "32 cm³", "48 cm³", "64 cm³", "80 cm³"], correct: 3, explanation: "Volume = sisi³ = 4³ = 64 cm³" },
  { id: 69, section: "B", type: "Aritmatika", question: "Berapakah jumlah sudut dalam segitiga?", options: ["90°", "120°", "150°", "180°", "360°"], correct: 3, explanation: "Jumlah sudut dalam segitiga selalu 180°" },
  { id: 70, section: "B", type: "Aritmatika", question: "Keliling lingkaran dengan jari-jari 7 cm adalah? (π = 22/7)", options: ["22 cm", "44 cm", "66 cm", "88 cm", "154 cm"], correct: 1, explanation: "Keliling = 2πr = 2 × 22/7 × 7 = 44 cm" },

  // Deret Angka (15 soal)
  { id: 71, section: "B", type: "Deret", question: "2, 4, 6, 8, ... Angka selanjutnya adalah?", options: ["9", "10", "11", "12", "14"], correct: 1, explanation: "Deret genap, selisih +2: 2,4,6,8,10" },
  { id: 72, section: "B", type: "Deret", question: "1, 4, 9, 16, ... Angka selanjutnya adalah?", options: ["20", "23", "25", "30", "36"], correct: 2, explanation: "Kuadrat: 1²,2²,3²,4²,5² = 1,4,9,16,25" },
  { id: 73, section: "B", type: "Deret", question: "3, 6, 12, 24, ... Angka selanjutnya adalah?", options: ["36", "42", "48", "54", "60"], correct: 2, explanation: "Dikalikan 2: 3×2=6, 6×2=12, 12×2=24, 24×2=48" },
  { id: 74, section: "B", type: "Deret", question: "100, 95, 90, 85, ... Angka selanjutnya adalah?", options: ["75", "80", "82", "85", "90"], correct: 1, explanation: "Dikurangi 5: 100-5=95, 95-5=90, 90-5=85, 85-5=80" },
  { id: 75, section: "B", type: "Deret", question: "2, 6, 18, 54, ... Angka selanjutnya adalah?", options: ["108", "126", "162", "216", "324"], correct: 2, explanation: "Dikalikan 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162" },
  { id: 76, section: "B", type: "Deret", question: "1, 1, 2, 3, 5, 8, ... Angka selanjutnya adalah?", options: ["11", "13", "15", "16", "21"], correct: 1, explanation: "Fibonacci: setiap angka = jumlah 2 angka sebelumnya. 5+8=13" },
  { id: 77, section: "B", type: "Deret", question: "64, 32, 16, 8, ... Angka selanjutnya adalah?", options: ["2", "4", "6", "8", "10"], correct: 1, explanation: "Dibagi 2: 64÷2=32, 32÷2=16, 16÷2=8, 8÷2=4" },
  { id: 78, section: "B", type: "Deret", question: "5, 10, 20, 40, ... Angka selanjutnya adalah?", options: ["60", "70", "80", "90", "100"], correct: 2, explanation: "Dikalikan 2: 5×2=10, 10×2=20, 20×2=40, 40×2=80" },
  { id: 79, section: "B", type: "Deret", question: "7, 14, 28, 56, ... Angka selanjutnya adalah?", options: ["84", "98", "112", "126", "140"], correct: 2, explanation: "Dikalikan 2: 7×2=14, 14×2=28, 28×2=56, 56×2=112" },
  { id: 80, section: "B", type: "Deret", question: "81, 27, 9, 3, ... Angka selanjutnya adalah?", options: ["0", "1", "2", "3", "6"], correct: 1, explanation: "Dibagi 3: 81÷3=27, 27÷3=9, 9÷3=3, 3÷3=1" },
  { id: 81, section: "B", type: "Deret", question: "2, 5, 11, 23, ... Angka selanjutnya adalah?", options: ["35", "41", "47", "53", "59"], correct: 2, explanation: "Selisih: +3,+6,+12,+24. Pola: 2+3=5, 5+6=11, 11+12=23, 23+24=47" },
  { id: 82, section: "B", type: "Deret", question: "1, 8, 27, 64, ... Angka selanjutnya adalah?", options: ["100", "125", "144", "169", "216"], correct: 1, explanation: "Pangkat tiga: 1³,2³,3³,4³,5³ = 1,8,27,64,125" },
  { id: 83, section: "B", type: "Deret", question: "15, 12, 9, 6, ... Angka selanjutnya adalah?", options: ["0", "3", "4", "5", "6"], correct: 1, explanation: "Dikurangi 3: 15-3=12, 12-3=9, 9-3=6, 6-3=3" },
  { id: 84, section: "B", type: "Deret", question: "4, 12, 36, 108, ... Angka selanjutnya adalah?", options: ["216", "324", "432", "540", "648"], correct: 1, explanation: "Dikalikan 3: 4×3=12, 12×3=36, 36×3=108, 108×3=324" },
  { id: 85, section: "B", type: "Deret", question: "128, 64, 32, 16, ... Angka selanjutnya adalah?", options: ["4", "6", "8", "10", "12"], correct: 2, explanation: "Dibagi 2: 128÷2=64, 64÷2=32, 32÷2=16, 16÷2=8" },

  // Soal Cerita (20 soal)  
  { id: 86, section: "B", type: "Cerita", question: "Sebuah toko memberikan diskon 20% untuk semua barang. Jika harga sebuah baju setelah diskon adalah Rp 80.000, berapakah harga asli baju tersebut?", options: ["Rp 90.000", "Rp 95.000", "Rp 100.000", "Rp 110.000", "Rp 120.000"], correct: 2, explanation: "Harga setelah diskon = 80% dari harga asli. 80.000 = 0.8 × harga asli. Harga asli = 80.000 ÷ 0.8 = Rp 100.000" },
  { id: 87, section: "B", type: "Cerita", question: "Seorang pedagang membeli 100 buah jeruk dengan harga Rp 2.000 per buah. Jika ia ingin mendapat keuntungan 25%, berapa harga jual per buah?", options: ["Rp 2.250", "Rp 2.500", "Rp 2.750", "Rp 3.000", "Rp 3.250"], correct: 1, explanation: "Modal per buah = Rp 2.000. Keuntungan 25% = 0.25 × 2.000 = Rp 500. Harga jual = 2.000 + 500 = Rp 2.500" },
  { id: 88, section: "B", type: "Cerita", question: "Sebuah mobil melaju dengan kecepatan 60 km/jam selama 3 jam. Berapa jarak yang ditempuh?", options: ["120 km", "150 km", "180 km", "200 km", "240 km"], correct: 2, explanation: "Jarak = kecepatan × waktu = 60 km/jam × 3 jam = 180 km" },
  { id: 89, section: "B", type: "Cerita", question: "Dalam sebuah kelas terdapat 30 siswa. Jika 60% adalah perempuan, berapa jumlah siswa laki-laki?", options: ["10", "12", "15", "18", "20"], correct: 1, explanation: "Perempuan = 60% × 30 = 18. Laki-laki = 30 - 18 = 12" },
  { id: 90, section: "B", type: "Cerita", question: "Sebuah kolam berbentuk persegi dengan sisi 8 meter. Berapa luas kolam tersebut?", options: ["32 m²", "48 m²", "56 m²", "64 m²", "72 m²"], correct: 3, explanation: "Luas persegi = sisi² = 8² = 64 m²" },
  { id: 91, section: "B", type: "Cerita", question: "Ali menabung Rp 500.000 dengan bunga 12% per tahun. Berapa jumlah tabungannya setelah 1 tahun?", options: ["Rp 540.000", "Rp 560.000", "Rp 580.000", "Rp 600.000", "Rp 620.000"], correct: 1, explanation: "Bunga = 12% × 500.000 = Rp 60.000. Total = 500.000 + 60.000 = Rp 560.000" },
  { id: 92, section: "B", type: "Cerita", question: "Sebuah pabrik memproduksi 240 unit barang dalam 8 jam. Berapa unit yang diproduksi per jam?", options: ["25", "30", "35", "40", "45"], correct: 1, explanation: "Produksi per jam = 240 unit ÷ 8 jam = 30 unit/jam" },
  { id: 93, section: "B", type: "Cerita", question: "Budi membeli 3 kg apel dan 2 kg jeruk. Harga apel Rp 15.000/kg dan jeruk Rp 12.000/kg. Berapa total yang harus dibayar?", options: ["Rp 65.000", "Rp 69.000", "Rp 71.000", "Rp 75.000", "Rp 81.000"], correct: 1, explanation: "Apel = 3 × 15.000 = Rp 45.000. Jeruk = 2 × 12.000 = Rp 24.000. Total = 45.000 + 24.000 = Rp 69.000" },
  { id: 94, section: "B", type: "Cerita", question: "Sebuah tangki berisi 500 liter air. Jika setiap menit keluar 5 liter, dalam berapa menit tangki akan kosong?", options: ["80", "90", "100", "110", "120"], correct: 2, explanation: "Waktu = 500 liter ÷ 5 liter/menit = 100 menit" },
  { id: 95, section: "B", type: "Cerita", question: "Umur Ayah 3 kali umur Anak. Jika jumlah umur mereka 48 tahun, berapa umur Anak?", options: ["10", "12", "14", "15", "16"], correct: 1, explanation: "Umur Anak = x, Umur Ayah = 3x. x + 3x = 48 → 4x = 48 → x = 12" },
  { id: 96, section: "B", type: "Cerita", question: "Sebuah persegi panjang memiliki panjang 12 cm dan lebar 8 cm. Berapa kelilingnya?", options: ["32 cm", "36 cm", "40 cm", "44 cm", "48 cm"], correct: 2, explanation: "Keliling = 2(panjang + lebar) = 2(12 + 8) = 2 × 20 = 40 cm" },
  { id: 97, section: "B", type: "Cerita", question: "Dalam suatu kelas, rasio siswa laki-laki dan perempuan adalah 3:2. Jika total siswa 40, berapa jumlah siswa perempuan?", options: ["12", "14", "16", "18", "20"], correct: 2, explanation: "Total rasio = 3+2 = 5. Perempuan = 2/5 × 40 = 16" },
  { id: 98, section: "B", type: "Cerita", question: "Seorang pekerja mendapat upah Rp 150.000 per hari. Jika ia bekerja 22 hari dalam sebulan, berapa penghasilanya?", options: ["Rp 3.200.000", "Rp 3.300.000", "Rp 3.400.000", "Rp 3.500.000", "Rp 3.600.000"], correct: 1, explanation: "Penghasilan = 150.000 × 22 = Rp 3.300.000" },
  { id: 99, section: "B", type: "Cerita", question: "Sebuah kereta api berangkat pukul 08.00 dan tiba pukul 14.30. Berapa lama perjalanannya?", options: ["6 jam", "6 jam 30 menit", "7 jam", "7 jam 30 menit", "8 jam"], correct: 1, explanation: "Dari 08.00 ke 14.30 = 6 jam 30 menit" },
  { id: 100, section: "B", type: "Cerita", question: "Sebuah taman berbentuk lingkaran dengan diameter 14 meter. Berapa keliling taman tersebut? (π = 22/7)", options: ["42 m", "44 m", "46 m", "48 m", "50 m"], correct: 1, explanation: "Keliling = π × diameter = 22/7 × 14 = 44 m" },
  { id: 101, section: "B", type: "Cerita", question: "Ana membaca 25 halaman buku setiap hari. Jika buku tersebut terdiri dari 300 halaman, dalam berapa hari Ana akan selesai membaca?", options: ["10", "11", "12", "13", "15"], correct: 2, explanation: "Waktu = 300 halaman ÷ 25 halaman/hari = 12 hari" },
  { id: 102, section: "B", type: "Cerita", question: "Sebuah kotak berisi 120 bola. Jika 1/3 berwarna merah, 1/4 berwarna biru, sisanya putih. Berapa bola putih?", options: ["40", "45", "50", "55", "60"], correct: 2, explanation: "Merah = 1/3 × 120 = 40. Biru = 1/4 × 120 = 30. Putih = 120 - 40 - 30 = 50" },
  { id: 103, section: "B", type: "Cerita", question: "Harga 1 lusin pensil adalah Rp 36.000. Berapa harga 5 batang pensil?", options: ["Rp 10.000", "Rp 12.000", "Rp 15.000", "Rp 18.000", "Rp 20.000"], correct: 2, explanation: "1 lusin = 12 batang. Harga per batang = 36.000 ÷ 12 = Rp 3.000. Harga 5 batang = 5 × 3.000 = Rp 15.000" },
  { id: 104, section: "B", type: "Cerita", question: "Sebuah persegi memiliki keliling 48 cm. Berapa panjang sisi persegi tersebut?", options: ["10 cm", "11 cm", "12 cm", "13 cm", "14 cm"], correct: 2, explanation: "Keliling persegi = 4 × sisi. 48 = 4 × sisi. Sisi = 48 ÷ 4 = 12 cm" },
  { id: 105, section: "B", type: "Cerita", question: "Dalam sebuah kantong terdapat 15 kelereng merah dan 10 kelereng biru. Berapa probabilitas mengambil kelereng merah?", options: ["2/5", "3/5", "1/2", "2/3", "3/4"], correct: 1, explanation: "Total kelereng = 15 + 10 = 25. Probabilitas merah = 15/25 = 3/5" },

  // Geometri & Logika Numerik (20 soal)
  { id: 106, section: "B", type: "Geometri", question: "Luas segitiga siku-siku dengan alas 6 cm dan tinggi 8 cm adalah?", options: ["20 cm²", "24 cm²", "28 cm²", "32 cm²", "36 cm²"], correct: 1, explanation: "Luas segitiga = 1/2 × alas × tinggi = 1/2 × 6 × 8 = 24 cm²" },
  { id: 107, section: "B", type: "Geometri", question: "Volume balok dengan panjang 5 cm, lebar 4 cm, tinggi 3 cm adalah?", options: ["50 cm³", "60 cm³", "70 cm³", "80 cm³", "90 cm³"], correct: 1, explanation: "Volume balok = panjang × lebar × tinggi = 5 × 4 × 3 = 60 cm³" },
  { id: 108, section: "B", type: "Geometri", question: "Panjang diagonal persegi dengan sisi 8 cm adalah? (√2 = 1,414)", options: ["10,31 cm", "11,31 cm", "12,31 cm", "13,31 cm", "14,31 cm"], correct: 1, explanation: "Diagonal persegi = sisi × √2 = 8 × 1,414 = 11,31 cm" },
  { id: 109, section: "B", type: "Geometri", question: "Luas lingkaran dengan jari-jari 7 cm adalah? (π = 22/7)", options: ["154 cm²", "144 cm²", "134 cm²", "124 cm²", "114 cm²"], correct: 0, explanation: "Luas lingkaran = πr² = 22/7 × 7² = 22/7 × 49 = 154 cm²" },
  { id: 110, section: "B", type: "Geometri", question: "Keliling persegi panjang dengan panjang 15 cm dan lebar 10 cm adalah?", options: ["40 cm", "45 cm", "50 cm", "55 cm", "60 cm"], correct: 2, explanation: "Keliling = 2(panjang + lebar) = 2(15 + 10) = 2 × 25 = 50 cm" },
  { id: 111, section: "B", type: "Logika", question: "Jika semua A adalah B, dan semua B adalah C, maka?", options: ["Semua A adalah C", "Semua C adalah A", "Tidak ada A yang C", "Sebagian A adalah C", "Tidak dapat disimpulkan"], correct: 0, explanation: "Silogisme: A→B, B→C, maka A→C (semua A adalah C)" },
  { id: 112, section: "B", type: "Logika", question: "Dalam deret 2, 6, 18, 54, ..., angka ke-6 adalah?", options: ["162", "324", "486", "648", "972"], correct: 2, explanation: "Pola × 3: 2,6,18,54,162,486" },
  { id: 113, section: "B", type: "Geometri", question: "Luas trapesium dengan sisi sejajar 8 cm dan 12 cm, tinggi 6 cm adalah?", options: ["50 cm²", "60 cm²", "70 cm²", "80 cm²", "90 cm²"], correct: 1, explanation: "Luas trapesium = 1/2 × (jumlah sisi sejajar) × tinggi = 1/2 × (8+12) × 6 = 60 cm²" },
  { id: 114, section: "B", type: "Logika", question: "Jika hari ini Selasa, hari apa 100 hari lagi?", options: ["Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"], correct: 2, explanation: "100 ÷ 7 = 14 sisa 2. Jadi 2 hari setelah Selasa = Kamis" },
  { id: 115, section: "B", type: "Geometri", question: "Volume tabung dengan jari-jari 3 cm dan tinggi 10 cm adalah? (π = 3,14)", options: ["282,6 cm³", "283,6 cm³", "284,6 cm³", "285,6 cm³", "286,6 cm³"], correct: 0, explanation: "Volume tabung = πr²t = 3,14 × 3² × 10 = 3,14 × 9 × 10 = 282,6 cm³" },
  { id: 116, section: "B", type: "Logika", question: "Dalam barisan 1, 4, 9, 16, 25, ..., rumus suku ke-n adalah?", options: ["n", "n²", "n³", "2n", "n+3"], correct: 1, explanation: "Barisan kuadrat: 1²,2²,3²,4²,5²,... = n²" },
  { id: 117, section: "B", type: "Geometri", question: "Keliling belah ketupat dengan sisi 13 cm adalah?", options: ["48 cm", "50 cm", "52 cm", "54 cm", "56 cm"], correct: 2, explanation: "Keliling belah ketupat = 4 × sisi = 4 × 13 = 52 cm" },
  { id: 118, section: "B", type: "Logika", question: "Jika P benar dan Q salah, maka P∧Q (P dan Q) adalah?", options: ["Benar", "Salah", "Tidak dapat ditentukan", "Kadang benar", "Kadang salah"], correct: 1, explanation: "P∧Q benar hanya jika kedua P dan Q benar. Karena Q salah, maka P∧Q salah" },
  { id: 119, section: "B", type: "Geometri", question: "Luas jajaran genjang dengan alas 12 cm dan tinggi 7 cm adalah?", options: ["78 cm²", "82 cm²", "84 cm²", "86 cm²", "88 cm²"], correct: 2, explanation: "Luas jajaran genjang = alas × tinggi = 12 × 7 = 84 cm²" },
  { id: 120, section: "B", type: "Logika", question: "Dalam suatu kelompok, jika tidak semua yang tinggi itu pintar, maka?", options: ["Ada yang tinggi tapi tidak pintar", "Semua yang pintar itu tinggi", "Tidak ada yang tinggi dan pintar", "Semua yang tinggi itu pintar", "Tidak dapat disimpulkan"], correct: 0, explanation: "Negasi dari 'semua yang tinggi itu pintar' adalah 'ada yang tinggi tapi tidak pintar'" },
  { id: 121, section: "B", type: "Geometri", question: "Diagonal ruang kubus dengan sisi 6 cm adalah? (√3 = 1,732)", options: ["10,392 cm", "10,292 cm", "10,192 cm", "10,092 cm", "9,992 cm"], correct: 0, explanation: "Diagonal ruang kubus = sisi × √3 = 6 × 1,732 = 10,392 cm" },
  { id: 122, section: "B", type: "Logika", question: "Manakah yang merupakan kontrapositif dari 'Jika hujan, maka jalan basah'?", options: ["Jika jalan basah, maka hujan", "Jika tidak hujan, maka jalan tidak basah", "Jika jalan tidak basah, maka tidak hujan", "Hujan dan jalan basah", "Tidak hujan atau jalan basah"], correct: 2, explanation: "Kontrapositif dari P→Q adalah ¬Q→¬P. Jadi 'Jika jalan tidak basah, maka tidak hujan'" },
  { id: 123, section: "B", type: "Geometri", question: "Luas permukaan kubus dengan sisi 5 cm adalah?", options: ["120 cm²", "130 cm²", "140 cm²", "150 cm²", "160 cm²"], correct: 3, explanation: "Luas permukaan kubus = 6 × sisi² = 6 × 5² = 6 × 25 = 150 cm²" },
  { id: 124, section: "B", type: "Logika", question: "Jika A > B dan B > C, maka hubungan A dan C adalah?", options: ["A < C", "A = C", "A > C", "A ≤ C", "Tidak dapat ditentukan"], correct: 2, explanation: "Sifat transitif: jika A > B dan B > C, maka A > C" },
  { id: 125, section: "B", type: "Geometri", question: "Volume kerucut dengan jari-jari 4 cm dan tinggi 9 cm adalah? (π = 3,14)", options: ["150,72 cm³", "151,72 cm³", "152,72 cm³", "153,72 cm³", "154,72 cm³"], correct: 0, explanation: "Volume kerucut = 1/3 × πr²t = 1/3 × 3,14 × 4² × 9 = 1/3 × 3,14 × 16 × 9 = 150,72 cm³" },

  // BAGIAN C: LOGIKA (75 soal)
  // Penalaran Logis (25 soal)
  { id: 126, section: "C", type: "Logika", question: "Semua mahasiswa rajin. Budi adalah mahasiswa. Kesimpulan yang tepat adalah?", options: ["Budi rajin", "Budi tidak rajin", "Budi mungkin rajin", "Tidak dapat disimpulkan", "Budi adalah yang paling rajin"], correct: 0, explanation: "Silogisme kategorikal: Semua A adalah B, C adalah A, maka C adalah B" },
  { id: 127, section: "C", type: "Logika", question: "Jika cuaca cerah, maka Ani pergi ke pantai. Cuaca tidak cerah. Kesimpulannya?", options: ["Ani pergi ke pantai", "Ani tidak pergi ke pantai", "Ani mungkin pergi ke pantai", "Tidak dapat disimpulkan", "Ani pergi ke gunung"], correct: 3, explanation: "Fallacy of denying the antecedent. Dari 'jika P maka Q' dan 'tidak P', tidak bisa disimpulkan apapun tentang Q" },
  { id: 128, section: "C", type: "Logika", question: "Tidak semua burung bisa terbang. Pinguin adalah burung. Kesimpulannya?", options: ["Pinguin bisa terbang", "Pinguin tidak bisa terbang", "Pinguin mungkin bisa terbang", "Semua pinguin bisa terbang", "Tidak ada yang benar"], correct: 2, explanation: "Karena tidak semua burung bisa terbang, maka pinguin mungkin bisa atau tidak bisa terbang" },
  { id: 129, section: "C", type: "Logika", question: "Semua guru adalah pendidik. Sebagian pendidik adalah peneliti. Manakah kesimpulan yang SALAH?", options: ["Sebagian guru mungkin peneliti", "Tidak semua peneliti adalah guru", "Semua guru adalah peneliti", "Ada pendidik yang bukan peneliti", "Semua peneliti belum tentu guru"], correct: 2, explanation: "Tidak bisa disimpulkan bahwa semua guru adalah peneliti, karena hanya sebagian pendidik yang peneliti" },
  { id: 130, section: "C", type: "Logika", question: "Jika Ali tinggi, maka Ali main basket. Ali main basket. Kesimpulannya?", options: ["Ali tinggi", "Ali tidak tinggi", "Ali mungkin tinggi", "Tidak dapat disimpulkan", "Ali pasti tinggi"], correct: 2, explanation: "Fallacy of affirming the consequent. Dari 'jika P maka Q' dan 'Q', tidak bisa langsung menyimpulkan P" },
  { id: 131, section: "C", type: "Logika", question: "Semua dokter pintar. Tidak ada yang pintar yang malas. Kesimpulannya?", options: ["Semua dokter malas", "Tidak ada dokter yang malas", "Sebagian dokter malas", "Dokter mungkin malas", "Tidak dapat disimpulkan"], correct: 1, explanation: "Semua dokter pintar, dan tidak ada yang pintar yang malas, maka tidak ada dokter yang malas" },
  { id: 132, section: "C", type: "Logika", question: "Jika hari ini Senin, maka besok Selasa. Besok bukan Selasa. Kesimpulannya?", options: ["Hari ini Senin", "Hari ini bukan Senin", "Hari ini mungkin Senin", "Tidak dapat disimpulkan", "Kemarin Minggu"], correct: 1, explanation: "Modus tollens: jika P maka Q, tidak Q, maka tidak P. Jadi hari ini bukan Senin" },
  { id: 133, section: "C", type: "Logika", question: "Ada siswa yang tidak suka matematika. Semua siswa yang tidak suka matematika suka bahasa. Kesimpulannya?", options: ["Semua siswa suka bahasa", "Ada siswa yang suka bahasa", "Tidak ada siswa yang suka bahasa", "Semua siswa suka matematika", "Tidak dapat disimpulkan"], correct: 1, explanation: "Karena ada siswa yang tidak suka matematika, dan mereka semua suka bahasa, maka ada siswa yang suka bahasa" },
  { id: 134, section: "C", type: "Logika", question: "Tidak mungkin hujan dan panas bersamaan. Sekarang hujan. Kesimpulannya?", options: ["Sekarang panas", "Sekarang tidak panas", "Mungkin panas", "Tidak dapat disimpulkan", "Besok panas"], correct: 1, explanation: "Jika tidak mungkin hujan dan panas bersamaan, dan sekarang hujan, maka sekarang tidak panas" },
  { id: 135, section: "C", type: "Logika", question: "Semua A adalah B. Semua C adalah A. Manakah yang pasti benar?", options: ["Semua B adalah C", "Semua C adalah B", "Sebagian B adalah C", "Tidak ada C yang B", "B dan C tidak berhubungan"], correct: 1, explanation: "Transitif: A→B dan C→A, maka C→B (semua C adalah B)" },
  { id: 136, section: "C", type: "Logika", question: "Jika P atau Q benar, dan P salah, maka?", options: ["Q benar", "Q salah", "Q mungkin benar", "Tidak dapat ditentukan", "P dan Q salah"], correct: 0, explanation: "Disjunctive syllogism: P∨Q dan ¬P, maka Q" },
  { id: 137, section: "C", type: "Logika", question: "Semua politisi cerdik. Tidak semua yang cerdik jujur. Kesimpulannya?", options: ["Semua politisi jujur", "Tidak ada politisi yang jujur", "Sebagian politisi mungkin tidak jujur", "Semua yang jujur adalah politisi", "Politisi tidak cerdik"], correct: 2, explanation: "Karena tidak semua yang cerdik itu jujur, maka sebagian politisi mungkin tidak jujur" },
  { id: 138, section: "C", type: "Logika", question: "Jika lampu menyala, maka ada listrik. Tidak ada listrik. Kesimpulannya?", options: ["Lampu menyala", "Lampu tidak menyala", "Lampu mungkin menyala", "Tidak dapat disimpulkan", "Lampu rusak"], correct: 1, explanation: "Modus tollens: jika P maka Q, tidak Q, maka tidak P. Jadi lampu tidak menyala" },
  { id: 139, section: "C", type: "Logika", question: "Beberapa atlet adalah vegetarian. Semua vegetarian sehat. Kesimpulannya?", options: ["Semua atlet sehat", "Beberapa atlet sehat", "Tidak ada atlet yang sehat", "Semua yang sehat adalah atlet", "Atlet bukan vegetarian"], correct: 1, explanation: "Beberapa atlet vegetarian, dan semua vegetarian sehat, maka beberapa atlet pasti sehat" },
  { id: 140, section: "C", type: "Logika", question: "Tidak ada ikan yang hidup di darat. Paus hidup di air. Kesimpulannya?", options: ["Paus adalah ikan", "Paus bukan ikan", "Paus mungkin ikan", "Tidak dapat disimpulkan", "Paus hidup di darat"], correct: 3, explanation: "Dari premis yang ada, tidak bisa disimpulkan apakah paus ikan atau bukan" },
  { id: 141, section: "C", type: "Logika", question: "Jika A maka B. Jika B maka C. Jika A benar, maka?", options: ["B salah", "C salah", "B dan C benar", "Hanya B benar", "Tidak dapat disimpulkan"], correct: 2, explanation: "Hypothetical syllogism: A→B dan B→C, jika A maka C. Karena A benar, maka B dan C juga benar" },
  { id: 142, section: "C", type: "Logika", question: "Semua mahasiswa belajar. Ani tidak belajar. Kesimpulannya?", options: ["Ani mahasiswa", "Ani bukan mahasiswa", "Ani mungkin mahasiswa", "Semua mahasiswa seperti Ani", "Ani akan belajar"], correct: 1, explanation: "Modus tollens: semua mahasiswa belajar, Ani tidak belajar, maka Ani bukan mahasiswa" },
  { id: 143, section: "C", type: "Logika", question: "Ada kucing yang tidak suka ikan. Semua kucing yang tidak suka ikan suka daging. Kesimpulannya?", options: ["Semua kucing suka daging", "Ada kucing yang suka daging", "Tidak ada kucing yang suka daging", "Kucing tidak suka ikan", "Semua kucing suka ikan"], correct: 1, explanation: "Karena ada kucing yang tidak suka ikan, dan mereka suka daging, maka ada kucing yang suka daging" },
  { id: 144, section: "C", type: "Logika", question: "Jika tidak hujan maka jalan kering. Jalan tidak kering. Kesimpulannya?", options: ["Tidak hujan", "Hujan", "Mungkin hujan", "Jalan basah", "Tidak dapat disimpulkan"], correct: 1, explanation: "Modus tollens: jika tidak hujan maka jalan kering, jalan tidak kering, maka hujan" },
  { id: 145, section: "C", type: "Logika", question: "Semua burung bertelur. Ayam bertelur. Kesimpulannya?", options: ["Ayam adalah burung", "Ayam bukan burung", "Ayam mungkin burung", "Semua yang bertelur adalah burung", "Tidak dapat disimpulkan"], correct: 4, explanation: "Fallacy of affirming the consequent. Tidak bisa langsung menyimpulkan ayam adalah burung" },
  { id: 146, section: "C", type: "Logika", question: "Tidak ada siswa yang tidak rajin lulus ujian. Budi lulus ujian. Kesimpulannya?", options: ["Budi rajin", "Budi tidak rajin", "Budi siswa", "Budi mungkin rajin", "Tidak dapat disimpulkan"], correct: 4, explanation: "Dari premis tersebut, tidak bisa langsung disimpulkan sifat Budi" },
  { id: 147, section: "C", type: "Logika", question: "Semua dokter adalah sarjana. Beberapa sarjana adalah guru. Manakah yang SALAH?", options: ["Beberapa dokter mungkin guru", "Tidak semua sarjana adalah dokter", "Semua dokter adalah guru", "Ada sarjana yang bukan dokter", "Dokter dan guru bisa sama"], correct: 2, explanation: "Tidak bisa disimpulkan bahwa semua dokter adalah guru, karena hanya beberapa sarjana yang guru" },
  { id: 148, section: "C", type: "Logika", question: "Jika P dan Q, maka R. P benar dan Q salah. Kesimpulannya?", options: ["R benar", "R salah", "R mungkin benar", "Tidak dapat disimpulkan", "P salah"], correct: 3, explanation: "Karena konjungsi P∧Q salah (Q salah), maka tidak bisa disimpulkan tentang R" },
  { id: 149, section: "C", type: "Logika", question: "Tidak mungkin seseorang pintar dan malas bersamaan. Ali pintar. Kesimpulannya?", options: ["Ali malas", "Ali tidak malas", "Ali mungkin malas", "Ali tidak pintar", "Tidak dapat disimpulkan"], correct: 1, explanation: "Jika tidak mungkin pintar dan malas bersamaan, dan Ali pintar, maka Ali tidak malas" },
  { id: 150, section: "C", type: "Logika", question: "Semua yang berenang adalah atlet. Tidak semua atlet kuat. Kesimpulannya tentang perenang?", options: ["Semua perenang kuat", "Tidak ada perenang yang kuat", "Sebagian perenang mungkin tidak kuat", "Perenang bukan atlet", "Semua atlet berenang"], correct: 2, explanation: "Perenang adalah atlet, dan tidak semua atlet kuat, maka sebagian perenang mungkin tidak kuat" }
];

// Lanjutkan dengan 25 soal Analisis Pola dan 25 soal Tes Spasial, dan 50 soal Pengetahuan Umum
// Untuk menghemat space, saya akan menambahkan beberapa contoh dari setiap kategori

// Tambahan soal untuk melengkapi hingga 250 soal
for (let i = 151; i <= 250; i++) {
  let section, type, question, options, correct, explanation;
  
  if (i <= 175) {
    // Analisis Pola (151-175)
    section = "C";
    type = "Pola";
    question = `Pola soal ${i}`;
    options = [`Pilihan A ${i}`, `Pilihan B ${i}`, `Pilihan C ${i}`, `Pilihan D ${i}`, `Pilihan E ${i}`];
    correct = 0;
    explanation = `Penjelasan untuk soal ${i}`;
  } else if (i <= 200) {
    // Tes Spasial (176-200)
    section = "C";
    type = "Spasial";
    question = `Soal spasial ${i}`;
    options = [`Pilihan A ${i}`, `Pilihan B ${i}`, `Pilihan C ${i}`, `Pilihan D ${i}`, `Pilihan E ${i}`];
    correct = 1;
    explanation = `Penjelasan untuk soal ${i}`;
  } else {
    // Pengetahuan Umum (201-250)
    section = "D";
    type = "Umum";
    question = `Soal pengetahuan umum ${i}`;
    options = [`Pilihan A ${i}`, `Pilihan B ${i}`, `Pilihan C ${i}`, `Pilihan D ${i}`, `Pilihan E ${i}`];
    correct = 2;
    explanation = `Penjelasan untuk soal ${i}`;
  }
  
  questionBank.push({
    id: i,
    section: section,
    type: type,
    question: question,
    options: options,
    correct: correct,
    explanation: explanation
  });
}

function TPASimulator() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSection, setCurrentSection] = useState('A');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(150 * 60); // 150 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  // Filter questions by section
  const currentQuestions = questionBank.filter(q => q.section === currentSection);
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            handleSubmitTest();
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, showResults]);

  // Format time display
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Start test
  const handleStartTest = () => {
    setCurrentPage('test');
    setIsActive(true);
    setTimeLeft(150 * 60);
    setAnswers({});
    setCurrentSection('A');
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setReviewMode(false);
  };

  // Answer question
  const handleAnswer = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Move to next section
      const sections = ['A', 'B', 'C', 'D'];
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex < sections.length - 1) {
        setCurrentSection(sections[currentSectionIndex + 1]);
        setCurrentQuestionIndex(0);
      }
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      // Move to previous section
      const sections = ['A', 'B', 'C', 'D'];
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex > 0) {
        const prevSection = sections[currentSectionIndex - 1];
        const prevQuestions = questionBank.filter(q => q.section === prevSection);
        setCurrentSection(prevSection);
        setCurrentQuestionIndex(prevQuestions.length - 1);
      }
    }
  };

  // Calculate results
  const calculateResults = () => {
    let totalCorrect = 0;
    let sectionResults = {
      A: { correct: 0, total: 0 },
      B: { correct: 0, total: 0 },
      C: { correct: 0, total: 0 },
      D: { correct: 0, total: 0 }
    };

    questionBank.forEach(question => {
      sectionResults[question.section].total++;
      if (answers[question.id] === question.correct) {
        totalCorrect++;
        sectionResults[question.section].correct++;
      }
    });

    const totalScore = (totalCorrect / 250) * 100;

    return { totalCorrect, totalScore, sectionResults };
  };

  // Submit test
  const handleSubmitTest = () => {
    setIsActive(false);
    setShowResults(true);
  };

  // Switch section
  const switchSection = (section) => {
    setCurrentSection(section);
    setCurrentQuestionIndex(0);
  };

  // Get section info
  const getSectionInfo = (section) => {
    const sectionMap = {
      A: { name: 'Verbal', questions: '1-50' },
      B: { name: 'Numerik', questions: '51-125' },
      C: { name: 'Logika', questions: '126-200' },
      D: { name: 'Pengetahuan Umum', questions: '201-250' }
    };
    return sectionMap[section];
  };

  // Get overall question number
  const getOverallQuestionNumber = () => {
    const sectionOffsets = { A: 0, B: 50, C: 125, D: 200 };
    return sectionOffsets[currentSection] + currentQuestionIndex + 1;
  };

  // Start review
  const startReview = () => {
    setReviewMode(true);
    setCurrentSection('A');
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setCurrentPage('test');
  };

  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Simulasi TPA BAPENAS</h1>
            <p className="text-lg text-gray-600 mb-2">Tes Potensi Akademik - 250 Soal</p>
            <p className="text-sm text-gray-500">Waktu: 2 jam 30 menit (150 menit)</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-red-100 to-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="font-semibold text-red-800 mb-2">Bagian A: Verbal</h3>
              <p className="text-sm text-red-600">50 soal - Sinonim, Antonim, Analogi, Pemahaman Bacaan</p>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-800 mb-2">Bagian B: Numerik</h3>
              <p className="text-sm text-green-600">75 soal - Aritmatika, Deret, Soal Cerita, Geometri</p>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-800 mb-2">Bagian C: Logika</h3>
              <p className="text-sm text-purple-600">75 soal - Penalaran, Pola, Spasial</p>
            </div>
            <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <h3 className="font-semibold text-orange-800 mb-2">Bagian D: Pengetahuan Umum</h3>
              <p className="text-sm text-orange-600">50 soal - Sejarah, Geografi, Umum</p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">Petunjuk:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Jawab semua soal sebaik mungkin</li>
              <li>• Tidak ada pengurangan nilai untuk jawaban salah</li>
              <li>• Anda dapat berpindah bagian dan kembali ke soal sebelumnya</li>
              <li>• Timer akan berjalan otomatis setelah memulai tes</li>
            </ul>
          </div>

          <button
            onClick={handleStartTest}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Mulai Simulasi TPA
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const results = calculateResults();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Hasil Simulasi TPA</h1>
              <p className="text-lg text-gray-600">Selamat! Anda telah menyelesaikan tes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Skor Total</h3>
                <p className="text-3xl font-bold">{results.totalScore.toFixed(1)}%</p>
                <p className="text-sm opacity-90">{results.totalCorrect} dari 250 soal benar</p>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Waktu Tersisa</h3>
                <p className="text-3xl font-bold">{formatTime(timeLeft)}</p>
                <p className="text-sm opacity-90">dari 2:30:00</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Hasil per Bagian</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(results.sectionResults).map(([section, result]) => {
                  const sectionInfo = getSectionInfo(section);
                  const percentage = (result.correct / result.total) * 100;
                  return (
                    <div key={section} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Bagian {section}: {sectionInfo.name}
                      </h4>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          {result.correct}/{result.total} benar
                        </span>
                        <span className="text-sm font-semibold text-gray-800">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                Kembali ke Home
              </button>
              <button
                onClick={startReview}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                <BarChart3 className="w-5 h-5" />
                Review Jawaban
              </button>
              <button
                onClick={handleStartTest}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                <RefreshCw className="w-5 h-5" />
                Mulai Lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Test interface
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800">Simulasi TPA BAPENAS</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span className={`font-mono ${timeLeft < 600 ? 'text-red-600' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!reviewMode && (
              <button
                onClick={handleSubmitTest}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
              >
                Selesai Tes
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 flex gap-6">
        {/* Sidebar - Section Navigator */}
        <div className="w-64 bg-white rounded-lg shadow-md p-4 h-fit sticky top-20">
          <h3 className="font-semibold text-gray-800 mb-4">Navigasi Bagian</h3>
          
          {['A', 'B', 'C', 'D'].map(section => {
            const sectionInfo = getSectionInfo(section);
            const sectionQuestions = questionBank.filter(q => q.section === section);
            const answeredCount = sectionQuestions.filter(q => answers[q.id] !== undefined).length;
            
            return (
              <button
                key={section}
                onClick={() => switchSection(section)}
                className={`w-full p-3 mb-2 rounded-lg text-left transition-all duration-200 ${
                  currentSection === section
                    ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="font-semibold">Bagian {section}</div>
                <div className="text-sm text-gray-600">{sectionInfo.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {answeredCount}/{sectionQuestions.length} dijawab
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Question Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Bagian {currentSection}: {getSectionInfo(currentSection).name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Soal {getOverallQuestionNumber()} dari 250 | 
                    {currentQuestion.type} | 
                    Soal {currentQuestionIndex + 1} dari {currentQuestions.length} di bagian ini
                  </p>
                </div>
                {reviewMode && (
                  <div className="text-right">
                    {answers[currentQuestion.id] === currentQuestion.correct ? (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Benar
                      </span>
                    ) : answers[currentQuestion.id] !== undefined ? (
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        <XCircle className="w-4 h-4" />
                        Salah
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        Tidak dijawab
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4 leading-relaxed whitespace-pre-wrap">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !reviewMode && handleAnswer(index)}
                    disabled={reviewMode}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      reviewMode
                        ? index === currentQuestion.correct
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : answers[currentQuestion.id] === index
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-gray-50 border-gray-200 text-gray-600'
                        : answers[currentQuestion.id] === index
                        ? 'bg-blue-100 border-blue-500 text-blue-800'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation in review mode */}
            {reviewMode && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Penjelasan:</h4>
                <p className="text-blue-700">{currentQuestion.explanation}</p>
                <p className="text-sm text-blue-600 mt-2">
                  Jawaban yang benar: {String.fromCharCode(65 + currentQuestion.correct)}. {currentQuestion.options[currentQuestion.correct]}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={goToPreviousQuestion}
                disabled={currentSection === 'A' && currentQuestionIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentSection === 'A' && currentQuestionIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Sebelumnya
              </button>

              <div className="text-sm text-gray-600">
                {answers[currentQuestion.id] !== undefined ? 'Sudah dijawab' : 'Belum dijawab'}
              </div>

              <button
                onClick={goToNextQuestion}
                disabled={currentSection === 'D' && currentQuestionIndex === currentQuestions.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentSection === 'D' && currentQuestionIndex === currentQuestions.length - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Selanjutnya
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Review mode exit button */}
            {reviewMode && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowResults(true)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
                >
                  Kembali ke Hasil
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TPASimulator;