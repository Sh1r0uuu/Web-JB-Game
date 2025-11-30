import userService from './userService';

const wishlistService = {
  // Buat key penyimpanan yang dinamis
  // Jika Login -> wishlist_123
  // Jika Belum -> wishlist_guest
  getKey() {
    const user = userService.getUser();
    return user ? `wishlist_${user.id}` : 'wishlist_guest';
  },

  getWishlist() {
    const key = this.getKey();
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  // Cek apakah akun sudah ada di wishlist
  isWishlisted(accountId) {
    const list = this.getWishlist();
    return list.some(item => item.id === accountId);
  },

  // Tambah/Hapus
  toggleWishlist(account) {
    const key = this.getKey();
    let list = this.getWishlist();
    const index = list.findIndex(item => item.id === account.id);

    let isAdded = false;

    if (index === -1) {
      // Belum ada -> Tambahkan
      list.push(account);
      isAdded = true;
    } else {
      // Sudah ada -> Hapus
      list.splice(index, 1);
      isAdded = false;
    }

    localStorage.setItem(key, JSON.stringify(list));
    return isAdded;
  }
};

export default wishlistService;