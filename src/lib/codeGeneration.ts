/**
 * Generate cURL and JavaScript code snippets for an API request.
 */

interface CodeGenOptions {
  method: string;
  fullUrl: string;
  token: string;
  hasBody: boolean;
  bodyJSON: string;
}

export function generateCurl({ method, fullUrl, token, hasBody, bodyJSON }: CodeGenOptions): string {
  const exampleBody = bodyJSON || (hasBody ? '{\n  "email": "user@example.com",\n  "password": "securepassword123"\n}' : '');
  return [
    `curl -X ${method.toUpperCase()} "${fullUrl}" \\`,
    token ? `-H "Authorization: Bearer ${token}" \\` : `-H "Authorization: Bearer YOUR_API_KEY" \\`,
    hasBody ? `-H "Content-Type: application/json" \\` : null,
    hasBody ? `-d '${exampleBody}'` : null,
  ].filter(Boolean).join('\n');
}

export function generateJavaScript({ method, fullUrl, token, hasBody, bodyJSON }: CodeGenOptions): string {
  const exampleBody = bodyJSON || (hasBody ? '{\n  "email": "user@example.com",\n  "password": "securepassword123"\n}' : '');
  return `const response = await fetch("${fullUrl}", {
  method: "${method.toUpperCase()}",
  headers: {
    "Authorization": "Bearer ${token || 'YOUR_API_KEY'}",${hasBody ? '\n    "Content-Type": "application/json",' : ''}
  },${hasBody ? `\n  body: JSON.stringify(${exampleBody})` : ''}
});

const data = await response.json();
console.log(data);`;
}
