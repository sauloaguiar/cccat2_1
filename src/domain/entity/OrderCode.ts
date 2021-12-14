
// ValueObject para representar código da order
export default class OrderCode {
  value: string; 
  
  constructor(issueDate: Date, sequence: number) {
    this.value = `${issueDate.getFullYear()}${this.zeroPad(sequence, 8)}`
  }

  private zeroPad(number: number, pad: number) {
    return String(number).padStart(pad, "0");
  }
}