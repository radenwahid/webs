export function isAuthenticated(request: Request): boolean {
  const cookie = request.headers.get('cookie') || '';
  return cookie.includes('admin_auth=1');
}

export function requireAuth(request: Request, redirectTo = '/admin/login'): Response | null {
  if (!isAuthenticated(request)) {
    return new Response(null, { status: 302, headers: { Location: redirectTo } });
  }
  return null;
}
