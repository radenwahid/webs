function isAuthenticated(request) {
  const cookie = request.headers.get("cookie") || "";
  return cookie.includes("admin_auth=1");
}
function requireAuth(request, redirectTo = "/admin/login") {
  if (!isAuthenticated(request)) {
    return new Response(null, { status: 302, headers: { Location: redirectTo } });
  }
  return null;
}

export { requireAuth as r };
