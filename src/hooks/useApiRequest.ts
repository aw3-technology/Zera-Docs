import { useState, useCallback } from 'react';

interface ApiResponse {
  status: number;
  data: any;
  time: number;
}

/**
 * Manages API request state and execution for the Try-It modal.
 */
export function useApiRequest(baseUrl: string, path: string, method: string) {
  const [token, setToken] = useState('');
  const [bodyFields, setBodyFields] = useState<Record<string, any>>({});
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasBody = ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase());

  const updateBodyField = (name: string, value: any) => {
    setBodyFields(prev => ({ ...prev, [name]: value }));
  };

  const getBodyJSON = useCallback(() => {
    const cleanedBody: Record<string, any> = {};
    Object.entries(bodyFields).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        cleanedBody[key] = value;
      }
    });
    return Object.keys(cleanedBody).length > 0 ? JSON.stringify(cleanedBody, null, 2) : '';
  }, [bodyFields]);

  const buildFullUrl = useCallback(() => {
    try {
      const baseUrlObj = new URL(baseUrl);
      const fullPath = baseUrlObj.pathname.replace(/\/$/, '') + path;
      return `${baseUrlObj.origin}${fullPath}`;
    } catch {
      return `${baseUrl}${path}`;
    }
  }, [baseUrl, path]);

  const handleSend = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    const start = Date.now();
    try {
      const url = buildFullUrl();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (hasBody) headers['Content-Type'] = 'application/json';

      let bodyPayload: string | undefined;
      if (hasBody) {
        const bodyJSON = getBodyJSON();
        if (bodyJSON) {
          try {
            JSON.parse(bodyJSON);
            bodyPayload = bodyJSON;
          } catch {
            setError('Invalid JSON in request body');
            setLoading(false);
            return;
          }
        }
      }

      const res = await fetch(url, { method: method.toUpperCase(), headers, body: bodyPayload });
      const time = Date.now() - start;
      const ct = res.headers.get('content-type') || '';
      let data: any;
      try {
        data = ct.includes('json') ? await res.json() : await res.text();
      } catch {
        data = await res.text();
      }
      setResponse({ status: res.status, data, time });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [buildFullUrl, method, token, hasBody, getBodyJSON]);

  return {
    token,
    setToken,
    bodyFields,
    setBodyFields,
    updateBodyField,
    response,
    loading,
    error,
    hasBody,
    getBodyJSON,
    buildFullUrl,
    handleSend,
  };
}
