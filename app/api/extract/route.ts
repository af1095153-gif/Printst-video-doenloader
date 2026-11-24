import { extractPinMedia, PinExtractionError } from '../../../server/pinterestCore.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(request: Request) {
  const rawUrl = new URL(request.url).searchParams.get('url');
  if (!rawUrl) {
    return Response.json(
      { error: 'Missing required "url" query parameter.' },
      { status: 400, headers: corsHeaders },
    );
  }

  try {
    const media = await extractPinMedia(rawUrl);
    return Response.json(media, { status: 200, headers: corsHeaders });
  } catch (error) {
    const statusCode = error instanceof PinExtractionError ? error.statusCode : 500;
    const payload: Record<string, unknown> = {
      error: error instanceof Error ? error.message : 'Unexpected error extracting Pinterest media.',
      code: error instanceof PinExtractionError ? error.code : 'EXTRACTION_FAILED',
    };
    if (error instanceof PinExtractionError && error.debugFoundUrls) {
      payload.debugFoundUrls = error.debugFoundUrls;
    }

    return Response.json(payload, { status: statusCode, headers: corsHeaders });
  }
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
