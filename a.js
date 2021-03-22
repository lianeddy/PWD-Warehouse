let arr = [
	{ qty: 2, stock: 2 },
	{ qty: 2, stock: 3 },
	{ qty: 2, stock: 1 },
];

// Buat gagal transaksi
const res = arr.find((val) => {
	return val.qty > val.stock;
});

if (res) {
	console.log("true");
}

// Kalo stock kurang?
// Kalo stock kurang waktu sesudah get?
