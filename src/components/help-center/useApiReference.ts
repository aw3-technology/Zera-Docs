import { useEffect, useState, useMemo } from 'react';

interface ApiEndpoint {
  method: string;
  path: string;
  hasEndpoint: boolean;
}

interface ApiParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
  location: 'header' | 'body' | 'query' | 'path';
  default?: string;
}

export function useApiEndpoint(
  isApiReference: boolean,
  article: any,
  apiBaseUrl: string
): ApiEndpoint {
  return useMemo(() => {
    if (!isApiReference || !article) return { method: '', path: '', hasEndpoint: false };

    const sources = [article.sidebar_title, article.title, article.excerpt];
    for (const s of sources) {
      const m = s?.match(/^(GET|POST|PUT|PATCH|DELETE|HEAD)\s+(\/\S*)/i);
      if (m) {
        let extractedPath = m[2];
        try {
          const baseUrlObj = new URL(apiBaseUrl);
          const basePath = baseUrlObj.pathname.replace(/\/$/, '');
          if (basePath && extractedPath.startsWith(basePath)) {
            extractedPath = extractedPath.slice(basePath.length) || '/';
          }
        } catch {
          // If baseUrl is invalid, use path as-is
        }
        return { method: m[1].toUpperCase(), path: extractedPath, hasEndpoint: true };
      }
    }
    return { method: '', path: '', hasEndpoint: false };
  }, [isApiReference, article, apiBaseUrl]);
}

export function useCleanDescription(
  isApiReference: boolean,
  article: any
): string | undefined {
  return useMemo(() => {
    if (!isApiReference || !article?.excerpt) return undefined;

    let cleaned = article.excerpt;

    // Remove markdown tables
    cleaned = cleaned
      .split('\n')
      .filter((line: any) => {
        const trimmed = line.trim();
        return !trimmed.startsWith('|') && !trimmed.match(/^\|?[\s\-:|]+\|?$/);
      })
      .join('\n')
      .trim();

    // Remove remaining markdown formatting
    cleaned = cleaned
      .replace(/#{1,6}\s+/g, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/`(.+?)`/g, '$1')
      .trim();

    return cleaned || undefined;
  }, [isApiReference, article]);
}

export function useOpenApiParams(
  isApiReference: boolean,
  hasEndpoint: boolean,
  projectId: string | undefined,
  method: string,
  path: string
): ApiParam[] {
  const [openApiParams, setOpenApiParams] = useState<ApiParam[]>([]);

  useEffect(() => {
    if (!isApiReference || !hasEndpoint || !projectId) return;

    const specUrl = `https://api.usegately.com/api/public/projects/${projectId}/openapi`;

    fetch(specUrl)
      .then(res => res.json())
      .then((spec: any) => {
        const pathData = spec.paths?.[path];
        if (!pathData) return;

        const methodData = pathData[method.toLowerCase()];
        if (!methodData) return;

        const params: ApiParam[] = [];

        if (methodData.parameters) {
          methodData.parameters.forEach((p: any) => {
            params.push({
              name: p.name,
              type: p.schema?.type || 'string',
              required: p.required || false,
              description: p.description || '',
              location: p.in as 'header' | 'body' | 'query' | 'path',
            });
          });
        }

        if (methodData.requestBody?.content?.['application/json']?.schema) {
          const schema = methodData.requestBody.content['application/json'].schema;
          const properties = schema.properties || {};
          const required = schema.required || [];

          Object.entries(properties).forEach(([name, prop]: [string, any]) => {
            params.push({
              name,
              type: prop.type || 'string',
              required: required.includes(name),
              description: prop.description || '',
              location: 'body',
            });
          });
        }

        setOpenApiParams(params);
      })
      .catch(err => {
        console.error('[ArticleContentViewer] Failed to load OpenAPI spec:', err);
      });
  }, [isApiReference, hasEndpoint, projectId, method, path]);

  return openApiParams;
}

export function useApiParameters(
  isApiReference: boolean,
  content: string,
  article: any,
  openApiParams: ApiParam[]
): ApiParam[] {
  return useMemo(() => {
    if (!isApiReference) return [];

    if (openApiParams.length > 0) return openApiParams;
    if (article?.api_parameters && Array.isArray(article.api_parameters)) {
      return article.api_parameters;
    }

    // Fallback: parse from content
    const params: ApiParam[] = [];
    const paramFieldRegex = /<ParamField\s+(body|query|path|header)="([^"]+)"\s+type="([^"]+)"([^>]*)>([\s\S]*?)<\/ParamField>/gi;
    let match;

    while ((match = paramFieldRegex.exec(content)) !== null) {
      const location = match[1] as 'header' | 'body' | 'query' | 'path';
      const name = match[2];
      const type = match[3];
      const attributes = match[4];
      const description = match[5].trim();

      const required = attributes.includes('required');
      const defaultMatch = attributes.match(/default="([^"]+)"/);
      const defaultValue = defaultMatch ? defaultMatch[1] : undefined;

      params.push({
        name,
        type,
        required,
        description,
        location,
        ...(defaultValue && { default: defaultValue }),
      });
    }

    return params;
  }, [isApiReference, content, article, openApiParams]);
}

export function useProcessedContent(
  isApiReference: boolean,
  content: string
): string {
  return useMemo(() => {
    if (!isApiReference) return content;

    let cleanedContent = content;
    cleanedContent = cleanedContent.replace(/<RequestExample>[\s\S]*?<\/RequestExample>/gi, '');
    cleanedContent = cleanedContent.replace(/<ResponseExample>[\s\S]*?<\/ResponseExample>/gi, '');

    return cleanedContent;
  }, [isApiReference, content]);
}
