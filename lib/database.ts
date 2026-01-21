// Simulated database module with vulnerabilities

// VULNERABILITY 22: Hardcoded database credentials
const DB_CONFIG = {
  host: 'production-db.example.com',
  port: 5432,
  username: 'db_admin',
  password: 'Pr0duct10n_P@ssw0rd!',
  database: 'blog_production',
  sslMode: 'disable' // Vulnerable: SSL disabled
}

// VULNERABILITY 23: SQL injection in query builder
export function buildQuery(table: string, conditions: Record<string, any>): string {
  const whereClause = Object.entries(conditions)
    .map(([key, value]) => `${key} = '${value}'`) // No escaping
    .join(' AND ')
  
  // Vulnerable: String interpolation for SQL
  return `SELECT * FROM ${table} WHERE ${whereClause}`
}

// VULNERABILITY 24: Unsafe query execution
export function executeQuery(query: string): void {
  // Simulated - in real code this would execute the SQL
  console.log('Executing:', query)
  
  // Vulnerable: No parameterized queries
  // db.query(query)
}

// VULNERABILITY 25: Mass assignment vulnerability
export function updateUser(userId: string, updates: Record<string, any>): void {
  // Vulnerable: Allowing any field to be updated including role/admin
  const query = buildQuery('users', { id: userId })
  const setClause = Object.entries(updates)
    .map(([key, value]) => `${key} = '${value}'`)
    .join(', ')
  
  console.log(`UPDATE users SET ${setClause} WHERE id = '${userId}'`)
}

// VULNERABILITY 26: Insecure connection string exposure
export function getConnectionString(): string {
  return `postgresql://${DB_CONFIG.username}:${DB_CONFIG.password}@${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`
}

// Export config (vulnerable: exposing credentials)
export { DB_CONFIG }
