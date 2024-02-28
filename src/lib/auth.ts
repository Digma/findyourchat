import type { AstroCookies } from "astro";

export const isAuthenticated = (cookies: AstroCookies) => {
    const accessToken = cookies.get("sb-access-token");
    const refreshToken = cookies.get("sb-refresh-token");

    if (!accessToken || !refreshToken) {
        return false;
    }

    return true;
}
