// app/api/csrf/route.js
import { cookies } from 'next/headers';

export async function GET(request) {
  const cookieStore = cookies();
  const csrfToken = cookieStore.get('csrftoken');
  
  if (!csrfToken) {
    return new Response(null, { status: 403 }); // CSRF 토큰이 없으면 403 Forbidden 응답
  }
  return new Response(JSON.stringify({ csrfToken }), { status: 200 });
}