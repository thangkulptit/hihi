export function isDevelopment() {
  return import.meta.env.MODE !== 'production';
}

export function decodeJWT(token: string) {
  try {
    const base64Url = token.split('.')[1]; // Lấy phần payload (ở giữa)
    if (!base64Url) throw new Error("Invalid token");

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Chuyển đổi base64url về base64
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
}