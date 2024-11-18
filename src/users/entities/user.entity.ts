export class User {
  id: string; // Unique identifier
  username: string; // Username
  password: string; // Hashed password
  role?: string; // Optional role field (e.g., 'admin', 'user')
}
