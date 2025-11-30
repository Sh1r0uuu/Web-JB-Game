import userService from './userService';

const wishlistService = {
  getKey() {
    const user = userService.getUser();
    return user ? `wishlist_${user.id}` : 'wishlist_guest';
  },
  getWishlist() {
    const key = this.getKey();
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },
  isWishlisted(accountId) {
    const list = this.getWishlist();
    return list.some(item => item.id === accountId);
  },
  toggleWishlist(account) {
    const key = this.getKey();
    let list = this.getWishlist();
    const index = list.findIndex(item => item.id === account.id);

    let isAdded = false;

    if (index === -1) {
      list.push(account);
      isAdded = true;
    } else {
      list.splice(index, 1);
      isAdded = false;
    }

    localStorage.setItem(key, JSON.stringify(list));
    return isAdded;
  }
};

export default wishlistService;