import { NextRequest, NextResponse } from 'next/server';

const VARIANTS = ['kim', 'rock', 'megan'];

function randomVariant(): string {
  return VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
};

export function middleware(req: NextRequest) {

  const { nextUrl } = req;
  const url = nextUrl.toString() || '';
  const host = nextUrl.hostname.toLowerCase() || '';
  const params = nextUrl.searchParams;
  const localParam = params.get('xtest') || '';
  const requestHeaders = new Headers(req.headers);

  requestHeaders.set('x-url', url);
  requestHeaders.set('x-host', host);
  requestHeaders.set('x-params', params.toString());

  if (localParam === process.env.LOCAL_TEST_PARAM) {
    requestHeaders.set('x-local-param', 'true');
  };

  // Se o lead ainda não tem variante atribuída, sorteia uma, seta o cookie e redireciona com utm_content
  const existingVariant = req.cookies.get('xcat_valid');
  if (!existingVariant) {
    const variant = randomVariant();
    const newUrl = req.nextUrl.clone();
    newUrl.searchParams.set('utm_content', variant);
    const response = NextResponse.redirect(newUrl, { status: 302 });
    response.cookies.set({
      name: 'xcat_valid',
      value: variant,
      path: '/',
      maxAge: 60 * 60 * 72,
      httpOnly: false,
    });
    return response;
  };

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

};

export const config = {
  matcher: ["/:path*"],
};