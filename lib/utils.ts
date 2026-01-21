// VULNERABILITY 12: Prototype Pollution
export function mergeObjects(target: any, source: any): any {
  // Vulnerable: No check for __proto__ or constructor properties
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      target[key] = mergeObjects(target[key] || {}, source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

// VULNERABILITY 13: Unsafe eval usage
export function evaluateExpression(expression: string): any {
  // Vulnerable: Using eval with user input
  return eval(expression)
}

// VULNERABILITY 14: Unsafe deserialization
export function deserializeData(serialized: string): any {
  // Vulnerable: Using Function constructor (similar to eval)
  const fn = new Function('return ' + serialized)
  return fn()
}

// VULNERABILITY 15: Information disclosure via error messages
export function processUserData(data: any): any {
  try {
    // Some processing
    return JSON.parse(data)
  } catch (error: any) {
    // Vulnerable: Throwing detailed error with internal info
    throw new Error(`Failed to process data: ${error.message}. Input was: ${data}`)
  }
}

// VULNERABILITY 16: Insecure URL construction
export function buildApiUrl(endpoint: string, params: Record<string, string>): string {
  // Vulnerable: No validation of endpoint parameter
  let url = `https://api.example.com/${endpoint}`
  
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`) // No URL encoding
    .join('&')
  
  return queryString ? `${url}?${queryString}` : url
}
