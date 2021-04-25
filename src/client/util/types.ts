export interface Spell {
  id: string;
  name: string;
  type: string;
  casting_time: string;
  range: string;
  components: Array<string>;
  duration: string;
  materials?: string;
  description: string;
}
