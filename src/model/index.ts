export interface Resource {
  type: "url" | "image";
  resource: string;
  name: string;
  created_at: number;
  host?: string;
}
