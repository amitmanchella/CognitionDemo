// Validation utilities with vulnerabilities

// VULNERABILITY 27: ReDoS (Regular Expression Denial of Service)
export function validateEmail(email: string): boolean {
  // Vulnerable: Catastrophic backtracking possible
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  return emailRegex.test(email)
}

// VULNERABILITY 28: Another ReDoS pattern
export function validateUrl(url: string): boolean {
  // Vulnerable: Evil regex
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  return urlRegex.test(url)
}

// VULNERABILITY 29: Incomplete input validation
export function sanitizeInput(input: string): string {
  // Vulnerable: Incomplete XSS protection (can be bypassed)
  return input
    .replace(/<script>/gi, '')
    .replace(/<\/script>/gi, '')
  // Missing: onerror, onclick, javascript:, data:, etc.
}

// VULNERABILITY 30: Unsafe HTML construction
export function createHtmlElement(tag: string, content: string, attributes: Record<string, string> = {}): string {
  // Vulnerable: No validation of tag name or attribute escaping
  const attrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')
  
  return `<${tag} ${attrs}>${content}</${tag}>`
}

// VULNERABILITY 31: Insecure comparison
export function verifyToken(userToken: string, validToken: string): boolean {
  // Vulnerable: Timing attack possible with === comparison
  return userToken === validToken
}

// VULNERABILITY 32: Using deprecated/insecure method
export function escapeHtml(str: string): string {
  // Vulnerable: Incomplete escaping
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  // Missing: >, ", ', ` escaping
}
