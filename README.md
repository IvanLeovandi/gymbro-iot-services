# Tugas Besar IF3152 Rekayasa Perangkat Lunak
Gymbro Management System (GBMS) merupakan sebuah web app manajemen gym yang dibuat dengan framework next js dan di-styling menggunakan tailwindcss. GBMS dibuat dengan tujuan mempermudah pengalaman user untuk mendaftar ke dalam kelas-kelas yang tersedia dalam gym dan mempermudah admin dalam manajemen user dan kelas. User pada GBMS dibagi menjadi 3 jenis, yaitu 
|Role             | Description  |
|:----------------| -------------|
|User Non-Member  | Akun yang diberikan untuk pengguna yang pertama kali mendaftarkan diri ke dalam website GBMS. User Non-Member dapat mendaftarkan diri ke kelas yang tersedia dengan harga tertentu. User Non-Member dapat melakukan upgrade menjadi member selama sebulan dengan melakukan pembayaran tertentu. |
|User Member      | Pengguna yang sudah melakukan pembayaran membership bulanan. User Member dapat mengikuti kelas yang tersedia pada GBMS secara gratis. |
|Admin            |Akun yang sudah dibuatkan secara manual oleh pembuat website. Admin memiliki hak untuk menghapus kelas, menambahkan kelas, mengubah data anggota GBMS, mengirimkan notifikasi kepada pengguna, dan melihat status pembayaran |

### Tugas dibuat oleh kelompok 8:
| No.| Nama                          |  NIM     | 
|:--:| :---------------------------: | :------: |
| 1. | Mario Nicholas Reyhan         | 18221061 |
| 2. | Nicolas Owen Halim            | 18221095 |
| 3. | Ivan Leovandi                 | 18221129 |
| 4. | Nicholas                      | 18221165 |

### Use Case Gym Bro Management System
|Use Case                            | Penanggung Jawab      |
|:----------------------------------:|:---------------------:|
|Register                            | Mario Nicholas Reyhan |
|Login                               | Mario Nicholas Reyhan |
|Melakukan Pembayaran                | Nicolas Owen Halim    |
|Membayar Membership                 | Nicolas Owen Halim    |
|Mendaftar Kelas                     | Nicholas              |
|Melihat Jadwal dan Detil Kelas      | Nicholas              |
|Menerima Notifikasi                 | Ivan Leovandi         |
|Manipulasi Data Kelas               | Ivan Leovandi         |
|Manipulasi Data Status Anggota      | Mario Nicholas Reyhan |
|Mengirim Notifikasi Status Pengingat| Ivan Leovandi         |
|Menampilkan Status Pembayaran       | Nicolas Owen Halim    |

### Basis Data
Berikut adalah basis data yang tersedia pada GBMS : 
1. **ClassEnrolled**
- id      : ID unik ClassEnrolled yang dibuat langsung oleh MongoDB
- classId : Foreign key yang mengarah kepada Id pada collection ClassEnrolled
- email   : Foreign key yang mengarah kepada email pada collection User
2. **Classses**
- Id : ID unik Classes yang dibuat langsung oleh MongoDB
- gambar : Link untuk menampilkan gambar preview kelas (String)
- jadwal : Jadwal kelas diadakan (Date)
- deskripsi : Deskripsi singkat kelas yang diadakan (String)
- harga : Harga Kelas (int)
- instruktur : Instruktur yang akan mengajarkan kelas (String)
- kapasitas : Kapasitas maksimal kelas (int)
- tipe : Tipe kelas (string)
- user : Jumlah pengguna yang sudah mendaftar kelas (int)
3. **Notification** 
- id : ID unik Notification yang dibuat langsung oleh MongoDB
- email : Foreign Key yang mengarah kepada email user
- message : Pesan untuk notifikasi yang diberikan (String)
- tanggal : Tanggal notifikasi dikirimkan (Date)
4. **Payment**
- id : ID unik Payment yang dibuat langsung oleh MongoDB
- harga : Harga item yang dibayar (int)
- item : Nama item yang dibayar (String)
- netode : Metode pembayaran yang digunakan (String)
- tanggal : Tanggal pembayaran dilakukan (Date)
- email : Foreign key yang mengarah kepada email user
5. **User**
- id : ID unik User yang dibuat langsung oleh MongoDB
- password : Password user (String)
- alamat : Alamat tempat tinggal user (String)
- email : Email user (String)
- jenisKelamin : Jenis kelamin user (String)
- nama : Nama user (String)
- role : Role user (admin,member,non-member) (String)
- telepon : Nomor telepon user (String)
- username : Username unik user (String)
- usia : Usia user (string)
- expiredDate : Tanggal expired membership untuk user Member (Date)
- profileImage : Link yang mengarah ke profile picture user (String)

## Getting Started
1. **Clone repository ini**
```
git clone https://gitlab.informatika.org/tubes-rpl-kelompok-8/gymbro-management-system.git
```
2. **Install node modules**
```
npm install
```
3. **Jalankan development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Vercel Deployment
**Open [https://gymbro-management-system.vercel.app/](https://gymbro-management-system.vercel.app/)**

## Testing
1. **Install cypress**

``
npm install cypress
``

2. **Run Cypress**

``
npm run cypress:open
``

3. **Select E2E testing on web browser**

4. **Click app.cy.js**


