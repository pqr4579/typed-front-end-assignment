export interface Resource {
  type: "url" | "image";
  resource: string;
  name: string;
  created_at: any;
  host?: string;
}
