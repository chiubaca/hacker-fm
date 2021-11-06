declare module "*.json" {
  const value: any;
  export default value;
}

interface Window {
  HAS_INTERACTED: boolean;
}
