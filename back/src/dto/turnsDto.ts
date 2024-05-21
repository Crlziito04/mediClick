export default interface turnsDto {
  date: Date;
  time: string;
  id: string;
  status: "active" | "cancelled";
}
