const host = "http://localhost:5000";

export const FoodItems = `${host}/data/foodItems`;
export const FoodCategory = `${host}/data/foodCategory`;

export const AdminLogin = `${host}/admin/login`;
export const AdminCreateAccount = `${host}/admin/createAccount`;
export const AdminGeTData = `${host}/admin/getAdminData`;
export const AdminUpdateData = `${host}/admin/AdminUpdateData`;
export const AdminUpdateEmail = `${host}/admin/AdminUpdateEmail`;
export const AdminUpdatePassword = `${host}/admin/AdminUpdatePassword`;
export const AdminUpdatePasswordEmailVerification = `${host}/admin/`;
export const AdminUpdatePasswordOptVerification = `${host}/admin/`;

export const UserLogin = `${host}/user/login`;
export const UserCreateAccount = `${host}/user/createAccount`;
export const UserUpdateData = `${host}/user/UserUpdateData`;
export const UserUpdateEmail = `${host}/user/UserUpdateEmail`;
export const UserUpdatePassword = `${host}/user/UserUpdatePassword`;
export const UserUpdatePasswordEmailVerification = `${host}/user/UserUpdatePasswordEmailVerification`;
export const UserUpdatePasswordOptVerification = `${host}/user/UserUpdatePasswordOtpVerification`;

export const CheckCookieLogin = `${host}/cookie/login`;
export const ClearCookieLogout = `${host}/cookie/logout`;

export const UserMyOrder = `${host}/order/userMyOrder`;
export const UserOrderData = `${host}/order/userOrderData`;
// export const UserCheckEmail = `${host}/`;

export const UnslashCarouselImages =
  "https://api.unsplash.com/photos/random?count=3&query=indian+thali=food";
